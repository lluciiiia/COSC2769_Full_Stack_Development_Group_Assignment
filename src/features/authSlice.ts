import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AppState } from '../app/store';
import { loginUser, registerUser, fetchedSession } from '../controllers/authentications';

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

export const fetchSess = createAsyncThunk(
  'auth/session',
  async () => {
    try {
        const data= await fetchedSession();
      return data;
    } catch (err) {
      throw new Error('Error fetch session');
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

const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  isAuthenticated: !!Cookies.get('isAuthenticated'),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove('isAuthenticated');
      Cookies.remove('user');
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
        Cookies.set('isAuthenticated', 'true', { expires: 1 });
        Cookies.set('user', JSON.stringify(action.payload.user), { expires: 1 });
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        Cookies.set('isAuthenticated', 'true', { expires: 1 });
        Cookies.set('user', JSON.stringify(action.payload.user), { expires: 1 });
      })

  },
});

export const { logout } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
