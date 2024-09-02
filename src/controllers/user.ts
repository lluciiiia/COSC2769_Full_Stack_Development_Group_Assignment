import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../interfaces/Users";
import { BACKEND_URL } from "./posts";

export const getAllUsers = createAsyncThunk<UserType[]>(
  "user/getAllUsers",
  async () => {
    const response = await fetch(BACKEND_URL + `/api/users/`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch users:", response.statusText);
      throw new Error("Failed to fetch users");
    }

    const data: UserType[] = await response.json();
    return data;
  },
);

export const getUser = createAsyncThunk<UserType, string | undefined>(
  "user/getUser",
  async (userId) => {
    const response = await fetch(BACKEND_URL + `/api/users/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch user:", response.statusText);
      throw new Error("Failed to fetch user");
    }

    const data: UserType = await response.json();
    return data;
  },
);

export const getViewedUser = createAsyncThunk<UserType, string | undefined>(
  "user/getViewedUser",
  async (userId) => {
    const response = await fetch(BACKEND_URL + `/api/users/view/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch viewed user:", response.statusText);
      throw new Error("Failed to fetch viewed user");
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
    credentials: "include",
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    console.error("Failed to update user:", response.statusText);
    throw new Error("Failed to update user");
  }

  const data: UserType = await response.json();

  return data;
});

export const sendFriendRequest = createAsyncThunk<
  { message: string },
  string | undefined
>("user/sendFriendRequest", async (friendId) => {
  const response = await fetch(
    BACKEND_URL + `/api/users/addfriend/${friendId}`,
    {
      method: "PUT",
      credentials: "include",
    },
  );

  if (!response.ok) {
    console.error(
      "Failed to send friend request to this user:",
      response.statusText,
    );
    throw new Error("Failed to send friend request to this user");
  }

  const data: { message: string } = await response.json();

  return data;
});

export const acceptFriendRequest = createAsyncThunk<
  { message: string },
  string | undefined
>("user/acceptFriendRequest", async (friendId) => {
  const response = await fetch(
    BACKEND_URL + `/api/users/friend-requests/${friendId}/accept`,
    {
      method: "PUT",
      credentials: "include",
    },
  );

  if (!response.ok) {
    console.error("Failed to accept friend request:", response.statusText);
    throw new Error("Failed to accept friend request");
  }

  const data: { message: string } = await response.json();

  return data;
});

export const unfriendById = createAsyncThunk<{ message: string }, string>(
  "user/updateUser",
  async (friendId) => {
    const response = await fetch(
      BACKEND_URL + `/api/users/unfriend/${friendId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    if (!response.ok) {
      console.error("Failed to unfriend this user:", response.statusText);
      throw new Error("Failed to unfriend this user");
    }

    const data = await response.json();

    return data;
  },
);

export const sendGroupRequest = createAsyncThunk<
  {
    message: string;
    notification: { type: string; receiverId: string; senderId: string };
  },
  string
>("user/sendGroupRequest", async (groupId) => {
  const response = await fetch(
    BACKEND_URL + `/api/users/sentGroup/${groupId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    console.error("Failed to send group request:", response.statusText);
    throw new Error("Failed to send group request");
  }

  const data = await response.json();
  return data;
});
