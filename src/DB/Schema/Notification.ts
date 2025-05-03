// models/Notification.ts
import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },         // recipient user
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema)
