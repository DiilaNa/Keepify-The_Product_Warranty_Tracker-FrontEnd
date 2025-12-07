import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, type RegistrationDataTypes } from "../../services/auth";

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

export const loginUserThunk = createAsyncThunk("/auth/login",
    async(data: {email:string, password:string},thunkAPI) => {
        try{
            const res =  await loginUser(data);
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            return res.data;
        }catch(err:any){
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Login Failed")
        }
        
    }
)