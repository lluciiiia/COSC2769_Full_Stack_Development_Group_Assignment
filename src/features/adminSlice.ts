import { createSlice } from "@reduxjs/toolkit";
import { AdminSliceProps } from "../interfaces/Admin";
import {
  fetchGroups,
  createGroup,
  fetchGroupWithMembers,
} from "../controllers/group";
import { getAllUsers } from "../controllers/user";

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
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchGroups.pending, (state, action) => {
        console.log("Fetching groups...");
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groups = action.payload;
        console.log("Groups fetched successfully:", action.payload);
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        console.error("Failed to fetch groups:", action.error.message);
      })
      .addCase(createGroup.fulfilled, (state, action) => {
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
      });
  },
});

export default adminSlice.reducer;
