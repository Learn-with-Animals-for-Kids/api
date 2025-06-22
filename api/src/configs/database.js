const mongoose = require("mongoose");

// ✅ Load environment variables
require("dotenv").config();

const connectDB = async () => {
    try {
        console.log('db string', process.env.DATABASE_CONNECTION_STRING)
        if (!process.env.DATABASE_CONNECTION_STRING) {
            throw new Error("❌ DATABASE_CONNECTION_STRING is not defined. Check your .env file.");
        }

        console.log("🔗 Connecting to MongoDB...");
        console.log(`🛠️  Using DB Name: ${process.env.DB_NAME || "test"}`);

        await mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
            dbName: process.env.DB_NAME || "test", // ✅ Make database name configurable
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // ⏳ Increase timeout for better stability
            socketTimeoutMS: 60000, // ⏳ Extend socket timeout for slow connections
        });

        console.log("✅ Connected to MongoDB!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // ❌ Exit process if DB connection fails
    }
};

// ✅ Immediately connect when file is required
connectDB();

module.exports = connectDB;