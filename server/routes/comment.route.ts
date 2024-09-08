import express from "express";
import {
  getAllComments,
  createComment,
  updateComment,
  deleteCommentById,
} from "../services/comment.service";
import { isAuthenticated } from "../middleware/authenticate";
const router = express.Router();

router.get("/", isAuthenticated,async (req, res) => {
  try {
    const comments = await getAllComments();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

router.post("/",isAuthenticated ,async (req, res) => {
  try {
    const newComment = await createComment(req.body);
    res.status(201).json({ message: "Comment created", comment: newComment });
  } catch (error: any) {
    if (error.message === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to create comment" });
  }
});

router.put("/",isAuthenticated ,async (req, res) => {
  try {
    const updatedComment = await updateComment(req.body);
    res.json({ message: "Comment updated", comment: updatedComment });
  } catch (error) {
    res.status(500).json({ error: "Failed to update comment" });
  }
});

router.delete("/:id",isAuthenticated ,async (req, res) => {
  try {
    await deleteCommentById(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

export default router;
