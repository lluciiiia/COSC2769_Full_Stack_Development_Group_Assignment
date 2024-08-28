import express from "express";
import User from "../models/user";
import {
  getAllUsers,
  getUserById,
  getViewUserById,
  updateUser,
} from "../services/userServices";
const router = express.Router();

//GET /user- fetch all user
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/view/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getViewUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const user = await updateUser(userId, updatedData);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    console.log(newUser);
    await newUser.save(); // Save the new user to MongoDB
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error: any) {
    console.error("Error creating user:", error);
    // Check if the error is a validation error and return a 400 status code with the error message
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
