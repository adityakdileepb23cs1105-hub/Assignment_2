// Entry point: Express server + MongoDB connection
require("dotenv").config(); // load variables from .env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS restricted to the frontend's address only
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));

// Read JSON request bodies
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "To-Do API is running" }));
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB, then start listening
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
