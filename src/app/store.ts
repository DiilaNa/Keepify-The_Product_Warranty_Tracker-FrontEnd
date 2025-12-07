import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/auth/authSlice"; // adjust the path as needed
import { categoryReducer } from "@/slices/category/categorySlice";

const store =  configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer

    },

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;