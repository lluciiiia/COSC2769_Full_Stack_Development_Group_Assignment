import express, { Request, Response } from "express";
import {
  createReaction,
  fetchReaction,
  undoReaction,
} from "../services/reaction.service";
import mongoose from "mongoose";
import { isAuthenticated } from "../middleware/authenticate";
const router = express.Router();

router.post("/userReact",isAuthenticated ,async (req: Request, res: Response) => {
  try {
    const { postId, reactionType, sentFrom } = req.body;
    const userId = req.session.user.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new Error("Invalid postId format");
    }

    const result = await createReaction({
      postId,
      userId,
      reactionType,
      targetType: sentFrom,
    });
    res.status(201).json({ message: "React created", post: result });
  } catch (error: any) {
    console.error("Error creating react:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to create reaction" });
  }
});

router.post("/:postId",isAuthenticated ,async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!req.session || !req.session.user || !req.session.user.id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not logged in" });
    }
    const userId = req.session.user.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Invalid postId format" });
    }

    const result = await fetchReaction(postId, userId);

    res.status(200).json({ message: "Reaction fetched", reaction: result });
  } catch (error) {
    console.error("Error fetching reaction:", error);
    res.status(500).json({ error: "Failed to fetch reaction" });
  }
});


router.delete("/:postId/:userId",isAuthenticated ,async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const updatedReactions = await undoReaction(postId, userId);

    if (!updatedReactions) {
      return res.status(404).json({ error: "Reaction or target not found" });
    }

    res.json({ message: "Reaction deleted", reactions: updatedReactions });
  } catch (error) {
    console.error("Error deleting reaction:", error);
    res.status(500).json({ error: "Failed to delete reaction" });
  }
});

export default router;
