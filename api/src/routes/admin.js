const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal");

// ✅ POST /flashcards - Create a new flashcard
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/create", upload.single("image"), async (req, res) => {
    try {
        const { title, category, description } = req.body;
        const imageFile = req.file; // multer parses this if image is uploaded

        if (!title || !category || !description) {
            return res.status(400).json({ message: "Title, category, and description are required." });
        }

        const existingAnimal = await Animal.findOne({
            title: title.trim().toLowerCase(),
            category: category.trim().toLowerCase(),
            description: description.trim(),
        });

        if (existingAnimal) {
            return res.status(409).json({ message: "❌ This flashcard already exists." });
        }

        // ✅ Build animal object conditionally
        const newAnimalData = {
            title,
            category,
            description,
        };

        if (imageFile) {
            newAnimalData.image = imageFile.buffer;
            newAnimalData.imageType = imageFile.mimetype; // ✅ IMPORTANT
        }
        const newAnimal = new Animal(newAnimalData);
        await newAnimal.save();

        res.status(201).json({
            message: "✅ Flashcard created successfully!",
        });
    } catch (err) {
        console.error("❌ Error creating flashcard:", err);
        res.status(500).json({ message: "Server error" });
    }

    const animals = await Animal.find().sort({ _id: -1 });
});

router.get("/create", async (req, res) => {
    try {
        const animals = await Animal.find().sort({ _id: -1 }); // newest first
        res.status(200).json(animals);
    } catch (err) {
        console.error("❌ Error fetching flashcards:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
