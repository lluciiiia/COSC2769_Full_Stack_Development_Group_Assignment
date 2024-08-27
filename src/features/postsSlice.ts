import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostState } from "../interfaces/Posts";
import { getPosts, getPostsByCreatorId } from "../controllers/posts";

const initialState: PostState = {
  posts: [],
  creatorPost: [],
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
    builder.addCase(getPostsByCreatorId.fulfilled, (state, action) => {
      state.creatorPost.push(...action.payload);
    });
  },
});

export const { likePost } = postSlice.actions;
export default postSlice.reducer;
