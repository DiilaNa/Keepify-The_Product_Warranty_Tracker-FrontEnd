import { fetchAdminDashboardStats } from "@/services/adminDashborad";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AdminDashboardState {
  loading: boolean;
  stats: {
    users: {
      totalUsers: number;
      totalAdmins: number;
      totalNormalUsers: number;
    };
    categories: {
      totalCategories: number;
    };
    brands: {
      totalBrands: number;
    };
    announcements: {
      totalAnnouncements: number;
      publishedAnnouncements: number;
      unpublishedAnnouncements: number;
    };
  } | null;
  error: string | null;
}

const initialState: AdminDashboardState = {
  loading: false,
  stats: null,
  error: null,
};

export const loadAdminDashboardStats = createAsyncThunk(
  "auth/admin/dashboard-stats",
  async () => {
    return await fetchAdminDashboardStats();
  }
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAdminDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAdminDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(loadAdminDashboardStats.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load dashboard stats";
      });
  },
});

export const adminDashboardSlicereducer = adminDashboardSlice.reducer;
