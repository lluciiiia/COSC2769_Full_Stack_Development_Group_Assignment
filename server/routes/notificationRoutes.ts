import express from "express";
import { isAuthenticated } from "../middleware/authenticate"; // Import the middleware
import {
  acceptedFriendRequestNotification,
  deleteNotification,
  getNotificationByReciver,
} from "../services/notificationsService";

const router = express.Router();

//get notification based on recivers
router.get("/", isAuthenticated, async (req, res) => {
  const userId = req.session.user.id;

  try {
    const notifications = await getNotificationByReciver(userId);
    console.log("route", notifications);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.put("/accepted/:notificationId", async (req, res) => {
  try {
    const { notificationId } = req.params;

    const result = await acceptedFriendRequestNotification(notificationId);

    res.json(result);
  } catch (error) {
    console.error("Error accepting notification:", error);
    res.status(500).json({ error: "Failed to delete notification" });
  }
});

router.delete("/:notificationId", isAuthenticated, async (req, res) => {
  try {
    const { notificationId } = req.params;

    const result = await deleteNotification(notificationId);

    res.json(result);
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ error: "Failed to delete notification" });
  }
});

export default router;
