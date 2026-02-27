const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: String,
    language: { type: String, default: 'English' }
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);