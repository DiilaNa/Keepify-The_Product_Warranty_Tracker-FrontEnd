import { createSlice } from "@reduxjs/toolkit";
import { loadCategoryInComboThunk, saveCategoryThunk } from "./categoryThunk";

export interface CategoryState{
    categories: any[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
}


const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(saveCategoryThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(saveCategoryThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.categories.push(action.payload.data);
          })
          .addCase(saveCategoryThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          })

          .addCase(loadCategoryInComboThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(loadCategoryInComboThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.categories= action.payload;
          })
          .addCase(loadCategoryInComboThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });


    }
})

export const categoryReducer = categorySlice.reducer;