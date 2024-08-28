import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


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


  export const login = createAsyncThunk('auth/registerUser', async (userData:{email: string, password: string}, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/api/user/login', {
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