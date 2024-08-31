import { createAsyncThunk } from "@reduxjs/toolkit";


export const createReaction = createAsyncThunk(
  "reactions/createReaction",
  async (reactionData: { postId: string; reactionType: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/reactions/userReact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(reactionData),
        }
      );
      
      if (!response.ok) {
        console.error("Failed to add reaction:", response.statusText);
        return rejectWithValue(response.statusText);
      }

      const data = await response.json();
      return data; 
    } catch (error: any) {
      console.error("Network error:", error.message);
      return rejectWithValue(error.message || "Network error");
    }
  }
);