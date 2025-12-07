import { saveCategoryService } from "@/services/category";
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
