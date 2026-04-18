const axios = require('axios');

const sendWebhook = async (task, retries = 3, delay = 2000) => {
  try {
    await axios.post(process.env.WEBHOOK_URL, {
      id: task._id,
      title: task.title,
      userId: task.userId,
      completedAt: new Date()
    });

    console.log("✅ Webhook sent successfully");
  } catch (err) {
    console.log(`❌ Webhook failed. Retries left: ${retries}`);

    if (retries > 0) {
      console.log(`⏳ Retrying in ${delay / 1000}s...`);

      setTimeout(() => {
        sendWebhook(task, retries - 1, delay * 2); // 🔥 exponential backoff
      }, delay);
    } else {
      console.log("🚫 Webhook failed after multiple attempts");
    }
  }
};

module.exports = sendWebhook;