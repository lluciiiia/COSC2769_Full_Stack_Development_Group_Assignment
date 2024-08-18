import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostParams } from "../interfaces/Posts";

export const fetchPosts = createAsyncThunk<PostParams[]>(
    "posts/fetchPosts",
    async () => {
      const response = await fetch("/sample-data.json");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data: PostParams[] = await response.json();
      return data;
    }
  );

interface PostState {
    posts: PostParams[];
  }
const initialState: PostState = {
    posts: [],
  };

  const postSlice = createSlice(
    {
    name: "posts",
    initialState,
    reducers: {
      likePost: (state, action: PayloadAction<string>) => {
        return state;
      },
      
    
  }
}
);
  export const { likePost } = postSlice.actions;
  
  export default postSlice.reducer;