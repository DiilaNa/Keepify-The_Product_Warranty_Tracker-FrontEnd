import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, type RegistrationDataTypes } from "../../services/auth";

export const registerUserThunk = createAsyncThunk(
    "/auth/register",
    async(data: RegistrationDataTypes, thunkAPI) => {
        try{
            return await registerUser(data);
        }catch(err:any){
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Registraion Failed")
        }
    }
)