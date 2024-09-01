import mongoose from "mongoose";
import Reaction from "../models/reactions";
import Comment from "../models/comment";
import Post from "../models/post";

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
    if (targetType === "post") {
      target = await Post.findById(postId);
    } else if (targetType === "comment") {
      target = await Comment.findById(postId);
    } else {
      throw new Error("Invalid target type");
    }

    if (!target) {
      throw new Error(
        `${targetType.charAt(0).toUpperCase() + targetType.slice(1)} not found`,
      );
    }

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
      console.log("Attempting to find reaction for postId:", postId, "and userId:", userId);
      const existingReaction = await Reaction.findOne({ postId, userId });
  
      if (!existingReaction) {
        console.log("No reaction found for postId:", postId, "and userId:", userId);
        return null;
      }
      console.log(existingReaction)
      return existingReaction;
    } catch (error) {
      console.error("Error fetching reaction", error);
      throw new Error("Failed to fetch reaction");
    }
  };

  // export const fetchReactionByPost= async (postId: string)=>{
  //   try{
  //     const existingReaction= await Reaction.findOne({postId});
  //   }catch(error){
  //     console.error("Error fetching reaction", error);
  //     throw new Error("Failed to fetch reaction");
  //   }
  // }
