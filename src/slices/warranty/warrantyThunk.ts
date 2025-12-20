import { deleteWarrantyService, getLineChartService, loadWarrantiesService, saveWarrantyService, updateWarrantyService } from "@/services/warranty";
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
      search
    }: { page?: number; limit?: number; search?:string },
    thunkAPI
  ) => {
    try {
      return await loadWarrantiesService({ page, limit , search });
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


export const deleteWarrantyThunk = createAsyncThunk(
  "warranty/deleteWarranty",
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteWarrantyService(id);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const LineChartThunk = createAsyncThunk(
  "/warranties/warranties-overtime",
  async (_, thunkAPI) => {
    try {
      const res = await getLineChartService();
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);