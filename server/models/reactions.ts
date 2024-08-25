import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reactionType: {
    type: String,
    enum: ["LIKE", "LOVE", "HAHA", "ANGRY"],
    required: true,
  },
  dateCreated: { type: Date, default: Date.now },
});

const Reaction = mongoose.model("Reaction", reactionSchema);
export default Reaction;
