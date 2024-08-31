import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import groupReducer from "../features/groupSlice";
import postsReducer from "../features/postsSlice";
import authReducer from "../features/authSlice";
import adminReducer from "../features/adminSlice";
import notificationReducer from "../features/notificationSlice";
import reactionReducer from "../features/reactionSlice";
// Combine reducers to create the root reducer
export const rootReducer = combineReducers({
  user: userReducer,   // User state
  groups: groupReducer, // Groups state
  posts: postsReducer, // Posts state
  auth: authReducer,   // Authentication state
  admin: adminReducer,
  notifications: notificationReducer,
  react: reactionReducer,
});

// Type for the entire Redux store state
export type AppState = ReturnType<typeof rootReducer>;

// Type for dispatch function
export type AppDispatch = typeof store.dispatch;

// Create and configure the Redux store
export const store = configureStore({
  reducer: rootReducer,
});
