import Comment from "../models/comment";
import Reaction from "../models/reactions";

export const commentReaction = async (
  postId: string,
  userId: string,
  reactionType: string,
) => {
  try {
    const post = await Comment.findById(postId);
    if (!post) {
      throw new Error("Comment not found");
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
    const existingReaction = await Reaction.findOne({ postId, userId });

    if (!existingReaction) {
      throw new Error("raction can not found with the provided id");
    }
    return existingReaction;
  } catch (error) {
    console.error("Error adding/updating reaction", error);
    throw new Error("Failed to add/update reaction");
  }
};
