import { createSlice } from "@reduxjs/toolkit";
import { loadWarrantiesThunk, saveWarrantyThunk } from "./warrantyThunk";

export interface WarrantyState {
  warranties: any[];
  loadingWarranties: boolean;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: WarrantyState = {
  warranties: [],
  loadingWarranties: false,
  page: 1,
  totalPages: 1,
  error: null,
};

const warrantySlice = createSlice({
  name: "warranty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadWarrantiesThunk.pending, (state) => {
        state.loadingWarranties = true;
      })
      .addCase(loadWarrantiesThunk.fulfilled, (state, action) => {
        state.loadingWarranties = false;
        state.warranties = action.payload.data;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(loadWarrantiesThunk.rejected, (state) => {
        state.loadingWarranties = false;
      })
      .addCase(saveWarrantyThunk.pending, (state) => {
        state.loadingWarranties = true;
        state.error = null;
      })
      .addCase(saveWarrantyThunk.fulfilled, (state, action) => {
        state.loadingWarranties = false;
        state.warranties.push(action.payload.data);
      })
      .addCase(saveWarrantyThunk.rejected, (state, action) => {
        state.loadingWarranties = false;
        state.error = action.payload as string;
      });
  },
});

export const warrantyReducer = warrantySlice.reducer;
