import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../interfaces/Users";
import { getUser, fetchUsers } from "../controllers/user";

// Define initial state with both singleUser and usersList
const initialState: {
  singleUser: UserType | null;
  usersList: UserType[];
} = {
  singleUser: null,
  usersList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Add any additional reducers if needed
  },
  extraReducers(builder) {
    // Handle fetching a single user
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<UserType>) => {
      state.singleUser = action.payload;
    });

    // Handle fetching the list of users
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserType[]>) => {
      state.usersList = action.payload;
    });
  },
});

export default userSlice.reducer;
