import { saveWarrantyService } from "@/services/warranty";
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
