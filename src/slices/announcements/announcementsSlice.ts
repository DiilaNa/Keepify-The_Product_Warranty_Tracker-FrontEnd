import { createSlice } from "@reduxjs/toolkit";
import { saveAnnouncementsThunk } from "./announcementsThunk";

export interface AnnouncemntsState{
    announcements: any[];
    loading: boolean;
    error: string | null;
}

const initialState: AnnouncemntsState = {
    announcements: [],
    loading: false,
    error: null,
}

const announcementSlice = createSlice({
    name: "announcements",
    initialState,
    reducers: {},
    extraReducers: (builer) => {
        builer
        .addCase(saveAnnouncementsThunk.pending,(state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(saveAnnouncementsThunk.fulfilled,(state,action) => {
            state.loading = true;
            state.announcements = action.payload;
        })
        .addCase(saveAnnouncementsThunk.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})

export const announcementsReducer = announcementSlice.reducer; 