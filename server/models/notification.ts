import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["FRIEND_REQUEST", "GROUP_REQUEST"],
    required: true,
  },
  isAccepted: { type: Boolean, require: true, default: false },
  isSeen: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notifications = mongoose.model("Notification", notificationSchema);
export default Notifications;
