import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/auth/authSlice"; // adjust the path as needed
import { categoryReducer } from "@/slices/category/categorySlice";
import { brandsReducer } from "@/slices/brands/brandsSlice";
import { warrantyReducer } from "@/slices/warranty/warrantySlice";
import { announcementsReducer } from "@/slices/announcements/announcementsSlice";
import { adminDashboardSlicereducer } from "@/slices/features/adminDashBoardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    brands: brandsReducer,
    warranty: warrantyReducer,
    announcements: announcementsReducer,
    adminDashBoard: adminDashboardSlicereducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
