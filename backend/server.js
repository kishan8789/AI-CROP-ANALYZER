require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// ✅ Middleware - CORS ko thoda aur powerful banaya hai
app.use(cors({
    origin: "*", // Sabhi domains ko allow karne ke liye (Deployment ke liye best)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// ✅ Database Connection
connectDB();

// ✅ Routes
app.use('/api', apiRoutes);

// ✅ Root Route (Browser mein kholne par error nahi dikhayega)
app.get('/', (req, res) => {
    res.send("<h1>KrishiAI Backend is Live!</h1><p>Use /api for requests.</p>");
});

// ✅ Health Check for Render (Auto-restarts ke liye zaroori hai)
app.get('/health', (req, res) => {
    res.status(200).json({ status: "Live", message: "Server is healthy" });
});

// ✅ Port Handling (Render automatically PORT variable deta hai)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;