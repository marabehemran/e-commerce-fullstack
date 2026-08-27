import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import {
  Van,
  Search,
  Heart,
  Moon,
  ShoppingCart,
} from "lucide-react";

import { logout } from "../../features/auth/authSlice";

import logo from "../../images/logo.png";

function NavBarLogin() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  return (
    <>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs bg-slate-950 text-white">
        <div className="flex gap-2 text-xs">
          <span>
            <Van />
          </span>

          <span>شحن مجاني للطلبات فوق 250 شيكل</span>
        </div>

        <div className="text-xs">
          <span>دفع آمن • استرجاع مرن • دعم سريع</span>
        </div>
      </div>

      <div className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
          <div className="px-4 flex h-20 items-center gap-3">
            <div className="flex h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-800 text-white shadow-lg">
              <span>
                <Link to="/">
                  <img src={logo} />
                </Link>
              </span>
            </div>

            <div className="hidden md:block">
              <p className="text-lg font-stretch-100%">
                Happy<span className="text-violet-600">Shop</span>
              </p>

              <p className="text-[10px]">تجربة بسيطة و واضحة</p>
            </div>
          </div>

          <div className="relative flex-1 max-w-2xl ml-2 m-auto">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search />
            </span>

            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-100/80 py-3.5 pr-12 pl-24 outline-none dark:border-slate-700 dark:bg-slate-900"
              placeholder="ابحث عن منتج..."
            />

            <button className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white hover:bg-violet-700">
              <span>بحث</span>
            </button>
          </div>

          <div className="mr-auto flex items-center gap-1">
            <button className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-violet-300 dark:border-slate-700 dark:bg-slate-900">
              <span className="text-[20px]">
                <Moon />
              </span>
            </button>

            {user?.role === "user" && (
              <>
                <Link
                  to="/wish"
                  className="grid h-10 w-10 place-items-center rounded-xl hover:bg-rose-50 hover:text-rose-600"
                >
                  <Heart />
                </Link>

                <Link
                  to="/cart"
                  className="grid h-10 w-10 place-items-center rounded-xl hover:bg-violet-50 hover:text-violet-700"
                >
                  <ShoppingCart />
                </Link>
              </>
            )}

            {!user && (
              <Link
                to="/login"
                className="hidden rounded-xl px-3 py-2 text-sm font-black hover:bg-slate-100 dark:hover:bg-slate-800 sm:block"
              >
                دخول
              </Link>
            )}

            {user?.role === "user" && (
              <Link
                to="/user/profile"
                className="hidden rounded-xl px-3 py-2 text-sm font-black hover:bg-slate-100 dark:hover:bg-slate-800 sm:block"
              >
                حسابي
              </Link>
            )}

            {(user?.role === "admin" || user?.role === "manager") && (
              <Link
                to="/manageallproducts"
                className="hidden rounded-xl px-3 py-2 text-sm font-black hover:bg-slate-100 dark:hover:bg-slate-800 sm:block"
              >
                لوحة الإدارة
              </Link>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="hidden cursor-pointer rounded-xl px-3 py-2 text-sm font-black hover:bg-slate-100 dark:hover:bg-slate-800 sm:block"
              >
                خروج
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBarLogin;