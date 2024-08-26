import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GroupType } from "../types/group";
import { AppState } from "../app/store";

const API_URL = "http://localhost:8080/api/groups";
const initialState: GroupType[] = [];

// Define the async thunk for fetching group data
// export const fetchGroups = createAsyncThunk("groups/fetchGroups", async () => {
//   const response = await fetch(API_URL);
//   const data: GroupType[] = await response.json();
//   console.log(data, "data fetched");
//   return data;
// });
export const fetchGroups = createAsyncThunk<GroupType[]>(
  "posts/fetchPosts",
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.error("Failed to fetch groups:", response.statusText);
      throw new Error("Failed to fetch groups");
    }
    const data: GroupType[] = await response.json();
    return data;
  },
);

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        // Handle loading state if needed
        console.log("Fetching groups...");
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        console.log("Fetched groups data:", action.payload);
        return action.payload; // Replace the state with the fetched groups
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        console.error("Failed to fetch groups", action.error.message);
      });
  },
});


// Selector to get group by ID
export const selectGroupById = (state: AppState, groupId: string) =>
  state.groups.find((group) => group.id === groupId);

export default groupSlice.reducer;
