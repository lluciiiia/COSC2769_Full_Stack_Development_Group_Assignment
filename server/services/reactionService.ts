import Comment from "../models/comment";
import Reaction from "../models/reactions";
import Post from "../models/post";

export const commentReaction = async (
  postId: string,
  userId: string,
  reactionType: string,
  targetType: string,
) => {
  try {
    let post;
    if (targetType === "post") {
      post = await Post.findById(postId);
    } else if (targetType === "comment") {
      post = await Comment.findById(postId);
    } else {
      throw new Error("Invalid target type");
    }

    if (!post) {
      throw new Error(
        `${targetType.charAt(0).toUpperCase() + targetType.slice(1)} not found`,
      );
    }

    let existingReaction = await Reaction.findOne({ postId, userId });

    if (existingReaction) {
      existingReaction.reactionType = reactionType;
      await existingReaction.save();
    } else {
      existingReaction = new Reaction({
        userId: userId,
        postId: postId,
        reactionType: reactionType,
        createdAt: new Date(),
      });
      await existingReaction.save();

      post.reactions.push(existingReaction._id);
      await post.save();
    }

    return { message: "Reaction added/updated successfully" };
  } catch (error) {
    console.error("Error adding/updating reaction", error);
    throw new Error("Failed to add/update reaction");
  }
};

export const fetchingUserReact = async (postId: string, userId: string) => {
    try {
      console.log("Attempting to find reaction for postId:", postId, "and userId:", userId);
      const existingReaction = await Reaction.findOne({ postId, userId });
  
      if (!existingReaction) {
        console.log("No reaction found for postId:", postId, "and userId:", userId);
        return null; // Return null if no reaction is found
      }
      return existingReaction;
    } catch (error) {
      console.error("Error fetching reaction", error);
      throw new Error("Failed to fetch reaction");
    }
  };
