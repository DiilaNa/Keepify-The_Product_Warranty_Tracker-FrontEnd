import { getBarChartService, loadBrandsByCategory, saveBrandsService, type BrandsDataTypes } from "@/services/brands";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveBrandsThunk = createAsyncThunk(
  "/brands/saveBrand",
  async (data: BrandsDataTypes, thunkAPI) => {
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
  
