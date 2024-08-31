import express from "express";
import Notifications from "../models/notification";
import mongoose from "mongoose";
import { isAuthenticated } from "../middleware/authenticate"; // Import the middleware

const router = express.Router();

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const notifications = await Notifications.find();
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.get("/userNoti", isAuthenticated, async (req, res) => {
  try {
    // Convert the session user ID to a MongoDB ObjectId
    const userObjectId = new mongoose.Types.ObjectId(req.session.user.id);

    // Find notifications where the user is the receiver
    const notifications = await Notifications.find({
      receiverId: userObjectId,
    }).populate("senderId", "name email profilePictureURL");

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const newNoti = new Notifications(req.body);
    console.log(newNoti);
    await newNoti.save();
    res.status(201).json({ message: "Notification created", noti: newNoti });
  } catch (error: any) {
    console.error("Error creating notification:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to create notification" });
  }
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const notiId = req.params.id;
    await Notifications.findByIdAndDelete(notiId);
    res.json({ message: "Notification deleted" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ error: "Failed to delete notification" });
  }
});

export default router;
