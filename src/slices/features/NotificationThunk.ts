import { fetchNotificationsApi, markNotificationReadApi } from "@/services/notifications";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotificationThunk = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchNotificationsApi();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to load notifications"
      );
    }
  }
);

export const markNotificationReadThunk = createAsyncThunk(
  "notifications/markRead",
  async (id: string, { rejectWithValue }) => {
    try {
      await markNotificationReadApi(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to mark read");
    }
  }
);
