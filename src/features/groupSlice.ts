import { createSlice } from "@reduxjs/toolkit";
import { GroupType } from "../interfaces/Group";
import { AppState } from "../app/store";
import { fetchGroups, fetchGroupWithMembers } from "../controllers/group";

const initialState: GroupType[] = [
  {
    _id: "",
    groupAdmin: "",
    name: "",
    visibility: "private",
    imageURL: "",
    backgroundImageURL: "",
    dateCreated: "",
    members: [],
    accepted: false,
    description: "",
  },
];

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        console.log("Fetching groups...");
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        // Instead of replacing the entire state, merge the new groups
        action.payload.forEach(group => {
          const index = state.findIndex(existingGroup => existingGroup._id === group._id);
          if (index !== -1) {
            state[index] = group;
          } else {
            state.push(group);
          }
        });
      })
  },
});

export const selectGroupById = (state: AppState, groupId: string) => {
  if (!groupId) {
    console.log("No groupId provided");
    return undefined;
  }
  console.log(`selectGroupById called with groupId: ${groupId}`);
  return state.groups.find((group) => group._id === groupId);
};

export default groupSlice.reducer;