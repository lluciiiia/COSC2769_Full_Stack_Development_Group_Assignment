import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../app/store";
import {
  loginUser,
  registerUser,
  fetchedSession,
  logout as logoutUser, // Import the logout function from your controller
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

// Add the logout thunk
export const logoutUserThunk = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await logoutUser();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Error logging out");
    }
  },
);

const initialState = {
  id: "",
  isAuthenticated: false,
  status: "idle",
  isAdmin: false,
  name: "",
  profilePictureURL: "",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Update logout reducer to handle local state
    logout: (state) => {
      state.isAuthenticated = false;
      state.id = "";
      state.isAdmin = false;
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
        state.isAdmin = action.payload.user.isAdmin;
        state.isAuthenticated = true;
      })
      .addCase(fetchSess.fulfilled, (state, action) => {
        return action.payload;
      })
      // Add case for logoutUserThunk
      .addCase(logoutUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.status = "succeeded";
        state.isAuthenticated = false;
        state.id = "";
        state.isAdmin = false;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
