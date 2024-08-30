import mongoose from "mongoose";
import User from "../models/user";
import Notifications from "../models/notification";
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
    // accept frients section
    // const user = await User.findById(userId);
    // const friendObjectId = new mongoose.Types.ObjectId(friendId);

    // // if (!user) {
    // //   throw new Error("User not found");
    // // }


    // // if (user.friends.includes(friendObjectId)) {
    // //   throw new Error("Friend already added");
    // // }


    // // user.friends.push(friendObjectId);
    // // await user.save();


    const newNotification = new Notifications({
      senderId: userId,
      receiverId: friendId,
      type: "FRIEND_REQUEST",
      isSeen: false,
    });

    await newNotification.save();

    return { message: "Friend added successfully and notification sent." };
  } catch (error) {
    console.error("Error adding friend", error);
    throw new Error("Failed to add friend");
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
