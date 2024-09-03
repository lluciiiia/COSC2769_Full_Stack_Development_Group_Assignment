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
    let target;
    let newNoti;
    if (targetType === "post") {
      target = await Post.findById(postId);
      newNoti = {
        senderId: userId,
        receiverId: target?.creatorId,
        type: "RECEIVE_REACTION",
        postId: target?.id,
      };
    } else if (targetType === "comment") {
      target = await Comment.findById(postId);
      newNoti = {
        senderId: userId,
        receiverId: target?.userId,
        type: "RECEIVE_REACTION",
        postId: target?.postId,
      };
    } else {
      throw new Error("Invalid target type");
    }

    const notification = new Notifications(newNoti);

    if (!target) {
      throw new Error(
        `${targetType.charAt(0).toUpperCase() + targetType.slice(1)} not found`,
      );
    }
    notification.save();
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
    const existingReaction = await Reaction.findOne({ postId, userId });

    if (!existingReaction) {
      return null;
    }
    console.log(existingReaction);
    return existingReaction;
  } catch (error) {
    console.error("Error fetching reaction", error);
    throw new Error("Failed to fetch reaction");
  }
};

export const undoReaction= async (notiId: string)=>{
  try{
    const existingReaction = await Reaction.findById(notiId);

    if(!existingReaction){
      console.log("Cant find notification");
      return;
    }

    console.log("Reaction deleted successfully");
    return 
  }catch(error){
    console.error("Error in undoReaction");
  }
}
// export const fetchReactionByPost= async (postId: string)=>{
//   try{
//     const existingReaction= await Reaction.findOne({postId});
//   }catch(error){
//     console.error("Error fetching reaction", error);
//     throw new Error("Failed to fetch reaction");
//   }
// }
