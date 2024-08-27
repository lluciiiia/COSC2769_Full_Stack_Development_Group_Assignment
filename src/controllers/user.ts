import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../interfaces/Users";
import { BACKEND_URL } from "./posts";

export const getUser = createAsyncThunk<UserType, string | undefined>(
  "user/getUser",
  async (userId) => {
    const response = await fetch(BACKEND_URL + `/api/users/${userId}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Failed to fetch user:", response.statusText);
      throw new Error("Failed to fetch user");
    }

    const data: UserType = await response.json();
    return data;
  },
);

export const updateUser = createAsyncThunk<
  UserType,
  { userId: string; userData: Partial<UserType> }
>("user/updateUser", async ({ userId, userData }) => {
  const response = await fetch(BACKEND_URL + `/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    console.error("Failed to update user:", response.statusText);
    throw new Error("Failed to update user");
  }

  const data: UserType = await response.json();
  console.log(data);
  return data;
});
