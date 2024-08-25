import Comment from "../models/comment";
import Post from "../models/post";

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

    return newComment;
  } catch (error: any) {
    console.error("Error creating comment:", error);
    if (error.name === "ValidationError") {
      throw new Error(error.message);
    }
    throw new Error("Failed to create comment");
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
