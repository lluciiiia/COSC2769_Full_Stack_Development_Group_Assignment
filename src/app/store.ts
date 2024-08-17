import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";

export const rootReducer = combineReducers({
  //write hte reducer in this function and
  //the type when using selector is AppState
  users: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
});
