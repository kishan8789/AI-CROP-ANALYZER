const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// 1. Saare controllers import karein
const { registerUser, loginUser } = require('../controllers/authController');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { predictYield } = require('../controllers/predictController');
const { getWeatherInsights } = require('../controllers/weatherController');
const { getSchemes } = require('../controllers/schemeController');
const { askAssistant } = require('../controllers/chatController');

// 🔐 2. Auth Routes (Ye add ho gaye!)
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// 🧑‍🌾 3. User Routes (Protected)
router.get('/user/profile', authMiddleware, getUserProfile);
router.put('/user/profile', authMiddleware, updateUserProfile);

// 🚀 4. Core Startup Routes (Aapke purane routes)
router.post('/predict', predictYield);
router.get('/weather', getWeatherInsights);
router.get('/schemes', getSchemes);
router.post('/chat', askAssistant);

module.exports = router;