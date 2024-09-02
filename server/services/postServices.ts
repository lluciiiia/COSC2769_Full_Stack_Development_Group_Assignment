import Group from "../models/group";
import Post from "../models/post";
import User from "../models/user";

export const getAllPosts = async () => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "comments",
        populate: {
          path: "reactions",
          populate: {
            path: "userId", // Populate user details for reactions
            select: "name profilePictureURL", // Select the fields you want
          },
        },
      });

    // Filter and enhance posts based on visibility & their own posts
    const enhancedPosts = await Promise.all(
      posts.map(async (post) => {
        return await enhancePostWithUser(post);
      }),
    );

    return enhancedPosts;
  } catch (error) {
    console.error("Error fetching posts", error);
    throw new Error("Failed to fetch posts");
  }
};

export const getPostsForUser = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error(`User not found for userId: ${userId}`);

    const userObjectId = user._id;

    const posts = await Post.find().populate({
      path: "comments",
      populate: {
        path: "reactions",
        populate: {
          path: "userId", // Populate user details for reactions
          select: "name profilePictureURL", // Select the fields you want
        },
      },
    });

    // Filter and enhance posts based on visibility & their own posts
    const enhancedPosts = await Promise.all(
      posts.map(async (post) => {
        if (post.creatorId.toString() === userObjectId.toString()) {
          return await enhancePostWithUser(post);
        } else if (post.visibility === "PUBLIC") {
          return await enhancePostWithUser(post);
        } else if (post.visibility === "GROUP") {
          const group = await Group.findById(post.groupId);
          if (group && group.members.includes(userObjectId))
            return await enhancePostWithUser(post);
        } else if (post.visibility === "FRIEND_ONLY") {
          const creator = await User.findById(post.creatorId);
          if (creator && user.friends.includes(creator._id))
            return await enhancePostWithUser(post);
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

export const getPostListByCreatorId = async (creatorId: string) => {
  try {
    const posts = await Post.find({ creatorId }).populate({
      path: "comments",
      populate: {
        path: "reactions",
        populate: {
          path: "userId", // Populate user details for reactions
          select: "name profilePictureURL", // Select the fields you want
        },
      },
    });

    // Enhance each post with user information
    const enhancedPosts = await Promise.all(
      posts.map(async (post) => {
        return await enhancePostWithUser(post);
      }),
    );

    return enhancedPosts;
  } catch (error) {
    console.error("Error fetching posts", error);
    throw new Error("Failed to fetch posts");
  }
};

export const getPostById = async (postId: string) => {
  try {
    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: {
        path: "reactions",
        populate: {
          path: "userId", // Populate user details for reactions
          select: "name profilePictureURL", // Select the fields you want
        },
      },
    });
    if (!post) throw new Error("Post not found with the provided id");

    const enhancedPost = await enhancePostWithUser(post);

    return enhancedPost;
  } catch (error) {
    console.error("Error fetching post by id", error);
    throw new Error("Failed to fetch post");
  }
};

export const getPostByGroupId = async (groupId: string) => {
  try {
    // const {groupId}= req.params;
    const posts = await Post.find({ groupId: groupId })
      .populate({
        path: "creatorId", // Populate creatorId
        select: "name profilePictureURL profileName _id", // Select fields you want from creatorId
      })
      .populate({
        path: "comments",
        populate: {
          path: "reactions",
          populate: {
            path: "userId",
            select: "name profilePictureURL", // Select fields you want from userId
          },
        },
      });
    if (!posts) {
      throw new Error("Post not found with id");
    }

    return posts;
  } catch (error) {
    throw new Error("Error ");
  }
};

// Helper function to enhance a post with user information
const enhancePostWithUser = async (post: any) => {
  const user = await User.findById(post.creatorId);
  if (!user) throw new Error(`User not found for creatorId: ${post.creatorId}`);

  // Add profile section to each comment
  const commentsWithProfileSection = await Promise.all(
    post.comments.map(async (comment: any) => {
      const commentUser = await User.findById(comment.userId);
      return {
        ...comment.toObject(),
        profileSection: {
          profileImage: commentUser?.profilePictureURL,
          profileName: commentUser?.name,
        },
      };
    }),
  );

  return {
    ...post.toObject(), // Convert Mongoose document to plain JS object
    profileSection: {
      profileImage: user.profilePictureURL,
      profileName: user.name,
    },
    comments: commentsWithProfileSection,
  };
};

export const createPost = async (postData: any) => {
  try {
    const user = await User.findById(postData.creatorId);
    if (!user) throw new Error("User not found with the provided creatorId");

    // Check if group exists and if the user is a member
    if (postData.groupId) {
      const group = await Group.findById(postData.groupId);
      if (!group) throw new Error("Group not found with the provided groupId");
      const isMember = group.members.includes(postData.creatorId);
      if (!isMember) throw new Error("User is not a member of the group");
    }

    // Create new post
    const newPost = new Post(postData);
    await newPost.save();
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
};

export const updatePost = async (postId: string, postData: any) => {
  try {
    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found with the provided id");

    // Check if the creator exists
    const user = await User.findById(postData.creatorId);
    if (!user) throw new Error("User not found with the provided creatorId");

    // Check if group exists if a groupId is provided
    if (postData.groupId && postData.groupId !== "") {
      const group = await Group.findById(postData.groupId);
      if (!group) throw new Error("Group not found with the provided groupId");

      // Check if the user is a member of the group
      const isMember = group.members.includes(postData.creatorId);
      if (!isMember) throw new Error("User is not a member of the group");
    }

    // Push the current content and images to the history before updating
    post.history.push({
      content: post.content,
      images: post.images, // Assuming `images` field stores array of image URLs or base64 strings
      updatedAt: new Date(),
    });

    // Update the post with new data
    post.content = postData.content || post.content;
    post.images = postData.images || post.images; // Update images with the new array
    post.visibility = postData.visibility || post.visibility;
    post.updatedAt = new Date();

    await post.save();

    return post;
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post");
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
