import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostParams, RevertPostParams } from "../interfaces/Posts";

export const getAllPosts = createAsyncThunk<PostParams[]>(
  "posts/getAllPosts",
  async () => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/posts/all`,
      {
        method: "GET",
        credentials:'include'
      },
    );

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
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/posts",
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!response.ok) throw new Error("Failed to fetch posts");

    const data: PostParams[] = await response.json();
    return data;
  },
);

export const getPostById = async (id: String | undefined) => {
  if (id == undefined) return;

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + `/api/posts/${id}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    console.error("Failed to fetch posts:", response.statusText);
    throw new Error("Failed to fetch posts");
  }

  const data: PostParams = await response.json();
  return data;
};

export const getViewedUserPosts = createAsyncThunk<
  PostParams[],
  string | undefined
>("posts/getViewedUserPosts", async (viewedUserId) => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL +
      `/api/posts/view-profile/${viewedUserId}`,
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

export const getPostsByCreatorId = createAsyncThunk<
  PostParams[],
  string | undefined
>("posts/getPostsByCreatorId", async (creatorId) => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + `/api/posts/profile/${creatorId}`,
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

export const getPostsByGroup = createAsyncThunk<PostParams[], string>(
  "posts/getPostByGroup",
  async (groupId, { rejectWithValue }) => {
    try {
      if (!groupId) throw new Error("No group ID provided");

      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + `/api/posts/groups/${groupId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok)
        throw new Error("Failed to fetch posts: " + response.statusText);

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
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postParams),
        credentials: "include",
      },
    );

    // Log the raw response before checking if it's okay
    const rawResponseText = await response.text();

    if (!response.ok) {
      console.error("Failed to create post:", rawResponseText);
      throw new Error("Failed to create post");
    }

    const data: PostParams = JSON.parse(rawResponseText);
    return data;
  },
);

export const updatePost = createAsyncThunk<PostParams, PostParams>(
  "posts/updatePost",
  async (postData) => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/posts/${postData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(postData),
      },
    );

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
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/posts/${postData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(postData),
      },
    );

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

export const deletePostById = createAsyncThunk<boolean, string | undefined>(
  "posts/deletePostById",
  async (id, { rejectWithValue }) => {
    if (id === undefined) return rejectWithValue("Post ID is undefined");

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + `/api/posts/${id}`,
        {
          method: "DELETE",
          credentials:'include'
        },
      );

      if (!response.ok) {
        console.error("Failed to delete the post", response.statusText);
        return rejectWithValue(response.statusText);
      }

      return true; // Success
    } catch (error) {
      console.error("Failed to delete the post", error);
      return rejectWithValue("An error occurred while deleting the post");
    }
  },
);
