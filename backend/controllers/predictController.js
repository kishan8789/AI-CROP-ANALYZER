const { spawn } = require('child_process');

exports.predictYield = async (req, res) => {
    const { n, p, k, size, cropType } = req.body;

    const pythonProcess = spawn('python', ['./ml_service/predict.py']);
    pythonProcess.stdin.write(JSON.stringify({ n, p, k, size }));
    pythonProcess.stdin.end();

    let resultData = "";
    pythonProcess.stdout.on('data', (data) => { resultData += data.toString(); });

    pythonProcess.on('close', (code) => {
        if (code !== 0) return res.status(500).json({ error: "ML Model failed" });
        
        const predictedYield = parseFloat(resultData).toFixed(2);
        res.status(200).json({
            success: true,
            yield: predictedYield,
            confidence: "87%",
            recommendation: "Increase Nitrogen by 5% next week for optimal growth.",
            risk: "Low"
        });
    });
};