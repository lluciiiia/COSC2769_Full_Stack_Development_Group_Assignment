import Post from "../models/post";

export const getAllPosts = async () => {
  try {
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.error("Error fetching posts", error);
    throw new Error("Failed to fetch posts");
  }
};

export const createPost = async (postData: any) => {
  try {
    const newPost = new Post(postData);
    await newPost.save();
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
};

export const deletePostById = async (postId: String) => {
  try {
    await Post.findByIdAndDelete(postId);
  } catch (error) {
    console.error("Error deleting Post:", error);
    throw new Error("Failed to delete post");
  }
};
