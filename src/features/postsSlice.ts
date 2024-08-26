import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostParams, PostState } from "../interfaces/Posts";
import { AppState } from "../app/store";
import { getPosts } from "../controllers/posts";

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
      state.posts.push(...action.payload);
    });
  },
});

export const getPostListById = (
  state: AppState,
  creatorId: string,
): PostParams[] => {
  const posts = state.posts.posts.filter((p: PostParams) => {
    return p.creatorId === creatorId;
  });

  return posts;
};

export const { likePost } = postSlice.actions;
export default postSlice.reducer;
