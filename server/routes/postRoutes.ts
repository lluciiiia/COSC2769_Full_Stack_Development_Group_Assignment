import express from "express";
import {
  getAllPosts,
  createPost,
  deletePostById,
  getPostById,
  getPostListByCreatorId,
  getPostByGroupId
} from "../services/postServices";

const router = express.Router();

router.get("/all/:userId", async (req, res) => {
  try {
    const posts = await getAllPosts(req.params.userId);
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
