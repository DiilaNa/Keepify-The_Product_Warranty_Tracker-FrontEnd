import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loadUsersInTable,
  loginUser,
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
  async ({ page, limit ,search}: { page: number; limit: number ; search?:string}, thunkAPI) => {
    try {
      return await loadUsersInTable({ page, limit,search });
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Loading Failed"
      );
    }
  }
);
  
