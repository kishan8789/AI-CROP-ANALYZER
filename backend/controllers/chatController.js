const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.askAssistant = async (req, res) => {
    try {
        const { question } = req.body;

        // Ensure API key is present
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ answer: "API key is missing in backend setup." });
        }

        // Initialize Gemini API
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Using Gemini 1.5 Flash for fast text responses
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // System Prompt: Ye AI ko batayega ki use "KrishiAI" ban kar baat karni hai
        const prompt = `You are KrishiAI, a highly intelligent and helpful agricultural expert assistant created to help farmers. 
        Please answer the following question clearly, concisely, and in simple language (use bullet points if needed). 
        Farmer's Question: ${question}`;

        // Generate response from AI
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Send AI answer back to React frontend
        res.status(200).json({ answer: text });

    } catch (error) {
        console.error("❌ Gemini API Error:", error);
        res.status(500).json({ answer: "Sorry, I am facing a network issue. Please try again in a moment." });
    }
};