import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../app/store";
import {
  loginUser,
  registerUser,
  fetchedSession,
  logout as logoutUser,
} from "../controllers/authentications";

export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: { email: string; password: string; name?: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
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
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await loginUser(userData);
      return data;
    } catch (err: any) {
      // Capture the error message
      return rejectWithValue(err.message || "Error logging in");
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await logoutUser();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Error logging out");
    }
  }
);

const initialState = {
  id: "",
  isAuthenticated: false,
  status: "idle",
  isAdmin: false,
  name: "",
  profilePictureURL: "",
  error: null,  // Initialize the error state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
        state.error = null;  // Reset error on successful register
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;  // Reset error on new login attempt
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.isAdmin = action.payload.user.isAdmin;
        state.isAuthenticated = true;
        state.error = null;  // Reset error on successful login
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;  // Set error message on failed login
      })
      .addCase(fetchSess.fulfilled, (state, action) => {
        return action.payload;
      })
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
