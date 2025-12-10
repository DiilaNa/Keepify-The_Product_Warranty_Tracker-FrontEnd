import { loadAnnouncementsService, saveAnnouncementsService } from "@/services/announcements";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveAnnouncementsThunk = createAsyncThunk(
  "/announcements/saveAnnouncement",
  async (formData: FormData, thunkAPI) => {
    try {
      return await saveAnnouncementsService(formData);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to save announcements"
      );
    }
  }
);

export const loadAnnouncementsThunk = createAsyncThunk(
  "/announcements/load",
  async (
    {
      page = 1,
      limit = 10,
      admin = false,
    }: { page?: number; limit?: number; admin?: boolean },
    thunkAPI
  ) => {
    try {
      return await loadAnnouncementsService({ page, limit, admin });
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load announcements"
      );
    }
  }
);
