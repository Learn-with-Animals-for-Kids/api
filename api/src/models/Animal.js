const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const animalSchema = new mongoose.Schema({
    title: { type: String, required: false },
    image: { type: Buffer, required: false }, // 👈 binary image data
    imageType: { type: String }, // ✅ needed for proper MIME type
    category: { type: String, required: false },
    description: { type: String, required: false },
});

module.exports = mongoose.model("Animal", animalSchema);
