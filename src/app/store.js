import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categories/categorySlice";
import authReducer from "../features/auth/authSlice";
import brandReducer from "../features/brands/brandSlice";
import couponReducer from "../features/coupons/couponSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    auth: authReducer,
    brands: brandReducer,
    coupons: couponReducer,
  },
});
