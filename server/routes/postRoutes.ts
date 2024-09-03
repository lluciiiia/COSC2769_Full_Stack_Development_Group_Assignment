import express from "express";
import {
  createPost,
  updatePost,
  deletePostById,
  getPostById,
  getPostListByCreatorId,
  getPostByGroupId,
  getPostsForUser,
  getAllPosts,
} from "../services/postServices";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10; // Default to 10 posts per page
    const offset = parseInt(req.query.offset as string) || 0;

    const posts = await getAllPosts(limit, offset);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/profile/:userId", async (req, res) => {
  try {
    const posts = await getPostListByCreatorId(req.params.userId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/groups/:groupId", async (req, res) => {
  try {
    const posts = await getPostByGroupId(req.params.groupId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await createPost(req.body);
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    console.error("Error in route handler:", error);
    res.status(400).json({ error: error }); // Provide a clearer error message
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await updatePost(req.params.id, req.body);
    res.json({ message: "Post updated", post: updatedPost });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deletePostById(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
