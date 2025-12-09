import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/auth/authSlice"; // adjust the path as needed
import { categoryReducer } from "@/slices/category/categorySlice";
import { brandsReducer } from "@/slices/brands/brandsSlice";

const store =  configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        brands: brandsReducer

    },

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;