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
    enum: [
      "FRIEND_REQUEST",
      "FRIEND_REQUEST_ACCEPTED",
      "GROUP_REQUEST",
      "GROUP_REQUEST_ACCEPTED",
      "GROUP_CREATION_APPROVAL",
      "RECEIVE_REACTION",
      "RECEIVE_COMMENT",
    ],
    required: true,
  },
  groupId: { type: String },
  postId: { type: String },
  isAccepted: { type: Boolean, require: true, default: false },
  reactionType: { type: String },
  isSeen: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notifications = mongoose.model("Notification", notificationSchema);
export default Notifications;
