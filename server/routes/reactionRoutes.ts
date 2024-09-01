import express, { Request, Response } from "express";
import Reaction from "../models/reactions";
import {
  createReaction,
  fetchReaction,
} from "../services/reactionService";
import mongoose from "mongoose";
import { useParams } from "react-router-dom";

const router = express.Router();

router.post("/userReact", async (req: Request, res: Response) => {
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

router.post("/:postId", async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!req.session || !req.session.user || !req.session.user.id) {
      return res.status(401).json({ error: "Unauthorized: User not logged in" });
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

// router.get("/getReaction/:postId", async(req: Request, res: Response)=>{
//   try{
//       const {postId}= req.params;

      
//   }catch(error){

//   }
// })

router.delete("/:id", async (req: Request, res: Response) => {
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
