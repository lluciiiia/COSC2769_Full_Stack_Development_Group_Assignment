import { createAsyncThunk } from "@reduxjs/toolkit";

export const createReaction = createAsyncThunk(
  "reactions/createReaction",
  async (
    reactionData: { postId: string; reactionType: string; sentFrom: string },
    { rejectWithValue },
  ) => {
    try {
      console.log(reactionData, "data");
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/reactions/userReact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(reactionData),
        },
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
  },
);

export const fetchReaction = createAsyncThunk(
  "reaction/fetchReaction",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + `/api/reactions/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        console.error("Failed to fetch reactions:", response.statusText);
        return rejectWithValue(response.statusText);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Network error:", error.message);
      return rejectWithValue(error.message || "Network error");
    }
  },
);

export const deleteReaction = createAsyncThunk(
  "reaction/deleteReaction",
  async (
    { postId, userId }: { postId: string; userId: string }, // Wrapping multiple values in an object
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + `/api/reactions/${postId}/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",
        },
      );

      if (!response.ok) {
        console.error("Failed to delete reactions:", response.statusText);
        return rejectWithValue(response.statusText);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Network error:", error.message);
      return rejectWithValue(error.message || "Network error");
    }
  },
);
