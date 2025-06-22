const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors");
// const multer = require("multer");
//
// // Use multer with memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

require("../src/configs/database");

const flashcardRoutes = require("./routes/admin")
app.use("/admin", flashcardRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}`);
});




