import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../interfaces/Users";
import { getUser } from "../controllers/user";

//current user
const initialState: UserType = {
  _id: "",
  name: "",
  dateJoined: new Date(),
  email: "",
  password: "",
  activeStatus: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // updateUser(state, action) {
    //   const updatedUser = action.payload;
    //   const index = state.findIndex((u) => u.id === updatedUser.id);
    //   if (index !== -1) {
    //     state[index] = updatedUser;
    //   }
    // },
  },
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
