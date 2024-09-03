import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  groupId: String,

  content: { type: String, required: true },

  images: {
    type: [{ type: String }],
  },
  visibility: {
    type: String,
    enum: ["PUBLIC", "FRIEND_ONLY", "GROUP"],
    default: "PUBLIC",
    required: true,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reaction" }],

  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now },
  history: [
    {
      content: { type: String, required: true },
      images: [{ type: String }],
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
