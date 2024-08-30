import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: {type: mongoose.Schema.Types.ObjectId, ref:"User",required: true},
  type: {
    type: String,
    enum: ["FRIEND_REQUEST", "GROUP REQUEST"],
    required: true,
  },
  isSeen: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Notifications = mongoose.model("Notification", notificationSchema);
export default Notifications;