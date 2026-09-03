import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categories/categorySlice";
import authReducer from "../features/auth/authSlice";
import brandReducer from "../features/brands/brandSlice";
import couponReducer from "../features/coupons/couponSlice";
import userReducer from "../features/users/userSlice";
import subCategoryReducer from "../features/subCategories/subCategorySlice";
import productReducer from "../features/products/productSlice";
import reviewReducer from "../features/reviews/reviewSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/orders/orderSlice";
import addressReducer from "../features/addresses/addressSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    auth: authReducer,
    brands: brandReducer,
    coupons: couponReducer,
    users: userReducer,
    subCategories: subCategoryReducer,
    products: productReducer,
    reviews: reviewReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    orders: orderReducer,
    addresses: addressReducer,
  },
});
