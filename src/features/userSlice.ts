import { createSlice } from "@reduxjs/toolkit";
import { UserSliceParam } from "../interfaces/Users";
import {
  getAllUsers,
  getUser,
  getViewedUser,
  unfriendById,
} from "../controllers/user";
import { AppState } from "../app/store";

//current user
const initialState: UserSliceParam = {
  users: [],
  currentUser: {
    _id: "",
    name: "",
    email: "",
    password: "",
    activeStatus: false,
    createdAt: "",
  },
  viewedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateLocalUser: (state, action) => {
      state.currentUser = { ...state, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(getViewedUser.fulfilled, (state, action) => {
      state.viewedUser = action.payload;
    });
    builder.addCase(unfriendById.fulfilled, (state, action) => {});
  },
});

export const { updateLocalUser } = userSlice.actions;

export const selectCurrentUser = (state: AppState) => state.user.currentUser;
export const selectViewedUser = (state: AppState) => state.user.viewedUser;

export default userSlice.reducer;
