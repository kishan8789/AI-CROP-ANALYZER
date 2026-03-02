const mongoose = require('mongoose');
const SchemeSchema = new mongoose.Schema({
    name: String,
    description: String,
    eligibility: String,
    benefitAmount: String,
    deadline: String,
    link: String
});
module.exports = mongoose.model('Scheme', SchemeSchema);