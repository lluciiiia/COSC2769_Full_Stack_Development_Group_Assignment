import express from "express";
import User from "../models/user";
import {
  getAllUsers,
  getUserById,
  getViewUserById,
  unfriendById,
  updateUser,
  addFriend,
  acceptFriendRequest,
  groupJoinRequest,
  getAllViewedUsers,
} from "../services/user.service";
import { isAuthenticated } from "../middleware/authenticate";
import mongoose from "mongoose";

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

// get all users for searching (only return neccessary information)
router.get("/view-users", async (req, res) => {
  try {
    const users = await getAllViewedUsers();
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

router.put("/addfriend/:friendId", async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { friendId } = req.params;

    const result = await addFriend(userId, friendId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to add friend" });
  }
});

router.put("/friend-requests/:friendId/accept", async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { friendId } = req.params;

    const result = await acceptFriendRequest(userId, friendId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to accpet friend request" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const user = await updateUser(userId, updatedData);

    if (req.session.user && req.session.user.id === userId) {
      req.session.user = {
        id: user._id.toString(),
        isAuthenticated: true,
        name: user.name,
        profilePictureURL: user.profilePictureURL ?? "",
        isAdmin: user.isAdmin,
        email: user.email,
      };
    }

    res.cookie("isAuthenticated", true, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      signed: true,
    });
    res.cookie("userId", req.session.user.id, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      signed: true,
    });
    res.cookie("userName", req.session.user.name, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      signed: true,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
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
    const userId = req.session.user.id;
    const { friendId } = req.params;
    await unfriendById(userId, friendId);

    res.json({ message: "Friend removed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/sent/:groupId", async (req, res) => {
  try {
    const userId = req.session.user.id; // Retrieve user ID from the session
    const { groupId } = req.params;

    // Call the groupJoinRequest function
    const result = await groupJoinRequest(userId, groupId);

    if (!result.success) {
      return res.status(400).json({ message: result.message }); // Send a custom error message
    }

    // Respond with success if notification is created
    res.status(200).json({
      message: "Notification sent successfully",
      notification: result.notification,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

export default router;
