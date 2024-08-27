import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../interfaces/Users";
import { getUser } from "../controllers/user";

//current user
const initialState: UserType = {
  _id: "",
  name: "",
  email: "",
  password: "",
  activeStatus: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateLocalUser: (state, action) => {
      console.log("reducer: ", action.payload);
      return { ...state, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { updateLocalUser } = userSlice.actions;

export default userSlice.reducer;
