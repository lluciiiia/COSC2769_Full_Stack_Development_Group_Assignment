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

export const fetchUsers = createAsyncThunk<UserType[]>(
  "users/fetchUsers",
  async () => {
    const response = await fetch(BACKEND_URL + `/api/users`, {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Failed to fetch users:", response.statusText);
      throw new Error("Failed to fetch users");
    }

    const data: UserType[] = await response.json();
    return data;
  }
);
