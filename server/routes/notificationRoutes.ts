import express from "express";
import { isAuthenticated } from "../middleware/authenticate"; // Import the middleware
import {
  acceptedFriendRequestNotification,
  deleteNotification,
  getNotificationByReciver,
  getNotificationBySender,
  getGroupRequest,
  acceptGroupRequest,
  createGroupApprovalNotification,
} from "../services/notificationsService";

const router = express.Router();

//get notification by recivers
router.get("/received", isAuthenticated, async (req, res) => {
  const userId = req.session.user.id;

  try {
    const notifications = await getNotificationByReciver(userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

//get notification by senders
router.get("/sent", isAuthenticated, async (req, res) => {
  const userId = req.session.user.id;

  try {
    const notifications = await getNotificationBySender(userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to sent notifications" });
  }
});

router.post("/group-approval/:groupId", async (req, res) => {
  try {
    const siteAdminId = req.session.user.id;
    const { groupId } = req.params;

    const result = await createGroupApprovalNotification(
      siteAdminId,
      groupId,
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to sent notifications" });
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

router.get("/groupRequest", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user.id;

    const result = await getGroupRequest(userId);
    res.json(result);
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ error: "Failed to delete notification" });
  }
});

router.put("/acceptRequest", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { notiId, senderId } = req.body;

    const notification = await acceptGroupRequest(userId, notiId, senderId);
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
