import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../app/store";
import { UserType } from "../interfaces/Users";


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
    activeStatus: true,
    education: "RMIT University",
    location: "HCMC, Vietnam",
    phoneNumber: "09991113233",
    relationship: "Single",
    job: "Tech Innovatiors",
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
    activeStatus: true,
    education: undefined,
    location: undefined,
    phoneNumber: "02932332",
    relationship: undefined,
    job: undefined,
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

//set single user (return UserType or undefined when cannot find)
export const getUserById = (
  state: AppState,
  id: number,
): UserType | undefined => {
  const user = state.users.find((u: UserType) => {
    return u.id === id;
  });

  return user;
};

export default userSlice.reducer;
