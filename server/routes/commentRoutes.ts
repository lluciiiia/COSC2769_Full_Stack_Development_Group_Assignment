import express from "express";
import Comment from "../models/comment";
const router = express.Router();

router.get('/',async (req, res) => {
    try{
        const comments= await Comment.find();
        res.json(comments);
    }catch(error){
        console.error("Error fetching comments", error);
        res.status(500).json({error: 'Falied to fetch comments'});
    }
  });
  
  router.post('/',async (req, res) => {
    try {
        const newComment = new Comment(req.body);  
        console.log(newComment);
        await newComment.save();  
        res.status(201).json({ message: 'Comment created', post: newComment });
      } catch (error: any) {
        console.error("Error creating comment:", error);

        if (error.name === 'ValidationError') {
          return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to create comment' });
      }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const commentId = req.params.id;
      await Comment.findByIdAndDelete(commentId);  
      res.json({ message: 'Comment deleted' });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  });

  export default router;