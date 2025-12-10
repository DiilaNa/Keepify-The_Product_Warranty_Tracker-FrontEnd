import { createSlice } from "@reduxjs/toolkit";
import { loadAnnouncementsThunk, saveAnnouncementsThunk } from "./announcementsThunk";
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
  error: null
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
          });
    }
})

export const announcementsReducer = announcementSlice.reducer; 
  