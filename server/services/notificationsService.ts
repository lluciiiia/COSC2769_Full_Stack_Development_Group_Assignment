import mongoose from "mongoose";
import Notifications from "../models/notification";
import Group from "../models/group";
import Post from "../models/post";

export const getNotificationByReciver = async (receiverId: string) => {
  try {
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    const notifications = await Notifications.find({
      receiverId: receiverObjectId,
    }).populate({
      path: "senderId",
      select: "name profilePictureURL _id",
    });

    const notificationsWithGroupDetails = await Promise.all(
      notifications.map(async (notification) => {
        if (notification.type === "GROUP_CREATION_APPROVAL") {
          const group = await Group.findById(notification?.groupId);

          return {
            ...notification.toObject(),
            groupDetails: {
              adminId: group?.groupAdmin,
              groupName: group?.name,
              groupImageURL: group?.imageURL,
            },
          };
        } else {
          return notification;
        }
      }),
    );
    console.log(notificationsWithGroupDetails);

    return notificationsWithGroupDetails;
  } catch (error) {
    console.error("Error fetching notifications", error);
    throw new Error("Failed to fetch notifications ");
  }
};

export const acceptGroupRequest = async (
  userId: string,
  notiId: string,
  groupId: string,
) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(notiId)) {
      throw new Error("Invalid ID format");
    }

    const oldNoti = await Notifications.findById(notiId);
    console.log("oldNoti:", oldNoti);

    if (!oldNoti) {
      throw new Error("Notification not found");
    }
    if (userId === oldNoti.id) {
      console.log("Can not join owned group");
      return;
    }
    const groupAdmin = userId;
    const group = await Group.findOne({ groupAdmin: groupAdmin.toString() });

    if (!group) {
      throw new Error("Group not found");
    }

    const senderObjectId = new mongoose.Types.ObjectId(oldNoti.senderId);
    console.log(senderObjectId, "Member already in group");
    if (!group.members.includes(senderObjectId)) {
      group.members.push(senderObjectId);
    } else {
      console.log("Already in group");
      return;
    }
    console.log(group, "Member already in group");
    await group.save();
    const newNoti = {
      senderId: userId,
      receiverId: oldNoti.senderId,
      groupId: groupId,
      type: "GROUP_REQUEST_ACCEPTED",
    };

    const notification = new Notifications(newNoti);

    await notification.save();

    // Delete the old notification
    await Notifications.findByIdAndDelete(notiId);

    return {
      success: true,
      message:
        "Group request accepted, new notification created, and old notification deleted",
      notification,
    };
  } catch (error) {
    console.error("Error accepting group request:", error);
    throw new Error("Failed to accept group request");
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

export const getGroupRequest = async (userId: string) => {
  try {
    // Find notifications sent by the user
    const notifications = await Notifications.find({
      senderId: userId,
    }).populate({
      path: "senderId",
      select: "name profilePictureURL _id",
    });

    // For each notification, find the corresponding group where the receiver is the groupAdmin
    const groupRequests = await Promise.all(
      notifications.map(async (notification) => {
        const group = await Group.findOne({
          groupAdmin: notification.receiverId,
        });

        return {
          notification,
          groupId: group?._id.toString(),
        };
      }),
    );

    return groupRequests;
  } catch (error) {
    console.error("Error fetching notifications", error);
    throw new Error("Failed to fetch notifications");
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

export const createGroupApprovalNotification = async (
  siteAdminId: string,
  groupId: string,
) => {
  try {
    const siteAdminObjectId = new mongoose.Types.ObjectId(siteAdminId);
    const groupObjectId = new mongoose.Types.ObjectId(groupId);

    const group = await Group.findById(groupObjectId);

    if (!group) {
      throw new Error("Group not found");
    }

    const newNotification = new Notifications({
      senderId: siteAdminObjectId,
      receiverId: group.groupAdmin,
      type: "GROUP_CREATION_APPROVAL",
      groupId: groupId,
      isAccepted: true,
      isSeen: false,
    });

    await newNotification.save();

    return { message: "Notificatin is created successfully" };
  } catch (error) {
    console.error("Error sending notifications", error);
    throw new Error("Failed to sending notifications");
  }
};

export const createCommentNotification = async (
  senderId: string,
  postId: string,
) => {
  try {
    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const postObjectId = new mongoose.Types.ObjectId(postId);

    const post = await Post.findById(postObjectId);

    if (!post) {
      throw new Error("Post not found");
    }

    const creatorId = post.creatorId;
    if (creatorId.toString() === senderId) {
      return {
        message: "No notification created as the comment is on own post",
      };
    }

    const newNotification = new Notifications({
      senderId: senderObjectId,
      receiverId: post.creatorId,
      type: "RECEIVE_COMMENT",
      postId: postObjectId,
      isAccepted: false,
      isSeen: false,
    });

    await newNotification.save();

    return { message: "Create notification successfully" };
  } catch (error) {
    console.error("Error sending notifications", error);
    throw new Error("Failed to sending notifications");
  }
};
