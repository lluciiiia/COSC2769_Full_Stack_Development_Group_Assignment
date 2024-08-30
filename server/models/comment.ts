import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reaction" }],
  history: [
    {
      content: { type: String, required: true },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
