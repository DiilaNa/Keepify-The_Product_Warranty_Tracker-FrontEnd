import { createSlice } from "@reduxjs/toolkit";
import { saveWarrantyThunk } from "./warrantyThunk";

export interface WarrantyState {
  warranties: any[];
  loadingWarranties: boolean;
  error: string | null;
}

const initialState: WarrantyState = {
  warranties: [],
  loadingWarranties: false,
  error: null,
};

const warrantySlice = createSlice({
  name: "warranty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
