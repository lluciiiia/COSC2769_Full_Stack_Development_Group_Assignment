import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../app/store';
import { loginUser, registerUser } from '../controllers/authentications';

export const registerUserThunk = createAsyncThunk(
  'auth/registerUser',
  async (userData: { email: string; password: string; name?: string }, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await loginUser(userData);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload._id);
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload._id);
      })
  },
});

export const { logout } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
