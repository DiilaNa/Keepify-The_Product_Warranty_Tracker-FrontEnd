import { saveBrandsService, type BrandsDataTypes } from "@/services/brands";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveBrandsThunk = createAsyncThunk(
    "/brands/saveBrand",
    async(data:BrandsDataTypes,thunkAPI) => {
        try{
            return await saveBrandsService(data)
        }catch(err:any){
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to save Brands")
        }
    }
)