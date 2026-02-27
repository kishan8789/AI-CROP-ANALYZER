const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
    try {
        const { name, mobile, password, location, language } = req.body;

        // Check if user exists
        let user = await User.findOne({ mobile });
        if (user) {
            return res.status(400).json({ msg: 'User already exists with this mobile number' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({ name, mobile, password: hashedPassword, location, language });
        await user.save();

        // Create JWT Payload
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token, user: { id: user.id, name: user.name, language: user.language } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
    try {
        const { mobile, password } = req.body;

        let user = await User.findOne({ mobile });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token, user: { id: user.id, name: user.name, language: user.language } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};