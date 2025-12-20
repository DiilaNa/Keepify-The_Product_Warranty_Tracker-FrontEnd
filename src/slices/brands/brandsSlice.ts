    import { createSlice } from "@reduxjs/toolkit";
    import { BarChartThunk, loadBrandsByCategoryThunk, saveBrandsThunk } from "./brandsThunk";
import type { IBrandsDataTypes } from "@/types/types";

    export interface BrandState {
      brands: IBrandsDataTypes[];
      loadingBrands: boolean;
      error: string | null;
    }

    const initialState: BrandState = {
      brands: [],
      loadingBrands: false,
      error: null,
    };

    const brandsSlice = createSlice({
        name: "brands",
        initialState,
        reducers:{},
        extraReducers: (builder) => {
            builder
              .addCase(saveBrandsThunk.pending, (state) => {
                state.loadingBrands = true;
                state.error = null;
              })
              .addCase(saveBrandsThunk.fulfilled, (state, action) => {
                state.loadingBrands = false;
                state.brands = action.payload;
              })
              .addCase(saveBrandsThunk.rejected, (state, action) => {
                state.loadingBrands = false;
                state.error = action.payload as string;
              })
              .addCase(loadBrandsByCategoryThunk.pending, (state) => {
                state.loadingBrands = true;
                state.error = null;
              })
              .addCase(loadBrandsByCategoryThunk.fulfilled, (state, action) => {
                state.loadingBrands = false;
                state.brands = action.payload;
              })
              .addCase(loadBrandsByCategoryThunk.rejected, (state, action) => {
                state.loadingBrands = false;
                state.error = action.payload as string;
              })
              .addCase(BarChartThunk.pending, (state) => {
                state.loadingBrands = true;
                state.error = null;
              })
              .addCase(BarChartThunk.fulfilled, (state, action) => {
                state.loadingBrands = false;
                state.brands = action.payload;
              })
              .addCase(BarChartThunk.rejected, (state, action) => {
                state.loadingBrands = false;
                state.error = action.payload as string;
              });
        }
    })

    export const brandsReducer = brandsSlice.reducer;