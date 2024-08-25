import { createSlice } from "@reduxjs/toolkit";
import { GroupType } from "../types/group";
import { AppState } from "../app/store";

const initialState: GroupType[] = [
  {
    groupId: "grp001",
    groupAdmin: "admin01",
    name: "Tech Enthusiasts",
    visibility: "Public",
    createdAt: "2023-01-15",
  },
  {
    groupId: "grp002",
    groupAdmin: "admin02",
    name: "Book Lovers",
    visibility: "Private",
    createdAt: "2022-11-30",
  },
  {
    groupId: "grp003",
    groupAdmin: "admin03",
    name: "Fitness Freaks",
    visibility: "Public",
    createdAt: "2023-05-10",
  },
  {
    groupId: "grp004",
    groupAdmin: "admin04",
    name: "Music Mania",
    visibility: "Public",
    createdAt: "2022-08-25",
  },
  {
    groupId: "grp005",
    groupAdmin: "admin05",
    name: "Photography Pros",
    visibility: "Private",
    createdAt: "2023-03-01",
  },
];

const groupSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectGroupById = (state: AppState, groupId: string) => {
  state.groups.find((group) => group.groupId === groupId);
};

export default groupSlice.reducer;
