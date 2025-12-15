import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAnnouncementsThunk,
  editAnnouncement,
  loadAnnouncementsThunk,
  saveAnnouncementsThunk,
  unPublishAnnouncementThunk,
} from "./announcementsThunk";
import type { IAnnouncement } from "@/services/announcements";

interface AnnouncementsState {
  announcements: IAnnouncement[];
  loadingAnnouncements: boolean;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: AnnouncementsState = {
  announcements: [],
  loadingAnnouncements: false,
  page: 1,
  totalPages: 1,
  error: null,
};

const announcementSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {},
  extraReducers: (builer) => {
    builer
      .addCase(loadAnnouncementsThunk.pending, (state) => {
        state.loadingAnnouncements = true;
      })
      .addCase(loadAnnouncementsThunk.fulfilled, (state, action) => {
        state.loadingAnnouncements = false;
        state.announcements = action.payload.data;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(loadAnnouncementsThunk.rejected, (state) => {
        state.loadingAnnouncements = false;
      })
      .addCase(saveAnnouncementsThunk.pending, (state) => {
        state.loadingAnnouncements = true;
        state.error = null;
      })
      .addCase(saveAnnouncementsThunk.fulfilled, (state, action) => {
        state.loadingAnnouncements = true;
        state.announcements = action.payload;
      })
      .addCase(saveAnnouncementsThunk.rejected, (state, action) => {
        state.loadingAnnouncements = false;
        state.error = action.payload as string;
      })
      .addCase(editAnnouncement.pending, (state) => {
        state.loadingAnnouncements = true;
        state.error = null;
      })

      .addCase(editAnnouncement.fulfilled, (state, action) => {
        const index = state.announcements.findIndex(
          (a) => a._id === action.payload._id
        );
        if (index !== -1) {
          state.announcements[index] = action.payload;
        }
        state.loadingAnnouncements = false;
      })
      .addCase(editAnnouncement.rejected, (state, action) => {
        state.loadingAnnouncements = false;
        state.error = action.payload as string;
      })
      .addCase(unPublishAnnouncementThunk.pending, (state) => {
        state.loadingAnnouncements = true;
        state.error = null;
      })
      .addCase(unPublishAnnouncementThunk.fulfilled, (state, action) => {
        const index = state.announcements.findIndex(
          (a) => a._id === action.payload.data._id
        );
        if (index !== -1) {
          state.announcements[index] = action.payload.data;
        }
        state.loadingAnnouncements = false;
      })
      .addCase(unPublishAnnouncementThunk.rejected, (state, action) => {
        state.loadingAnnouncements = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAnnouncementsThunk.pending, (state) => {
        state.loadingAnnouncements = true;
        state.error = null;
      })
      .addCase(deleteAnnouncementsThunk.fulfilled, (state, action) => {
        state.announcements = state.announcements.filter(
          (w) => w._id !== action.meta.arg
        );
        state.loadingAnnouncements = false;
      })
      .addCase(deleteAnnouncementsThunk.rejected, (state, action) => {
        state.loadingAnnouncements = false;
        state.error = action.payload as string;
      });;
  },
});

export const announcementsReducer = announcementSlice.reducer;
