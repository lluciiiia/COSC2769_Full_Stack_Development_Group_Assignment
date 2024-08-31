import mongoose from "mongoose";
import User from "../models/user";
import { createFriendRequestNotification } from "./notificationsService";

export const getAllUsers = async () => {
  try {
    const users = await User.find().populate({
      path: "friends",
      select: "name profilePictureURL",
    });

    if (users.length === 0) throw new Error("No users found");

    return users;
  } catch (error) {
    console.error("Error fetching users", error);
    throw new Error("Failed to fetch users");
  }
};

//get 1 user by id
export const getUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId).populate({
      path: "friends",
      select: "name profilePictureURL",
    });

    if (!user) throw new Error("User can not found with the provided id");
    return user;
  } catch (error) {
    console.error("Error fetching user by id", error);
    throw new Error("Failed to fetch user");
  }
};

export const addFriend = async (userId: string, friendId: string) => {
  try {
    await createFriendRequestNotification(userId, friendId);

    return { message: "Notification sent successfully." };
  } catch (error) {
    console.error("Error sending friend request", error);
    throw new Error("Failed to send friend request");
  }
};

export const getViewUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId)
      .select("-password") // Exclude the password field
      .populate({
        path: "friends",
        select: "name profilePictureURL", // Include only specific fields in the friends array
      });

    if (!user) throw new Error("User can not found with the provided id");
    return user;
  } catch (error) {
    console.log("Error fetching user by id", error);
    throw new Error("Failed to fetch user");
  }
};

export const updateUser = async (userId: string, updateData: any) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!user) throw new Error("User can not found with the provided id");

    return user;
  } catch (error) {
    console.error("Error fetching user by id", error);
    throw new Error("Failed to fetch user");
  }
};

export const unfriendById = async (userId: string, friendId: string) => {
  try {
    const user = await User.findById(userId);
    const friendObjectId = new mongoose.Types.ObjectId(friendId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.friends.includes(friendObjectId)) {
      throw new Error("Friend not found");
    }

    user.friends = user.friends.filter(
      (friend) => friend.toString() !== friendId,
    );

    await user.save();
  } catch (error) {
    console.error("Error removing friend", error);
    throw new Error("Failed to remove friend");
  }
};

export const acceptFriendRequest = async (userId: string, friendId: string) => {
  try {
    const friendObjectId = new mongoose.Types.ObjectId(friendId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const user = await User.findById(userObjectId);

    if (!user) {
      throw new Error("User not found");
    }

    const friend = await User.findById(friendObjectId);

    if (!friend) {
      throw new Error("Friend not found");
    }

    if (
      user.friends.includes(friendObjectId) ||
      friend.friends.includes(userObjectId)
    ) {
      throw new Error("Already Friends");
    }

    user.friends.push(friendObjectId);
    friend.friends.push(userObjectId);

    await user.save();
    await friend.save();

    return { message: "Friend request accepted successfully" };
  } catch (error) {
    console.error("Error accepting friend request: ", error);
    throw new Error("Failed to accept friend request ");
  }
};
