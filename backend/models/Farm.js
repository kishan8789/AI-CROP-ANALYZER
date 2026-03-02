const mongoose = require('mongoose');

const FarmSchema = new mongoose.Schema({
    // Kis farmer (user) ka data hai
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    // Farm Details
    cropType: { 
        type: String, 
        required: true,
        enum: ['Rice', 'Wheat', 'Maize', 'Pulses', 'Sugarcane'] // Dropdown options
    },
    landSize: { 
        type: Number, 
        required: true, // In Acres or Hectares
    },
    // Soil Parameters
    soilData: {
        n: { type: Number, required: true }, // Nitrogen
        p: { type: Number, required: true }, // Phosphorus
        k: { type: Number, required: true }, // Potassium
        pH: { type: Number, default: 7.0 },  // Soil acidity
        moisture: { type: Number, default: 50 } // Percentage
    },
    // AI Prediction Outputs
    predictedYield: { 
        type: Number, 
        required: true // Expected yield in Quintals or Tons
    },
    confidenceScore: {
        type: Number,
        default: 87 // Example: 87% confidence
    },
    riskProbability: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    aiRecommendations: [
        { type: String } // e.g., "Increase N by 10%", "Irrigate in 2 days"
    ]
}, { 
    timestamps: true // Automatically adds createdAt and updatedAt dates
});

module.exports = mongoose.model('Farm', FarmSchema);