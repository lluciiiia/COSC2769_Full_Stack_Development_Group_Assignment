import { createSlice } from "@reduxjs/toolkit";

export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  profilePictureURL: string;
  introduction: string;
  address: string;
  age: number;
  phoneNumber: string;
  activeStatus: boolean;
};

const initialState: UserType[] = [
  {
    id: 1,
    name: "Tai Ngo",
    email: "testing@gmail.com",
    password: "123",
    profilePictureURL: "abcxyz",
    introduction: "I am Software Engineering Student",
    address: "District 7, Ho Chi Minh",
    age: 20,
    phoneNumber: "09991113233",
    activeStatus: true,
  },
  {
    id: 2,
    name: "user 2",
    email: "user2@gmail.com",
    password: "1234",
    profilePictureURL: "abcxyz",
    introduction: "I am IT Student",
    address: "District 7, Ho Chi Minh",
    age: 99,
    phoneNumber: "02932332",
    activeStatus: true,
  },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changePassword(state, action) {
      const { id, newPassword } = action.payload;

      const user = state.find((u) => u.id === id);

      if (user) {
        user.password = newPassword;
      }
    },
  },
});

export const changePassword = userSlice.actions;

export default userSlice.reducer;
