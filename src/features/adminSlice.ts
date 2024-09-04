import { createSlice } from "@reduxjs/toolkit";
import { AdminSliceProps } from "../interfaces/Admin";
import {
  fetchGroups,
  createGroup,
  fetchGroupWithMembers,
  leaveGroup,
} from "../controllers/group";

const initialState: AdminSliceProps = {
  users: [],
  posts: [],
  groups: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state, action) => {
        // Optionally handle pending state
        console.log("Fetching groups...");
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        // Update the groups state with fetched data
        state.groups = action.payload;
        console.log("Groups fetched successfully:", action.payload);
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        // Optionally handle rejected state
        console.error("Failed to fetch groups:", action.error.message);
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        // Optionally handle newly created group
        state.groups.push(action.payload);
        console.log("Group created successfully:", action.payload);
      })
      .addCase(fetchGroupWithMembers.fulfilled, (state, action) => {
        // Optionally handle fetched group with members
        const index = state.groups.findIndex(
          (group) => group._id === action.payload._id,
        );
        if (index !== -1) {
          state.groups[index] = action.payload;
        } else {
          state.groups.push(action.payload);
        }
        console.log("Group with members fetched successfully:", action.payload);
      })
      .addCase(leaveGroup.fulfilled, (state, action) => {
        // Optionally handle when a user leaves a group
        const index = state.groups.findIndex(
          (group) => group._id === action.payload._id,
        );
        if (index !== -1) {
          state.groups[index] = action.payload;
        }
        console.log("User left the group successfully:", action.payload);
      });
  },
});

export default adminSlice.reducer;
