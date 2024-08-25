import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reaction" }],
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
