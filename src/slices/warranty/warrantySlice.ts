import { createSlice } from "@reduxjs/toolkit";
import { saveWarrantyThunk } from "./warrantyThunk";

export interface WarrantyState {
  warranties: any[];
  loading: boolean;
  error: string | null;
}

const initialState: WarrantyState = {
  warranties: [],
  loading: false,
  error: null,
};

const warrantySlice = createSlice({
  name: "warranty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveWarrantyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveWarrantyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.warranties.push(action.payload.data);
      })
      .addCase(saveWarrantyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const warrantyReducer = warrantySlice.reducer;
