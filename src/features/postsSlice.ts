import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PostParams } from "../interfaces/Posts";

export const fetchPosts = createAsyncThunk<PostParams[]>(
  "posts/fetchPosts",
  async () => {
    console.log("Fetching posts...");
    const response = await fetch("/sample-data.json");

    if (!response.ok) {
      console.error("Failed to fetch posts:", response.statusText);
      throw new Error("Failed to fetch posts");
    }

    console.log("Response received. Parsing JSON...");
    const data: PostParams[] = await response.json();
    
    console.log("Posts data:", data);
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
      console.log("likePost action triggered with id:", action.payload);
      // This reducer is currently a placeholder
      return state;
    },
  },
  extraReducers(builder) {
    builder
      
    .addCase(fetchPosts.fulfilled, (state, action) => {
      console.log('Fetching posts fulfilled. Updating state with:', action.payload);
      state.posts.push(...action.payload);
    });
  },
  
 
});

export const { likePost } = postSlice.actions;

export default postSlice.reducer;
