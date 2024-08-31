import express from "express";
import Reaction from "../models/reactions";
import {
  commentReaction,
  fetchingUserReact,
} from "../services/reactionService";
const router = express.Router();

router.post("/userReact", async (req, res) => {
  try {
    const { postId, reactionType } = req.body;
    const userId = req.session.user.id;
    // console.log(postId + "HELLO ");
    const result = await commentReaction(postId, userId, reactionType);
    res.status(201).json({ message: "React created", post: result });
  } catch (error: any) {
    console.error("Error creating react:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to create reaction" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.session.user.id;

    const result = await fetchingUserReact(postId, userId);

    res.status(201).json({ message: "React created", post: result });
  } catch (error) {
    console.error("Error fetching reaction:", error);
    res.status(500).json({ error: "Failed to fetch reaction" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const reactId = req.params.id;
    await Reaction.findByIdAndDelete(reactId);
    res.json({ message: "Reaction deleted" });
  } catch (error) {
    console.error("Error deleting reaction:", error);
    res.status(500).json({ error: "Failed to delete reaction" });
  }
});

export default router;
