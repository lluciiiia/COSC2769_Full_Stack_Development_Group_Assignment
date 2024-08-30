// groupSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { GroupType } from "../interfaces/Group";
import { AppState } from "../app/store";
import { fetchGroups } from "../controllers/group";

const initialState: GroupType[] = [];

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
        // Replace the state with the fetched groups
        return action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        console.error("Failed to fetch groups", action.error.message);
      });
  },
});

// Selector to get group by ID
export const selectGroupById = (state: AppState, groupId: string) => {
  if (!groupId) {
    console.log("No groupId provided");
    return undefined;
  }
  console.log(`selectGroupById called with groupId: ${groupId}`);

  const group = state.groups.find((group) => group._id === groupId);
  return group;
};

export default groupSlice.reducer;
