import { fetchUserDashboardStats } from "@/services/DashBoard";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserDashboardStats {
  ownerId: string;
  totalWarranties: number;
  expiringThisMonth: number;
  expiringNext7Days: number;
  alreadyExpired: number;
}

interface UserDashboardState {
  loading: boolean;
  stats: UserDashboardStats | null;
  error: string | null;
}

const initialState: UserDashboardState = {
  loading: false,
  stats: null,
  error: null,
};

export const loadUserDashboardStats = createAsyncThunk(
  "userDashboard/loadStats",
  async () => {
    return await fetchUserDashboardStats();
  }
);

const userDashboardSlice = createSlice({
  name: "userDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(loadUserDashboardStats.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load user dashboard stats";
      });
  },
});

export const userDashboardSlicereducer =  userDashboardSlice.reducer;
