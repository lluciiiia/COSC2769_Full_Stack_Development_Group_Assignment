import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../app/store";
import {
  loginUser,
  registerUser,
  fetchedSession,
} from "../controllers/authentications";

export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: { email: string; password: string; name?: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const fetchSess = createAsyncThunk(
  "auth/session",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchedSession();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Error fetching session");
    }
  },
);

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (
    userData: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await loginUser(userData);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const initialState = {
  id: '',
  isAuthenticated: false,
  status: "idle",
  isAdmin: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.isAuthenticated = true;
      })
      .addCase(fetchSess.fulfilled, (state, action) => {
        state.status = "loged-in";
        console.log(action.payload.isAuthenticated + "check if authenticate");
        state.isAuthenticated = action.payload.isAuthenticated;
        state.id = action.payload.id;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
