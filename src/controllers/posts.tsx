import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostParams } from "../interfaces/Posts";

export const BACKEND_URL = "http://localhost:8080";

export const getAllPosts = createAsyncThunk<PostParams[]>(
  "posts/getAllPosts",
  async () => {
    const response = await fetch(BACKEND_URL + `/api/posts/`, {
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
    const response = await fetch(BACKEND_URL + `/api/posts/all`, {
      method: "GET",
      credentials: 'include',
    });

    if (!response.ok) {
      console.error("Failed to fetch posts:", response.statusText);
      throw new Error("Failed to fetch posts");
    }

    const data: PostParams[] = await response.json();
    return data;
  },
);

export const getPostById = async (id: String | undefined) => {
  if (id == undefined) return;

  const response = await fetch(BACKEND_URL + `/api/posts/${id}`, {
    method: "GET",
    credentials: 'include',
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
      credentials: 'include',
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
    credentials: 'include',
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

      const response = await fetch(BACKEND_URL + `/api/posts/groups/${groupId}`, {
        method: "GET",
        credentials: 'include',
      });

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
  async (postData) => {
    const response = await fetch(`${BACKEND_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    const data: PostParams = await response.json();
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
      credentials: 'include',
      body: JSON.stringify(postData),
    });

    if (!response.ok) throw new Error("Failed to update post");

    const data: PostParams = await response.json();
    return data;
  },
);

export const deletePostById = async (id: string | undefined) => {
  if (id == undefined) return false;

  const response = await fetch(BACKEND_URL + `/api/posts/${id}`, {
    method: "DELETE",
  });

  return response.ok
    ? true
    : (console.error("Failed to delete the post", response.statusText), false);
};
