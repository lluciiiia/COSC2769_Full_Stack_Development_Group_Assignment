import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostState } from "../interfaces/Posts";
import {
  getPosts,
  getPostsByCreatorId,
  getPostsByGroup,
  getViewedUserPosts,
} from "../controllers/posts";

const initialState: PostState = {
  posts: [],
  creatorPost: [],
  viewedPosts: [],
  groupPost: [],
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
      state.posts = action.payload;
    });
    builder.addCase(getPostsByCreatorId.fulfilled, (state, action) => {
      state.creatorPost = action.payload;
    });
    builder.addCase(getViewedUserPosts.fulfilled, (state, action) => {
      state.viewedPosts = action.payload;
    });
    builder.addCase(getPostsByGroup.fulfilled, (state, action) => {
      state.groupPost = action.payload;
    });
  },
});

export const { likePost } = postSlice.actions;
export default postSlice.reducer;
