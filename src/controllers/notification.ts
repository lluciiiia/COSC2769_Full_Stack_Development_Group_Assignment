import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notifications } from "../interfaces/notification";
import { BACKEND_URL } from "./posts";

export const fetchNotification = createAsyncThunk<Notifications[]>(
  "notifications/fetchNotifications",
  async () => {
    const response = await fetch(BACKEND_URL + `/api/notifications/received`, {
      method: "GET", // Correct placement of method inside an options object
      credentials: "include", // Include credentials if you're using cookies for authentication
    });

    if (!response.ok) {
      console.error("Failed to fetch notifications:", response.statusText);
      throw new Error("Failed to fetch notifications");
    }

    const data: Notifications[] = await response.json();
    return data;
  },
);

export const fetchSentFriendRequests = createAsyncThunk<Notifications[]>(
  "notifications/fetchSentFriendRequests",

  async () => {
    const response = await fetch(BACKEND_URL + `/api/notifications/sent`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch sent friend requests:",
        response.statusText,
      );
      throw new Error("Failed to fetch sent friend requests");
    }

    const data: Notifications[] = await response.json();

    return data;
  },
);

export const acceptFriendRequestNotification = createAsyncThunk<
  { message: string },
  string
>("notifications/acceptFriendRequestNotification", async (notificationId) => {
  const response = await fetch(
    BACKEND_URL + `/api/notifications/accepted/${notificationId}`,
    {
      method: "PUT",
      credentials: "include",
    },
  );
  if (!response.ok) {
    console.error("Failed to fetch sent friend requests:", response.statusText);
    throw new Error("Failed to fetch sent friend requests");
  }

  const data = await response.json();

  return data;
});

export const denyFriendRequestNotification = createAsyncThunk<
  { message: string },
  string
>("notifications/denyFriendRequestNotification", async (notificationId) => {
  const response = await fetch(
    BACKEND_URL + `/api/notifications/${notificationId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );
  if (!response.ok) {
    console.error("Failed to delete notifcation:", response.statusText);
    throw new Error("Failed to delete notifcation");
  }

  const data = await response.json();

  return data;
});
