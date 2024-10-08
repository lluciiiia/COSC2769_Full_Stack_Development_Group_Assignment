import mongoose from "mongoose";
import Reaction from "../models/reactions";
import Comment from "../models/comment";
import Post from "../models/post";
import Notifications from "../models/notification";

export const createReaction = async ({
  postId,
  userId,
  reactionType,
  targetType,
}: {
  postId: string;
  userId: string;
  reactionType: string;
  targetType: string;
}) => {
  try {
    let isCreator = true;
    let target;
    let newNoti;
    if (targetType === "post") {
      target = await Post.findById(postId);
      if (target?.creatorId.toString() !== userId) {
        isCreator = false;
        newNoti = {
          senderId: userId,
          receiverId: target?.creatorId,
          type: "RECEIVE_REACTION",
          postId: target?.id,
        };
      }
    } else {
      target = await Comment.findById(postId);
      if (target?.userId.toString() !== userId) {
        isCreator = false;
        newNoti = {
          senderId: userId,
          receiverId: target?.userId,
          type: "RECEIVE_REACTION",
          postId: target?.postId,
        };
      }
    }

    const notification = new Notifications(newNoti);

    if (!target) {
      throw new Error(
        `${targetType.charAt(0).toUpperCase() + targetType.slice(1)} not found`,
      );
    }

    if (!isCreator) notification.save();

    let existingReaction = await Reaction.findOne({
      postId: new mongoose.Types.ObjectId(postId),
      userId,
    });

    if (existingReaction) {
      existingReaction.reactionType = reactionType;
      await existingReaction.save();
    } else {
      existingReaction = new Reaction({
        userId: new mongoose.Types.ObjectId(userId),
        postId: new mongoose.Types.ObjectId(postId),
        reactionType: reactionType,
        createdAt: new Date(),
        onModel: targetType === "post" ? "Post" : "Comment",
      });
      await existingReaction.save();

      target.reactions.push(existingReaction._id);
      await target.save();
    }

    return { message: "Reaction added/updated successfully" };
  } catch (error) {
    console.error("Error adding/updating reaction", error);
    throw new Error("Failed to add/update reaction");
  }
};

export const fetchReaction = async (postId: string, userId: string) => {
  try {
    let existingReaction = await Reaction.findOne({
      postId: new mongoose.Types.ObjectId(postId),
      userId,
    });

    if (!existingReaction) return null;

    return existingReaction;
  } catch (error) {
    console.error("Error fetching reaction", error);
    throw new Error("Failed to fetch reaction");
  }
};
export const undoReaction = async (postId: string, userId: string) => {
  try {
    const existingReaction = await Reaction.findOne({ postId, userId });

    if (!existingReaction) return null;

    await Reaction.findByIdAndDelete(existingReaction._id);

    return { message: "Delete successfully" };
  } catch (error) {
    console.error("Error in undoReaction", error);
    throw new Error("Failed to delete reaction");
  }
};
