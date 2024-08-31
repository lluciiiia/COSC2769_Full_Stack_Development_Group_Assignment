import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notifications } from "../interfaces/notification";

export const fetchNotification = createAsyncThunk<Notifications[]>(
  "notifications/fetchNotifications",
  async () => {
    const response = await fetch(`http://localhost:8080/api/notifications/userNoti`, {
      method: 'GET', // Correct placement of method inside an options object
      credentials: 'include', // Include credentials if you're using cookies for authentication
    });

    if (!response.ok) {
      console.error("Failed to fetch notifications:", response.statusText);
      throw new Error("Failed to fetch notifications");
    }

    const data: Notifications[] = await response.json();
    console.log("noti", data);
    return data;
  }
);
