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

    const comment = new Comment(commentData);
    const newComment = await comment.save();

    post.comments.push(newComment._id);
    await post.save();

    // Fetch the user who created the comment to populate the profileSection
    const user = await User.findById(commentData.userId);
    if (!user)
      throw new Error(`User not found for userId: ${commentData.userId}`);

    // Return the new comment along with the profileSection
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

export const updateComment = async (id: string, updatedData: any) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Validate before saving
    });

    if (!updatedComment) throw new Error("Comment not found");

    const user = await User.findById(updatedComment.userId);
    if (!user)
      throw new Error(`User not found for userId: ${updatedComment.userId}`);

    return {
      ...updatedComment.toObject(),
      profileSection: {
        profileImage: user.profilePictureURL,
        profileName: user.name,
      },
    };
  } catch (error: any) {
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
