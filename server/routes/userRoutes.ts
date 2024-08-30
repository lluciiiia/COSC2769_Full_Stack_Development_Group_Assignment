import express from "express";
import User from "../models/user";
import {
  getAllUsers,
  getUserById,
  getViewUserById,
  unfriendById,
  updateUser,
  addFriend
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

router.put("/addfriend/:friendId", async (req, res) => {
  try {
    // Use hardcoded user ID for testing
    const userId = req.session.user.id;
    const { friendId } = req.params;

    const result = await addFriend(userId, friendId);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ error: "Failed to add friend" });
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
    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.delete("/unfriend/:friendId", async (req, res) => {
  try {
    const userId=req.session.user.id;
    const { friendId } = req.params;
    await unfriendById(userId, friendId);

    res.json({ message: "Friend removed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
