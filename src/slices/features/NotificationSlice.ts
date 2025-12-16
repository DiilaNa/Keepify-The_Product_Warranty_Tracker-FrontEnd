import { createSlice } from "@reduxjs/toolkit";
import { fetchNotificationThunk, markNotificationReadThunk } from "./NotificationThunk";


interface NotificationState {
  notifications: any[];
  unreadCount: number;
  loading: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.data;
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(fetchNotificationThunk.rejected, (state) => {
        state.loading = false;
      })

      .addCase(markNotificationReadThunk.fulfilled, (state, action) => {
        const id = action.payload;
        const notif = state.notifications.find((n) => n._id === id);
        if (notif && !notif.read) {
          notif.read = true;
          state.unreadCount -= 1;
        }
      });
  },
});

export const notificationReducer =  notificationSlice.reducer;
