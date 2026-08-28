import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getLoggedUser, finishAuthCheck } from "./features/auth/authSlice";

import ProtectedRoute from "./Routes/ProtectedRoute";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./Page/Home/HomePage";
import NavBarLogin from "./Components/Utility/NavBarLogin";
import Footer from "./Components/Utility/footer";
import LoginPage from "./Page/Auth/LoginPage";
import RegisterPage from "./Page/Auth/RegisterPage";
import VerifyResetCodePage from "./Page/Auth/VerifyResetCodePage";
import ForgotPasswordPage from "./Page/Auth/ForgotPasswordPage";
import AllCategoryPage from "./Page/Category/AllCategoryPage";
import AllBrandPage from "./Page/Brand/AllBrandPage";
import ShopProductPage from "./Page/Product/ShopProductPage";
import ProductDetalisPage from "./Page/Product/ProductDetalisPage";
import CartPage from "./Page/Cart/CartPage";
import ChoosePayMethoudPage from "./Page/Checkout/ChoosePayMethoudPage";
import WishPage from "./Page/Wish/WishPage";

import ManageAllProductPage from "./Page/AdminManager/ManageAllProductPage";
import ManageAllOrderPage from "./Page/AdminManager/ManageAllOrderPage";
import ManageAllCategoryPage from "./Page/AdminManager/ManageAllCategoryPage";
import ManageAllSubCategoryPage from "./Page/AdminManager/ManageAllSubCategoryPage";
import ManageAllBrandPage from "./Page/AdminManager/ManageAllBrandPage";
import ManageAllCouponPage from "./Page/AdminManager/ManageAllCouponPage";
import ManageAllUserPage from "./Page/AdminManager/ManageAllUserPage";
import ManageAllReviewPage from "./Page/AdminManager/ManageAllReviewPage";
import ManageDetaliesOrderPage from "./Page/AdminManager/ManageDetaliesOrderPage";
import ManageUpdateAccountPage from "./Page/AdminManager/ManageUpdateAccountPage";
import ManageUpdateBrandPage from "./Page/AdminManager/ManageUpdateBrandPage";
import ManageUpdateSubCategoryPage from "./Page/AdminManager/ManageUpdateSubCategoryPage";
import ManageUpdateCategoryPage from "./Page/AdminManager/ManageUpdateCategoryPage";
import ManageUpdateCouponPage from "./Page/AdminManager/ManageUpdateCouponPage";
import ManageUpdateProductPage from "./Page/AdminManager/ManageUpdateProductPage";

import UserAllOrderePage from "./Page/User/UserAllOrderePage";
import UserAllAdress from "./Page/User/UserAllAdressPage";
import UserProfilePage from "./Page/User/UserProfilePage";
import UserAllReviewsPage from "./Page/User/UserAllReviewsPage";
import UserShowOrderDeatliesPage from "./Page/User/UserShowOrderDeatliesPage";
import UserUpdateAddressPage from "./Page/User/UserUpdateAddressPage";
import UserUpdateReviewPage from "./Page/User/UserUpdateReviewPage";

function App() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getLoggedUser());
    } else {
      dispatch(finishAuthCheck());
    }
  }, [dispatch, token]);
  return (
    <BrowserRouter>
      <NavBarLogin />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-reset-code" element={<VerifyResetCodePage />} />
        <Route path="/allcategory" element={<AllCategoryPage />} />
        <Route path="/allBrand" element={<AllBrandPage />} />
        <Route path="/products" element={<ShopProductPage />} />
        <Route path="/products/:id" element={<ProductDetalisPage />} />

        {/* ADMIN + MANAGER */}

        <Route element={<ProtectedRoute allowedRoles={["admin", "manager"]} />}>
          <Route path="/manageallproducts" element={<ManageAllProductPage />} />

          <Route path="/manageallorders" element={<ManageAllOrderPage />} />

          <Route
            path="/manageallcategories"
            element={<ManageAllCategoryPage />}
          />

          <Route
            path="/manageallsubcategories"
            element={<ManageAllSubCategoryPage />}
          />

          <Route path="/manageallbrands" element={<ManageAllBrandPage />} />

          <Route path="/manageallcoupons" element={<ManageAllCouponPage />} />

          <Route path="/manageallreviews" element={<ManageAllReviewPage />} />

          <Route
            path="/manageordersdetalies"
            element={<ManageDetaliesOrderPage />}
          />

          <Route
            path="/manageupdateaccout"
            element={<ManageUpdateAccountPage />}
          />

          <Route
            path="/manageupdatesubcategory"
            element={<ManageUpdateSubCategoryPage />}
          />

          <Route
            path="/manageupdatecategory/:id"
            element={<ManageUpdateCategoryPage />}
          />
          
          <Route
            path="/manageupdatebrand/:id"
            element={<ManageUpdateBrandPage />}
          />

          <Route
            path="/manageupdatecoupon/:id"
            element={<ManageUpdateCouponPage />}
          />

          <Route
            path="/manageupdateproduct"
            element={<ManageUpdateProductPage />}
          />
        </Route>

        {/* ADMIN ONLY */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/manageallusers" element={<ManageAllUserPage />} />
        </Route>

        {/* USER ONLY */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/cart" element={<CartPage />} />

          <Route path="/order/paymethod" element={<ChoosePayMethoudPage />} />

          <Route path="/wish" element={<WishPage />} />

          <Route path="/user/allorder" element={<UserAllOrderePage />} />

          <Route path="/user/alladdress" element={<UserAllAdress />} />

          <Route path="/user/profile" element={<UserProfilePage />} />

          <Route path="/user/reviews" element={<UserAllReviewsPage />} />

          <Route
            path="/user/ordersdetalies"
            element={<UserShowOrderDeatliesPage />}
          />

          <Route
            path="/user/updateaddres"
            element={<UserUpdateAddressPage />}
          />

          <Route path="/user/updatereview" element={<UserUpdateReviewPage />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
