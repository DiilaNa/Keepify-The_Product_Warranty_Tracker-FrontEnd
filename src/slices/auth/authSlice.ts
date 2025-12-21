import { createSlice } from "@reduxjs/toolkit";
import { googleAuthThunk, loadUserTableThunk, loginUserThunk, registerAdminThunk, registerUserThunk } from "./authThunk";
import type { IUser } from "@/types/types";

export interface AuthState {
  user: IUser[];
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  page: number;
  totalPages: number;
  error: string | null;
  search: string;
}

const initialState: AuthState = {
  user: [],
  accessToken: null,
  refreshToken: null,
  loading: false,
  page: 1,
  totalPages: 1,
  error: null,
  search: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = [];
      state.error = null;
      state.loading = false;
    },
    setSearch(state, action) {
      state.search = action.payload;
      state.page = 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadUserTableThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserTableThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(loadUserTableThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerAdminThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAdminThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerAdminThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(googleAuthThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuthThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = Array.isArray(action.payload.user)
          ? action.payload.user
          : [action.payload.user];
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(googleAuthThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      ;
  },
});
export const { logout } = authSlice.actions;
export const { setSearch } = authSlice.actions;
export const authReducer = authSlice.reducer;
