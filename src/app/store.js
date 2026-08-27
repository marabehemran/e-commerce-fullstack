import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categories/categorySlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    auth: authReducer,
  },
});
