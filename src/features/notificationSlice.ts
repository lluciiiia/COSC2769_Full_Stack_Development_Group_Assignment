import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotification,
  fetchSentFriendRequests,
  groupSentRequest,
} from "../controllers/notifications";
import { NotiProps, GroupRequest } from "../interfaces/Notifications";
import { AppState } from "../app/store";

const initialState: NotiProps = {
  notifications: [],
  sentFriendRequests: [],
  sentGroupRequests: [],
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
    builder.addCase(groupSentRequest.fulfilled, (state, action) => {
      console.log(action.payload, "response");
      state.sentGroupRequests = action.payload as unknown as GroupRequest[]; // Ensure this matches the GroupRequest type
    });
  },
});

export const selectSentFriendRequests = (state: AppState) =>
  state.notifications.sentFriendRequests;

export const selectNotifications = (state: AppState) =>
  state.notifications.notifications;

export const selectGroupRequest = (state: AppState, groupId: string) =>
  state.notifications.sentGroupRequests.find(
    (request) => request.groupId === groupId,
  );

export const selectRequest = (state: AppState) => {
  console.log(state.notifications, "alsdjclijasc");
  state.notifications;
};
export default notificationSlice.reducer;
