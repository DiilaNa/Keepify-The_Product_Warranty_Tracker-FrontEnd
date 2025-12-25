import { createSlice } from "@reduxjs/toolkit";
import {
  deleteWarrantyThunk,
  LineChartThunk,
  loadWarrantiesThunk,
  saveWarrantyThunk,
  updateWarrantyThunk,
} from "./warrantyThunk";
import type { IWarranty, LineChartItem } from "@/types/types";

export interface WarrantyState {
  warranties: IWarranty[];
  lineChartData: LineChartItem[];
  loadingWarranties: boolean;
  page: number;
  totalPages: number;
  error: string | null;
  search: string;
}

const initialState: WarrantyState = {
  warranties: [],
  lineChartData: [],
  loadingWarranties: false,
  page: 1,
  totalPages: 1,
  error: null,
  search: "",
};

const warrantySlice = createSlice({
  name: "warranty",
  initialState,
  reducers: {
    searchPosts(state,action){
      state.search = action.payload;
      state.page = 1;
    }
  },
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
      .addCase(LineChartThunk.pending, (state) => {
        state.loadingWarranties = true;
      })
      .addCase(LineChartThunk.fulfilled, (state, action) => {
        state.loadingWarranties = false;
        state.lineChartData = action.payload;
      })
      .addCase(LineChartThunk.rejected, (state) => {
        state.loadingWarranties = false;
      })
      .addCase(saveWarrantyThunk.pending, (state) => {
        state.loadingWarranties = true;
        state.error = null;
      })
      .addCase(saveWarrantyThunk.fulfilled, (state) => {
        state.loadingWarranties = false;

      })
      .addCase(saveWarrantyThunk.rejected, (state, action) => {
        state.loadingWarranties = false;
        state.error = action.payload as string;
      })
      .addCase(updateWarrantyThunk.pending, (state) => {
        state.loadingWarranties = true;
        state.error = null;
      })
      .addCase(updateWarrantyThunk.fulfilled, (state, action) => {
        state.loadingWarranties = false;
        const index = state.warranties.findIndex(
          (w) => w._id === action.payload.data._id
        );
        if (index !== -1) {
          state.warranties[index] = {
            ...state.warranties[index],
            ...action.payload.data,
          };
        }
      })
      .addCase(updateWarrantyThunk.rejected, (state, action) => {
        state.loadingWarranties = false;
        state.error = action.payload as string;
      })
      .addCase(deleteWarrantyThunk.pending, (state) => {
        state.loadingWarranties = true;
        state.error = null;
      })
      .addCase(deleteWarrantyThunk.fulfilled, (state, action) => {
        state.warranties = state.warranties.filter(
          (w) => w._id !== action.meta.arg
        );
      })
      .addCase(deleteWarrantyThunk.rejected, (state, action) => {
        state.loadingWarranties = false;
        state.error = action.payload as string;
      });
  },
});

export const { searchPosts } = warrantySlice.actions;
export const warrantyReducer = warrantySlice.reducer;
