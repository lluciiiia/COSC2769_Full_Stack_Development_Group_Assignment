import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import groupReducer from "../features/groupSlice";
export const rootReducer = combineReducers({
  //write hte reducer in this function and
  //the type when using selector is AppState
  users: userReducer,
  groups: groupReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
});
