import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../../services/authService";
import { authResponse } from "../../models/reponse/authResponse";
import { API_URL } from "../../../api/api";

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await authService.login(email, password);
        console.log(response)
        localStorage.setItem('token', response.data.accessToken);
        return response.data;
      } catch (e: any) {
        return rejectWithValue(e.response?.data?.message || 'Login failed');
      }
    }
);

export const registration = createAsyncThunk(
    'auth/registration',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await authService.registration(email, password);
        console.log(response)
        localStorage.setItem('token', response.data.accessToken);
        return response.data;
      } catch (e: any) {
        return rejectWithValue(e.response?.data?.message || 'Registration failed');
      }
    }
  );

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      return;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Logout failed');
    }
});
  
export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<authResponse>(`${API_URL}/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || 'Check auth failed');
    }
});