const { execFile } = require('child_process');
const path = require('path');

exports.predictCrop = async (req, res) => {
    const { N, P, K, temperature, humidity, ph, rainfall } = req.body;
    
    if (N === undefined || P === undefined || K === undefined) {
        return res.status(400).json({ error: 'Missing required agricultural parameters.' });
    }

    const scriptPath = path.join(__dirname, '../ml_service/predict.py');
    const args = [String(N), String(P), String(K), String(temperature), String(humidity), String(ph), String(rainfall)];

    execFile('python', [scriptPath, ...args], { timeout: 10000 }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Python execution error: ${stderr || error.message}`);
            return res.status(500).json({ error: 'Prediction service failed.' });
        }
        try {
            const result = JSON.parse(stdout.trim());
            return res.status(200).json({ success: true, data: result });
        } catch (parseErr) {
            console.error(`JSON Parse Error: ${stdout}`);
            return res.status(500).json({ error: 'Invalid model output format.' });
        }
    });
};
