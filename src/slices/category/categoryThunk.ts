import { loadCategoriesInComboBox, saveCategoryService } from "@/services/category";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveCategoryThunk = createAsyncThunk(
    "categories/saveCategory",
    async(formData: FormData, thunkAPI) => {
        try{
            return await saveCategoryService(formData);
        }catch(err:any){
            return thunkAPI.rejectWithValue( err.response?.data?.message || "Failed to save category")
        }
    }
)

export const loadCategoryInComboThunk = createAsyncThunk(
  "/categories/loadCategoriesInCombo",
  async(_, thunkAPI) => {
    try{
        const res =  await loadCategoriesInComboBox();
        return res.data
    }catch(err:any){
        return thunkAPI.rejectWithValue(
          err.response?.data?.message || "Failed to load categories in the combo box"
        );
    }
  }
);
