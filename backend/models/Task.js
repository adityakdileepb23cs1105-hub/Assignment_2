// Mongoose schema/model for a Task
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },        // task text (required)
  completed: { type: Boolean, default: false },   // done / not done
  createdAt: { type: Date, default: Date.now },   // creation time
});

module.exports = mongoose.model("Task", taskSchema);
