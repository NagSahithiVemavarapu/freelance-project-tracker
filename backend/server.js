const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const projectRoutes = require("./routes/projectRoutes");
const app = express();


app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("MongoDB Connection Error:", err);
});

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Welcome to Freelance Project Tracker API");
});

app.use("/projects", projectRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});