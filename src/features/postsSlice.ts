import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostState } from "../interfaces/Posts";
import {
  getAllPosts,
  getPosts,
  getPostsByCreatorId,
  getPostsByGroup,
} from "../controllers/posts";

const initialState: PostState = {
  posts: [],
  creatorPost: [],
  groupPost: [], // Ensure this is part of the initial state
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    likePost: (state, action: PayloadAction<string>) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts.push(...action.payload);
    });
    builder.addCase(getPostsByCreatorId.fulfilled, (state, action) => {
      state.creatorPost.push(...action.payload);
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getPostsByGroup.fulfilled, (state, action) => {
      state.groupPost = action.payload;
    });
  },
});

export const { likePost } = postSlice.actions;
export default postSlice.reducer;
