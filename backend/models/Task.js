const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Done"], default: "Pending" }
});

module.exports = mongoose.model("Task", TaskSchema);
