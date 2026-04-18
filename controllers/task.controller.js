const Task = require('../models/task.model');
const scheduleReminder = require('../utils/scheduler');
const sendWebhook = require('../utils/webhook'); // ✅ FIX

exports.createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user.id });

  // 🔔 Schedule reminder
  scheduleReminder(task);

  res.json(task);
};

exports.getTasks = async (req, res) => {
  const { category, tag } = req.query;

  let filter = { userId: req.user.id };

  if (category) filter.category = category;
  if (tag) filter.tags = tag;

  const tasks = await Task.find(filter);

  res.json(tasks);
};

exports.getTask = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    userId: req.user.id
  });

  if (!task) return res.status(404).json({ msg: "Not found" });

  res.json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );

  if (!task) return res.status(404).json({ msg: "Not found" });

  // 🔔 Schedule reminder again (IMPORTANT)
  scheduleReminder(task);

  // 🌐 Webhook on completion
  if (req.body.status === "completed") {
    sendWebhook(task);
  }

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });

  res.json({ msg: "Deleted" });
};