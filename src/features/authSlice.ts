import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../app/store";

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        // Extract error message from the response
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
  
      const data = await response.json();
      return data;
    } catch (err) {
      // Handle network errors
      return rejectWithValue({ message: 'Network error' });
    }
  });

  const authSlice= createSlice({
    name:'auth',
    initialState:{
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
          .addCase(registerUser.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload.user;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
          })
          .addCase(registerUser.rejected, (state, action) => {
            // state.status = 'failed';
            // state = action.payload;
          });
      },
  })
  export const selectAuthState = (state: AppState) => state.auth;
  export default authSlice.reducer;