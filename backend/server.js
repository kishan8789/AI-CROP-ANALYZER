require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// ✅ Allowed origins (Localhost + Environment variables + Automatic Render Subdomains)
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:3000')
    .split(',')
    .map((o) => o.trim());

app.use(cors({
    origin: function (origin, callback) {
        // allow Postman/curl (no origin) OR whitelisted origins OR any Render subdomain (*.onrender.com)
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.onrender.com')) {
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

// ✅ Health Check
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
