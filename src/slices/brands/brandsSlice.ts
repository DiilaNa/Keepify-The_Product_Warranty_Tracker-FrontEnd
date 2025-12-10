    import { createSlice } from "@reduxjs/toolkit";
    import { loadBrandsByCategoryThunk, saveBrandsThunk } from "./brandsThunk";

    export interface BrandState {
      brands: any[];
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
              });
        }
    })

    export const brandsReducer = brandsSlice.reducer;