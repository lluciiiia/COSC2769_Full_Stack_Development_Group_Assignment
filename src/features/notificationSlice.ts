import { createSlice } from "@reduxjs/toolkit";
import {
  acceptFriendRequestNotification,
  fetchNotification,
  fetchSentFriendRequests,
} from "../controllers/notification";
import { NotiProps } from "../interfaces/notification";
import { AppState } from "../app/store";

const initialState: NotiProps = {
  notifications: [],
  sentFriendRequests: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotification.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });
    builder.addCase(fetchSentFriendRequests.fulfilled, (state, action) => {
      state.sentFriendRequests = action.payload;
    });
    // builder.addCase(
    //   acceptFriendRequestNotification.fulfilled,
    //   (state, action) => {
    //     const updatedNotificationId = action.payload;

    //     state.notifications = state.notifications.map((noti) =>
    //       noti._id === updatedNotificationId
    //         ? { ...noti, isSeen: true, isAccepted: true }
    //         : noti,
    //     );
    //   },
    // );
  },
});

export const selectSentFriendRequests = (state: AppState) =>
  state.notifications.sentFriendRequests;

export const selectNotifications = (state: AppState) =>
  state.notifications.notifications;

export default notificationSlice.reducer;
