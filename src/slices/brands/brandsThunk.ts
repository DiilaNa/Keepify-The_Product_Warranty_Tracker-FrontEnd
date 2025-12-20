import { getBarChartService, loadBrandsByCategory, saveBrandsService } from "@/services/brands";
import type { IBrandsDataTypes } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveBrandsThunk = createAsyncThunk(
  "/brands/saveBrand",
  async (data: IBrandsDataTypes, thunkAPI) => {
    try {
      return await saveBrandsService(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to save Brands"
      );
    }
  }
);
export const loadBrandsByCategoryThunk = createAsyncThunk(
  "brands/loadByCategory",
  async (categoryId:string, thunkAPI) => {
    try {
      const res = await loadBrandsByCategory(categoryId);
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const BarChartThunk = createAsyncThunk(
  "/brands/loadBarcher",
  async(_,thunkAPI) => {
    try{
      const res = await getBarChartService();
      return res.data;
    }catch(err:any){
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)
  
