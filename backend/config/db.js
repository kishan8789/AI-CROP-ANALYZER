const mongoose = require('mongoose');

// Connection status cache karne ke liye variable
let isConnected = false; 

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('=> Using existing database connection');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = db.connections[0].readyState;
        console.log('✅ MongoDB Connected Successfully!');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        // process.exit(1) yahan nahi likhna hai Vercel ke liye
    }
};

module.exports = connectDB;