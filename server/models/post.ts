import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  groupId:String,
  content: { type: String, required: true },
  imageURL: { type: String },
  createdAt: { type: Date, default: Date.now },
  visibility: {
    type: String,
    enum: ["PUBLIC", "FRIEND_ONLY", "GROUP"],
    default: "PUBLIC",
    required: true,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reaction" }],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
