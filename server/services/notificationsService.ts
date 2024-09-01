import mongoose from "mongoose";
import Notifications from "../models/notification";

export const getNotificationByReciver = async (receiverId: string) => {
  try {
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    const notifications = await Notifications.find({
      receiverId: receiverObjectId,
    }).populate({
      path: "senderId", // The field in Notification schema
      select: "name profilePictureURL _id", // The fields you want to retrieve from User model
    });

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications", error);
    throw new Error("Failed to fetch notifications ");
  }
};

export const getNotificationBySender = async (senderId: string) => {
  try {
    const senderObjectId = new mongoose.Types.ObjectId(senderId);

    const notifications = await Notifications.find({
      senderId: senderObjectId,
    });

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications", error);
    throw new Error("Failed to fetch notifications ");
  }
};

export const createFriendRequestNotification = async (
  senderId: string,
  receiverId: string,
) => {
  try {
    const senderIdObject = new mongoose.Types.ObjectId(senderId);
    const receiverIdObject = new mongoose.Types.ObjectId(receiverId);

    const newNotification = new Notifications({
      senderId: senderIdObject,
      receiverId: receiverIdObject,
      type: "FRIEND_REQUEST",
      isAccepted: false,
      isSeen: false,
    });

    await newNotification.save();

    return newNotification;
  } catch (error) {
    console.error("Error creating notifications", error);
    throw new Error("Failed to creating notifications");
  }
};

export const acceptedFriendRequestNotification = async (
  notificationId: string,
) => {
  try {
    const notificationObjectId = new mongoose.Types.ObjectId(notificationId);

    const notification = await Notifications.findById(notificationObjectId);

    if (!notification) {
      throw new Error("Notification not found");
    }

    const { senderId, receiverId } = notification;

    const updatedNotification = await Notifications.findByIdAndUpdate(
      notificationObjectId,
      {
        senderId: receiverId,
        receiverId: senderId,
        type: "FRIEND_REQUEST_ACCEPTED",
        isAccepted: true,
      },
      { new: true },
    );

    if (!updatedNotification) {
      throw new Error("Failed to update notification");
    }

    return { message: "Friend request accepted successfully." };
  } catch (error) {
    console.error("Error accepting friend request notifications", error);
    throw new Error("Failed to accept friend requestnotifications");
  }
};

export const deleteNotification = async (notificationId: string) => {
  try {
    const notificationObjectId = new mongoose.Types.ObjectId(notificationId);

    const deletedNotification =
      await Notifications.findByIdAndDelete(notificationObjectId);

    if (!deletedNotification) {
      throw new Error("Notification not found");
    }
    return { message: "Notification deleted successfully" };
  } catch (error) {
    console.error("Error deleting notifications", error);
    throw new Error("Failed to delete notifications");
  }
};
