import { createSlice } from "@reduxjs/toolkit";
import { saveAnnouncementsThunk } from "./announcementsThunk";

export interface AnnouncemntsState {
  announcements: any[];
  loadingAnnouncements: boolean;
  error: string | null;
}

const initialState: AnnouncemntsState = {
  announcements: [],
  loadingAnnouncements: false,
  error: null,
};

const announcementSlice = createSlice({
    name: "announcements",
    initialState,
    reducers: {},
    extraReducers: (builer) => {
        builer
        .addCase(saveAnnouncementsThunk.pending,(state) => {
            state.loadingAnnouncements = true;
            state.error = null;
        })
        .addCase(saveAnnouncementsThunk.fulfilled,(state,action) => {
            state.loadingAnnouncements = true;
            state.announcements = action.payload;
        })
        .addCase(saveAnnouncementsThunk.rejected,(state,action) => {
            state.loadingAnnouncements = false;
            state.error = action.payload as string;
        })
    }
})

export const announcementsReducer = announcementSlice.reducer; 