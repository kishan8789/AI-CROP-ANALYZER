const User = require('../models/User');

// @route   GET /api/user/profile
exports.getUserProfile = async (req, res) => {
    try {
        // req.user.id authMiddleware se aayega
        const user = await User.findById(req.user.id).select('-password'); 
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   PUT /api/user/profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { location, language } = req.body;
        let user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: { location, language } },
            { new: true }
        ).select('-password');
        
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};