import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostParams } from "../interfaces/Posts";
import { PostState } from "../interfaces/Posts";
import { AppState } from "../app/store";
import { getPosts } from "../controllers/posts";

// export const fetchPosts = createAsyncThunk<PostParams[]>(
//   "posts/fetchPosts",
//   async () => {
//     const response = await fetch("/sample-data.json");
//     if (!response.ok) {
//       console.error("Failed to fetch posts:", response.statusText);
//       throw new Error("Failed to fetch posts");
//     }
//     const data: PostParams[] = await response.json();
//     return data;
//   },
// );

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    likePost: (state, action: PayloadAction<string>) => {
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const getPostListById = (
  state: AppState,
  creatorId: string,
): PostParams[] => {
  const posts = state.posts.posts.filter((p: PostParams) => {
    const uId = p.creatorId;
    return uId === creatorId;
  });

  return posts;
};

export const { likePost } = postSlice.actions;
export default postSlice.reducer;
