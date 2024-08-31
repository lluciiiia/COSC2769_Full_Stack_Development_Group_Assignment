import { createSlice } from "@reduxjs/toolkit";
import { fetchNotification } from "../controllers/notification";
import { NotiProps } from "../interfaces/notification";

const initialState: NotiProps = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotification.fulfilled, (state, action) => {
      console.log(action.payload + "action payload");
      state.notifications = action.payload;
    });
  },
});

export default notificationSlice.reducer;
