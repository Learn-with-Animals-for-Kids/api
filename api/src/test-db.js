require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./configs/database");
const Animal = require("./models/animal");

(async () => {
    try {
        await connectDB();

        console.log("✅ Connected! Now inserting test document...");

        const lion = new Animal({
            animalName: "Lion",
            animalImage: "https://example.com/lion.jpg",
            animalCategory: "wild",
            animalDescription: "The king of the jungle.",
        });

        await lion.save();
        console.log("✅ Test animal saved!");

        const animals = await Animal.find();
        console.log("📦 Animals in DB:", animals);

        await mongoose.disconnect();
        console.log("✅ Disconnected successfully.");
    } catch (error) {
        console.error("❌ Error:", error);
    }
})();