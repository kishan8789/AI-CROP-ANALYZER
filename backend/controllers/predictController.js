const { spawn } = require('child_process');
const path = require('path');
const Farm = require('../models/Farm');

// Render/Linux hosts expose "python3", not "python". Windows dev machines
// usually have "python". Try the platform default first.
const PYTHON_BIN = process.platform === 'win32' ? 'python' : 'python3';

exports.predictYield = async (req, res) => {
    const { n, p, k, size, cropType } = req.body;

    if ([n, p, k, size].some((v) => v === undefined || v === null || v === '')) {
        return res.status(400).json({ error: 'n, p, k and size are all required.' });
    }

    const scriptPath = path.join(__dirname, '../ml_service/predict.py');
    const pythonProcess = spawn(PYTHON_BIN, [scriptPath]);

    let resultData = '';
    let errorData = '';
    let responded = false;

    // If the interpreter binary itself is missing, 'error' fires instead of
    // 'close'. Without this handler the request used to hang until timeout.
    pythonProcess.on('error', (err) => {
        if (responded) return;
        responded = true;
        console.error('Python spawn error:', err.message);
        return res.status(500).json({
            error: 'Python interpreter not available on server.',
            details: err.message
        });
    });

    pythonProcess.stdin.write(JSON.stringify({ n, p, k, size }));
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data) => { resultData += data.toString(); });
    pythonProcess.stderr.on('data', (data) => { errorData += data.toString(); });

    pythonProcess.on('close', async (code) => {
        if (responded) return;
        responded = true;

        if (code !== 0) {
            console.error('ML Model Error:', errorData);
            return res.status(500).json({ error: 'ML Model failed', details: errorData });
        }

        let parsed;
        try {
            parsed = JSON.parse(resultData.trim());
        } catch (e) {
            return res.status(500).json({ error: 'Invalid output from model', details: resultData });
        }

        if (parsed.error) {
            return res.status(500).json({ error: 'Model raised an error', details: parsed.error });
        }

        const recommendation = `Based on your NPK levels for ${cropType || 'this crop'}, ` +
            `increase Nitrogen by 5% next week for optimal growth.`;

        // Persist the prediction so it can back a real dashboard/history view
        // (this used to be dropped entirely — Farm model existed but nothing
        // ever wrote to it).
        try {
            if (req.user && req.user.id) {
                await Farm.create({
                    user: req.user.id,
                    cropType: cropType || 'Rice',
                    landSize: size,
                    soilData: { n, p, k },
                    predictedYield: parsed.yield,
                    confidenceScore: parsed.confidence ?? undefined,
                    riskProbability: parsed.risk || undefined,
                    aiRecommendations: [recommendation]
                });
            }
        } catch (dbErr) {
            // Don't fail the whole request just because history-saving failed.
            console.error('Failed to persist prediction:', dbErr.message);
        }

        res.status(200).json({
            success: true,
            yield: parsed.yield,
            confidence: parsed.confidence !== null && parsed.confidence !== undefined
                ? `${parsed.confidence}%` : 'unavailable',
            recommendation,
            risk: parsed.risk || 'unknown',
            modelUsed: parsed.modelUsed
        });
    });
};
