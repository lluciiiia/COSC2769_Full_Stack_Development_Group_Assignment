import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostParams, RevertPostParams } from "../interfaces/Posts";

export const BACKEND_URL = "http://localhost:8080";

export const getAllPosts = createAsyncThunk<PostParams[]>(
  "posts/getAllPosts",
  async () => {
    const response = await fetch(BACKEND_URL + `/api/posts/all`, {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Failed to fetch posts:", response.statusText);
      throw new Error("Failed to fetch posts");
    }

    const data: PostParams[] = await response.json();
    return data;
  },
);

export const getPosts = createAsyncThunk<PostParams[], string | undefined>(
  "posts/getPosts",
  async () => {
    const response = await fetch(BACKEND_URL + `/api/posts/`, {
      method: "GET",
      credentials: "include",
    });
    

    if (!response.ok) {
      console.error("Failed to fetch posts:", response.statusText);
      throw new Error("Failed to fetch posts");
    }

    const data: PostParams[] = await response.json();
    console.log(data)
    return data;
  },
);

export const getPostById = async (id: String | undefined) => {
  if (id == undefined) return;

  const response = await fetch(BACKEND_URL + `/api/posts/${id}`, {
    method: "GET",
    credentials: "include",
  });

  console.log("response: " + JSON.stringify(response));

  if (!response.ok) {
    console.error("Failed to fetch posts:", response.statusText);
    throw new Error("Failed to fetch posts");
  }

  const data: PostParams = await response.json();
  return data;
};
export const getPostsByCreatorId = createAsyncThunk<
  PostParams[],
  string | undefined
>("posts/getPostsByCreatorId", async (creatorId) => {
  const response = await fetch(
    BACKEND_URL + `/api/posts/profile/${creatorId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    console.error("Failed to fetch posts:", response.statusText);
    throw new Error("Failed to fetch posts");
  }

  const data: PostParams[] = await response.json();
  return data;
});

export const getGroupsByUserId = async (userId: string | undefined) => {
  if (!userId) return;

  const response = await fetch(`${BACKEND_URL}/api/groups/user/${userId}`, {
    method: "GET",
    credentials: "include",
  });

  console.log("response: " + JSON.stringify(response));

  if (!response.ok) {
    console.error("Failed to fetch groups:", response.statusText);
    throw new Error("Failed to fetch groups");
  }

  // Parse the JSON response if the fetch is successful
  const groups = await response.json();
  return groups;
};

export const getPostsByGroup = createAsyncThunk<PostParams[], string>(
  "posts/getPostByGroup",
  async (groupId, { rejectWithValue }) => {
    try {
      if (!groupId) {
        throw new Error("No group ID provided");
      }

      const response = await fetch(
        BACKEND_URL + `/api/posts/groups/${groupId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts: " + response.statusText);
      }

      const data: PostParams[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const createPost = createAsyncThunk<PostParams, PostParams | undefined>(
  "posts/createPost",
  async (postParams) => {
    // Log the post parameters being sent
    console.log(
      "Creating post with parameters:",
      JSON.stringify(postParams, null, 2),
    );

    const response = await fetch(`${BACKEND_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify(postParams), // Send postParams as JSON
      credentials: "include",
    });

    // Log the response status and response body
    console.log("Response status:", response.status);

    // Log the raw response before checking if it's okay
    const rawResponseText = await response.text();
    console.log("Raw response received:", rawResponseText); // Log raw response for debugging

    if (!response.ok) {
      // Log the error response if the creation fails
      console.error("Failed to create post:", rawResponseText);
      throw new Error("Failed to create post");
    }

    const data: PostParams = JSON.parse(rawResponseText); // Parse the raw response text to JSON
    // Log the created post data
    console.log("Post created successfully:", JSON.stringify(data, null, 2));

    return data;
  },
);

export const updatePost = createAsyncThunk<PostParams, PostParams>(
  "posts/updatePost",
  async (postData) => {
    const response = await fetch(`${BACKEND_URL}/api/posts/${postData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(postData),
    });

    if (!response.ok) throw new Error("Failed to update post");

    const data: PostParams = await response.json();
    return data;
  },
);

export const revertPost = createAsyncThunk<
  RevertPostParams,
  RevertPostParams,
  { rejectValue: string }
>("posts/revertPost", async (postData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/posts/${postData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      // Return a custom error message
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Failed to update post");
    }

    const data: RevertPostParams = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue("An unexpected error occurred"); // Handle other errors
  }
});

export const deletePostById = async (id: string | undefined) => {
  if (id == undefined) return false;

  const response = await fetch(BACKEND_URL + `/api/posts/${id}`, {
    method: "DELETE",
  });

  return response.ok
    ? true
    : (console.error("Failed to delete the post", response.statusText), false);
};
