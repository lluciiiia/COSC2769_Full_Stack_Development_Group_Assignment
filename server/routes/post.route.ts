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
  getViewedUserPosts,
} from "../services/post.service";
import { isAuthenticated } from "../middleware/authenticate";
const router = express.Router();

router.get("/all",isAuthenticated ,async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/",isAuthenticated ,async (req, res) => {
  try {
    const userId = req.session.user.id;
    const posts = await getPostsForUser(userId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/profile/:userId",isAuthenticated ,async (req, res) => {
  try {
    const posts = await getPostListByCreatorId(req.params.userId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//fetch post in profile
router.get("/view-profile/:viewedUserId",isAuthenticated ,async (req, res) => {
  try {
    const userId = req.session.user.id;
    const viewedUserId = req.params.viewedUserId;
    const posts = await getViewedUserPosts(userId, viewedUserId);

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/groups/:groupId",isAuthenticated ,async (req, res) => {
  try {
    const posts = await getPostByGroupId(req.params.groupId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id",isAuthenticated ,async (req, res) => {
  try {
    const userId = req.session.user.id;
    const post = await getPostById(req.params.id, userId);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/",isAuthenticated ,async (req, res) => {
  try {
    const newPost = await createPost(req.body);
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    console.error("Error in route handler:", error);
    res.status(400).json({ error: error }); // Provide a clearer error message
  }
});

router.put("/:id",isAuthenticated ,async (req, res) => {
  try {
    const updatedPost = await updatePost(req.params.id, req.body);
    res.json({ message: "Post updated", post: updatedPost });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.delete("/:id",isAuthenticated ,async (req, res) => {
  try {
    await deletePostById(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
