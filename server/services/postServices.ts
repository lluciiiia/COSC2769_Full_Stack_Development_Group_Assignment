import Group from "../models/group";
import Post from "../models/post";
import User from "../models/user";

export const getAllPosts = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error(`User not found for userId: ${userId}`);

    const userObjectId = user._id;

    const posts = await Post.find();

    // Filter and enhance posts based on visibility
    const enhancedPosts = await Promise.all(
      posts.map(async (post) => {
        if (post.visibility === "PUBLIC") {
          return await enhancePostWithUser(post); // Enhance PUBLIC posts
        } else if (post.visibility === "GROUP") {
          const group = await Group.findById(post.groupId);
          if (group && group.members.includes(userObjectId)) {
            return await enhancePostWithUser(post); // Enhance GROUP posts if user is a member
          }
        } else if (post.visibility === "FRIEND_ONLY") {
          const creator = await User.findById(post.creatorId);
          if (creator && creator.friends.includes(userObjectId)) {
            return await enhancePostWithUser(post); // Enhance FRIEND_ONLY posts if user is a friend of the creator
          }
        }
        return null; // Return null for posts that don't meet visibility criteria
      }),
    );

    // Remove null entries from the enhanced posts
    const validEnhancedPosts = enhancedPosts.filter((post) => post !== null);

    return validEnhancedPosts;
  } catch (error) {
    console.error("Error fetching posts", error);
    throw new Error("Failed to fetch posts");
  }
};

export const getPostById = async (postId: string) => {
  try {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found with the provided id");

    const enhancedPost = await enhancePostWithUser(post);

    return enhancedPost;
  } catch (error) {
    console.error("Error fetching post by id", error);
    throw new Error("Failed to fetch post");
  }
};

// Helper function to enhance a post with user information
const enhancePostWithUser = async (post: any) => {
  const user = await User.findById(post.creatorId);
  if (!user) throw new Error(`User not found for creatorId: ${post.creatorId}`);

  return {
    ...post.toObject(), // Convert Mongoose document to plain JS object
    profileSection: {
      profileImage: user.profilePictureURL,
      profileName: user.name,
    },
  };
};

export const createPost = async (postData: any) => {
  try {
    // Check if creator exists
    const user = await User.findById(postData.creatorId);
    if (!user) throw new Error("User not found with the provided creatorId");

    // Check if group exists
    if (postData.groupId && postData.groupId != "") {
      const group = await Group.findById(postData.groupId);

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