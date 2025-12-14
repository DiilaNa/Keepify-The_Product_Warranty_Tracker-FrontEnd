import { loadWarrantiesService, saveWarrantyService, updateWarrantyService } from "@/services/warranty";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveWarrantyThunk = createAsyncThunk(
  "/warranties/saveWarranty",
  async (formData: FormData, thunkAPI) => {
    try {
      return await saveWarrantyService(formData);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to save warrant posts"
      );
    }
  }
);


export const loadWarrantiesThunk = createAsyncThunk(
  "/warranties/loadwarranties",
  async (
    {
      page = 1,
      limit = 10,
    }: { page?: number; limit?: number },
    thunkAPI
  ) => {
    try {
      return await loadWarrantiesService({ page, limit });
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load warranties"
      );
    }
  }
);

export const updateWarrantyThunk = createAsyncThunk(
  "/warranty/updateWarranty",
  async(
    {id, formData}: {id:string; formData:FormData},
    {rejectWithValue}
  ) => {
    try{
      return await updateWarrantyService(id,formData);
    }catch(err:any){
      return rejectWithValue(err.response?.data?.message)
    }
  }
);