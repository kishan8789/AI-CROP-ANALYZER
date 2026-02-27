require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Middleware
app.use(cors()); // Render par frontend URL allow karne ke liye
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api', apiRoutes);

// Health Check for Render
app.get('/health', (req, res) => res.status(200).json({ status: "Live", message: "KrishiAI Backend is running!" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;