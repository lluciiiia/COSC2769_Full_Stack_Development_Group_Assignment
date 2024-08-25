import Group from "../models/group";
import Post from "../models/post";
import User from "../models/user";

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
    // Check if creator exists
    const user = await User.findById(postData.creatorId);
    console.log("user: " + user);
    if (!user) throw new Error("User not found with the provided creatorId");

    // Check if group exists
    if (postData.groupId && postData.groupId != "") {
      const group = await Group.findById(postData.groupId);
      console.log("group: " + group);

      if (!group) throw new Error("Group not found with the provided groupId");

      // Check if the user is a member of the group
      const isMember = group.members.includes(postData.creatorId);
      if (!isMember) throw new Error("User is not a member of the group");
    }

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
