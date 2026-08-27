import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin" || user.role === "manager") {
      navigate("/manageallproducts");
    } else if (user.role === "user") {
      navigate("/user/allorder");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      registerUser({
        name,
        email,
        password,
        passwordConfirm,
      }),
    );
  };
  return (
    <div className="mx-auto flex max-w-xl px-4 py-16">
      <div className="w-full rounded-[34px] border border-slate-200 bg-white p-8 shadow-lift dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-4xl font-black">إنشاء حساب</h1>
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800"
            placeholder="الاسم"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800"
            placeholder="name@example.com"
          />
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800"
            placeholder="••••••••"
          />
          <input
            required
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full rounded-2xl border bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800"
            placeholder="تأكيد كلمة المرور"
          />
          {error ? (
            <p className="text-sm font-bold text-red-500">{error}</p>
          ) : (
            <></>
          )}
          <button
            disabled={loading}
            type="submit"
            className="cursor-pointer w-full rounded-2xl bg-violet-700 py-4 font-black text-white"
          >
            {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
