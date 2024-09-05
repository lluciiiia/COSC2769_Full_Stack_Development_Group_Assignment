import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reactionType: {
    type: String,
    enum: ["LIKE", "LOVE", "HAHA", "ANGRY"],
    required: true,
    default: 'LIKE'
  },
  postId: { type: mongoose.Schema.Types.ObjectId, refPath: 'onModel', required: true },
  createdAt: { type: Date, default: Date.now },
  onModel: {
    type: String,
    required: true,
    enum: ['Post', 'Comment'],
  }
});

const Reaction = mongoose.model("Reaction", reactionSchema);
export default Reaction;
