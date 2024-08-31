import Comment from "../models/comment";
import Reaction from "../models/reactions";

export const commentReaction = async (
  postId: string,
  userId: string,
  reactionType: string
) => {
  try {
    // Find the comment by ID
    const post = await Comment.findById(postId);
    if (!post) {
      throw new Error("Comment not found");
    }

    // Create a new reaction
    const newReaction = new Reaction({
      userId: userId,
      reactionType: reactionType,
      createdAt: new Date(),
    });

    await newReaction.save();

    post.reactions.push(newReaction._id);

    await post.save();

    return { message: "Reaction added successfully" };
  } catch (error) {
    console.error("Error adding reaction", error);
    throw new Error("Failed to add reaction");
  }
};
