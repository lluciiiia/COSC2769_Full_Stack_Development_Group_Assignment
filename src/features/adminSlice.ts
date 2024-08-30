import { createSlice } from "@reduxjs/toolkit";
import { AdminSliceProps } from "../interfaces/Admin";

//current user
const initialState: AdminSliceProps = {
  users: [],
  posts: [],
  groups: [],
};

const userSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default userSlice.reducer;
