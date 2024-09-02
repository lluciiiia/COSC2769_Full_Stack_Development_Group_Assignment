import Comment from "../models/comment";
import Post from "../models/post";
import User from "../models/user";

export const getAllComments = async () => {
  try {
    return await Comment.find();
  } catch (error) {
    console.error("Error fetching comments", error);
    throw new Error("Failed to fetch comments");
  }
};

export const createComment = async (commentData: any) => {
  try {
    const postId = commentData.postId;
    const post = await Post.findById(postId);
    if (!post) throw new Error(`Post not found for postId: ${postId}`);

    // Create a new comment
    const comment = new Comment({
      ...commentData,
    });
    const newComment = await comment.save();

    // Update the post with the new comment
    post.comments.push(newComment._id);
    await post.save();

    const user = await User.findById(commentData.userId);
    if (!user)
      throw new Error(`User not found for userId: ${commentData.userId}`);

    return {
      ...newComment.toObject(),
      profileSection: {
        profileImage: user.profilePictureURL,
        profileName: user.name,
      },
    };
  } catch (error: any) {
    console.error("Error creating comment:", error);
    if (error.name === "ValidationError") {
      throw new Error(error.message);
    }
    throw new Error("Failed to create comment");
  }
};

export const updateComment = async (updatedData: any) => {
  try {
    const existingComment = await Comment.findById(updatedData.id);
    if (!existingComment) throw new Error("Comment not found");

    // Add the current content to the history before updating
    existingComment.history.push({
      content: existingComment.content, // Store the previous content
    });

    // Update the comment's content and updatedAt
    existingComment.content = updatedData.content;
    existingComment.updatedAt = new Date();

    // Fetch the user who created the comment to populate the profileSection
    const user = await User.findById(existingComment.userId);
    if (!user)
      throw new Error(`User not found for userId: ${existingComment.userId}`);

    // Save the updated comment
    const updatedComment = await existingComment.save();

    return {
      ...updatedComment.toObject(),
      profileSection: {
        profileImage: user.profilePictureURL,
        profileName: user.name,
      },
    };
  } catch (error: any) {
    console.error("Error updating comment:", error);
    if (error.name === "ValidationError") throw new Error(error.message);
    throw new Error("Failed to update comment");
  }
};

export const deleteCommentById = async (commentId: string) => {
  try {
    await Comment.findByIdAndDelete(commentId);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Failed to delete comment");
  }
};
