const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');

const { registerUser, loginUser } = require('../controllers/authController');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { predictYield } = require('../controllers/predictController');
const { getWeatherInsights } = require('../controllers/weatherController');
const { getSchemes } = require('../controllers/schemeController');
const { askAssistant } = require('../controllers/chatController');

// 🔐 Auth Routes (public)
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// 🧑‍🌾 User Routes (Protected)
router.get('/user/profile', authMiddleware, getUserProfile);
router.put('/user/profile', authMiddleware, updateUserProfile);

// 🚀 Core Routes
// /predict now requires login (so predictions can be tied to a user and
// persisted) and is rate-limited to protect CPU/Python subprocess spawning.
router.post('/predict', authMiddleware, rateLimiter({ windowMs: 60_000, max: 10 }), predictYield);
router.get('/weather', getWeatherInsights);
router.get('/schemes', getSchemes);
// /chat is rate-limited (not auth-gated) to protect the Gemini quota from
// anonymous abuse while still letting the public chatbot widget work.
router.post('/chat', rateLimiter({ windowMs: 60_000, max: 20 }), askAssistant);

module.exports = router;
