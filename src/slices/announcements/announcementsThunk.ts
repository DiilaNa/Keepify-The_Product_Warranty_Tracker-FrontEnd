import { saveAnnouncementsService } from "@/services/announcements";
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
