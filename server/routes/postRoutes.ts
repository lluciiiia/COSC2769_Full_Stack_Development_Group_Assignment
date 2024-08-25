import express from "express";
import Post from "../models/post";
const router = express.Router();

router.get('/',async (req, res) => {
    try{
        const posts= await Post.find();
        res.json(posts);
    }catch(error){
        console.error("Error fetching posts", error);
        res.status(500).json({error: 'Falied to fetch posts'});
    }
  });
  
  router.post('/',async (req, res) => {
    try {
        const newPost = new Post(req.body);  
        console.log(newPost);
        await newPost.save();  
        res.status(201).json({ message: 'Post created', post: newPost });
      } catch (error: any) {
        console.error("Error creating post:", error);

        if (error.name === 'ValidationError') {
          return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to create post' });
      }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      await Post.findByIdAndDelete(postId);  
      res.json({ message: 'Post deleted' });
    } catch (error) {
      console.error("Error deleting Post:", error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  });

  export default router;