const express = require("express");
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to check token
const auth = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// CRUD
router.post("/", auth, async (req, res) => {
  const task = new Task({ ...req.body, userId: req.user });
  await task.save();
  res.json(task);
});

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user });
  res.json(tasks);
});

router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Task deleted" });
});

module.exports = router;
