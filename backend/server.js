require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// ✅ CORS — explicit allow-list instead of "*"
// Reads a comma-separated list from .env so you can add your Vercel/Render
// frontend URL without touching code. Falls back to local dev ports.
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:3000')
    .split(',')
    .map((o) => o.trim());

app.use(cors({
    origin: function (origin, callback) {
        // allow tools like curl/Postman (no origin header) and whitelisted origins
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-auth-token"],
    credentials: true
}));

app.use(express.json());

// ✅ Database Connection
connectDB();

// ✅ Routes
app.use('/api', apiRoutes);

// ✅ Root Route
app.get('/', (req, res) => {
    res.send("<h1>KrishiAI Backend is Live!</h1><p>Use /api for requests.</p>");
});

// ✅ Health Check — now actually reports DB state instead of always "Live"
app.get('/health', (req, res) => {
    const mongoose = require('mongoose');
    const dbUp = mongoose.connection.readyState === 1;
    res.status(dbUp ? 200 : 503).json({
        status: dbUp ? "Live" : "Degraded",
        db: dbUp ? "connected" : "disconnected"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
