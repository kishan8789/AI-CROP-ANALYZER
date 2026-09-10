const { GoogleGenerativeAI } = require("@google/generative-ai");

const fallbackAnswer = (question = '') => {
    const text = question.toLowerCase();
    if (text.includes('rain') || text.includes('बारिश') || text.includes('irrigation')) {
        return 'Rain is expected: pause irrigation, improve field drainage, and avoid spraying fertilizer or pesticides before heavy rain.';
    }
    if (text.includes('soil') || text.includes('nitrogen') || text.includes('fertilizer')) {
        return 'For healthier soil, add well-rotted compost, test the soil before applying fertilizer, and use crop rotation with pulses to improve nitrogen naturally.';
    }
    if (text.includes('pest') || text.includes('disease')) {
        return 'Inspect the underside of leaves twice a week, remove badly affected leaves, keep weeds controlled, and use only a crop-approved treatment at the recommended dose.';
    }
    return 'Start with a soil test, check field moisture before irrigation, and inspect crops regularly for pests or disease. Share your crop, location, and current problem for more specific advice.';
};

exports.askAssistant = async (req, res) => {
    try {
        const { question } = req.body;

        // Ensure API key is present
        if (!process.env.GEMINI_API_KEY) {
            return res.status(200).json({ answer: fallbackAnswer(question) });
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
        res.status(200).json({ answer: fallbackAnswer(question) });
    }
};