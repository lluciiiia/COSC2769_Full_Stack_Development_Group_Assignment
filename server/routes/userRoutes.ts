import express from "express";
import User from "../models/user";
const router = express.Router();


//GET /user- fetch all user
router.get('/', async (req, res) => {
  try{
    const users= await User.find();
    res.json(users);
  }catch(error){
    console.error("Error fetching users: ", error);
    res.status(500).json({error: 'Failed to fetch users'});
  }
  
});

router.post('/', async (req, res) => {
    try {
      const newUser = new User(req.body);  
      console.log(newUser);
      await newUser.save();  // Save the new user to MongoDB
      res.status(201).json({ message: 'User created', user: newUser });
    } catch (error: any) {
      console.error("Error creating user:", error);
      // Check if the error is a validation error and return a 400 status code with the error message
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to create user' });
    }
  });
  

  router.delete('/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      await User.findByIdAndDelete(userId);  
      res.json({ message: 'User deleted' });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });
export default router;
