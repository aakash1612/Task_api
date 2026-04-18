const scheduleReminder = (task) => {
  if (!task.dueDate) return;

  const now = new Date();
  const due = new Date(task.dueDate);

  const reminderTime = new Date(due.getTime() - 60 * 60 * 1000);
  const delay = reminderTime - now;

  if (delay <= 0) return;

  setTimeout(() => {
    console.log(`🔔 Reminder: Task "${task.title}" is due soon!`);
  }, delay);
};

module.exports = scheduleReminder;