import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostParams } from "../interfaces/Posts";

export const fetchPosts = createAsyncThunk<PostParams[]>(
  "posts/fetchPosts",
  async () => {
    const response = await fetch("/sample-data.json");
    if (!response.ok) {
      console.error("Failed to fetch posts:", response.statusText);
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

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    likePost: (state, action: PayloadAction<string>) => {
      return state;
    },
  },
  extraReducers(builder) {
    builder
   
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.push(...action.payload);
    });
  },
});

export const { likePost } = postSlice.actions;
export default postSlice.reducer;
