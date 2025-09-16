// AngularApp\echodrop\backend\scheduler.js
import cron from "node-cron";
import ScheduledMessage from "./src/models/ScheduledMessage.js";
import sendMessage from "./src/services/sendMessage.js";
import MessageLog from "./src/models/MessageLog.js";

console.log("⏳ Scheduler initialized...");

cron.schedule("* * * * *", async () => {  // Runs every minute
  const now = new Date();

  try {
    const dueMessages = await ScheduledMessage.find({
      status: "pending",
      scheduledTime: { $lte: now },
    });

    for (let msg of dueMessages) {
      try {
        msg.status = "processing";
        msg.attempts += 1;
        await msg.save();

        await sendMessage(msg);

        msg.status = "sent";
        msg.logs.push({ status: "sent", time: new Date() });
        await msg.save();

        await MessageLog.create({ message: msg._id, status: "sent" });
        console.log(`✅ Message sent to ${msg.recipient}`);
      } catch (err) {
        msg.status = "failed";
        msg.lastError = err.message;
        msg.logs.push({ status: "failed", time: new Date(), error: err.message });
        await msg.save();

        await MessageLog.create({ message: msg._id, status: "failed", error: err.message });
        console.error(`❌ Failed to send message to ${msg.recipient}: ${err.message}`);
      }
    }
  } catch (err) {
    console.error("Scheduler error:", err.message);
  }
});
