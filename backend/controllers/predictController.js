const { spawn } = require('child_process');
const path = require('path'); // 👈 Path module import karein

exports.predictYield = async (req, res) => {
    const { n, p, k, size, cropType } = req.body;

    // 🌟 Absolute path use karein taaki file hamesha mile
    const scriptPath = path.join(__dirname, '../ml_service/predict.py');

    // Windows users ke liye kabhi-kabi 'python' ki jagah 'python3' ya 'py' likhna padta hai
    const pythonProcess = spawn('python', [scriptPath]);

    pythonProcess.stdin.write(JSON.stringify({ n, p, k, size }));
    pythonProcess.stdin.end();

    let resultData = "";
    let errorData = "";

    pythonProcess.stdout.on('data', (data) => { 
        resultData += data.toString(); 
    });

    // 🔴 Error capture karne ke liye ye zaroori hai
    pythonProcess.stderr.on('data', (data) => {
        errorData += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error("ML Model Error:", errorData);
            return res.status(500).json({ error: "ML Model failed", details: errorData });
        }
        
        const predictedYield = parseFloat(resultData.trim()).toFixed(2);

        // Agar Python ne 'Error' string bheji ho (aapke predict.py ke try-except se)
        if (isNaN(predictedYield)) {
            return res.status(500).json({ error: "Invalid output from model", details: resultData });
        }

        res.status(200).json({
            success: true,
            yield: predictedYield,
            confidence: "87%",
            recommendation: `Based on your NPK levels for ${cropType || 'this crop'}, increase Nitrogen by 5% next week for optimal growth.`,
            risk: "Low"
        });
    });
};