import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notifications } from "../interfaces/Notifications";

export const fetchNotification = createAsyncThunk<Notifications[]>(
  "notifications/fetchNotifications",
  async () => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/notifications/received`,
      {
        method: "GET",
        credentials: "include",
      },
    );

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
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/notifications/sent`,
      {
        method: "GET",
        credentials: "include",
      },
    );

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

export const groupSentRequest = createAsyncThunk<Notifications[]>(
  "notifications/groupSentRequest",

  async () => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/notifications/groupRequest`,
      {
        method: "GET",
        credentials: "include",
      },
    );

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
    import.meta.env.VITE_BACKEND_URL +
      `/api/notifications/accepted/${notificationId}`,
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

export const acceptGroupRequest = createAsyncThunk<
  {
    message: string;
    notification: { type: string; senderId: string; notiId: string };
  },
  { senderId: string; notiId: string }
>("user/acceptGroupRequest", async ({ senderId, notiId }) => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + `api/notifications/acceptRequest`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: senderId,
        notiId: notiId,
      }),
      credentials: "include",
    },
  );

  if (!response.ok) {
    console.error("Failed to accept group request:", response.statusText);
    throw new Error("Failed to accept group request");
  }

  const data = await response.json();
  return data;
});

export const removeFriendRequestNotification = createAsyncThunk<
  { message: string },
  string
>("notifications/removeFriendRequestNotification", async (notificationId) => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + `/api/notifications/${notificationId}`,
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

export const groupApprovalNotification = createAsyncThunk<
  { message: string },
  string
>("notifications/groupApprovalNotification", async (groupId) => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL +
      `/api/notifications/group-approval/${groupId}`,
    {
      method: "POST",
      credentials: "include",
    },
  );
  if (!response.ok) {
    console.error("Failed to create notifcation:", response.statusText);
    throw new Error("Failed to create notifcation");
  }

  const data = await response.json();

  return data;
});

export const createCommentNotification = createAsyncThunk<
  { message: string },
  string | undefined
>("notifications/createCommentNotification", async (postId) => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + `/api/notifications/comment/${postId}`,
    {
      method: "POST",
      credentials: "include",
    },
  );
  if (!response.ok) {
    console.error("Failed to create notifcation:", response.statusText);
    throw new Error("Failed to create notifcation");
  }

  const data = await response.json();
  console.log("thunk", data);

  return data;
});
