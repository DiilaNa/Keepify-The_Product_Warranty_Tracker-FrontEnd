import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  loadUsersInTable,
  loginUser,
  loginUserGoogleService,
  registerAdmin,
  registerUser,
} from "../../services/auth";
import type { IRegistrationDataTypes } from "@/types/types";

export const registerUserThunk = createAsyncThunk(
  "/auth/register",
  async (data: IRegistrationDataTypes, thunkAPI) => {
    try {
      return await registerUser(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registraion Failed"
      );
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "/auth/login",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await loginUser(data);
      console.log("Login thunk response:", res);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("role", res.data.roles);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login Failed"
      );
    }
  }
);

export const registerAdminThunk = createAsyncThunk(
  "/auth/admin/register",
  async (data: IRegistrationDataTypes, thunkAPI) => {
    try {
      return await registerAdmin(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registraion Failed"
      );
    }
  }
);

export const loadUserTableThunk = createAsyncThunk(
  "auth/admin/loadUsers",
  async (
    { page, limit, search }: { page: number; limit: number; search?: string },
    thunkAPI
  ) => {
    try {
      return await loadUsersInTable({ page, limit, search });
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Loading Failed"
      );
    }
  }
);

export const googleAuthThunk = createAsyncThunk(
  "auth/google",
  async (credential: string, { rejectWithValue }) => {
    try {
      const res = await loginUserGoogleService(credential);

      const data = res.data || res;

      if (!data) {
        throw new Error("Invalid response structure from Google login");
      }

      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      if (data.user.role) {
        localStorage.setItem("role", data.user.role);
        
      }

      return data;
    } catch (err: any) {
      console.error("Google auth error:", err);
      return rejectWithValue(
        err?.response?.data?.message || err.message || "Google login failed"
      );
    }
  }
);


export const loadCurrentUserThunk = createAsyncThunk(
  "auth/loadCurrentUser",
  async (_, thunkAPI) => {
    try {
      return await getCurrentUser();
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to load user");
    }
  }
);
