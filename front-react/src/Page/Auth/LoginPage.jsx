import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../features/auth/authSlice";

function LoginPage() {  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, loading, error } = useSelector((state) => state.auth);
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
      loginUser({
        email,
        password,
      }),
    );
  };

  const handleQuickLogin = (email, password) => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="mx-auto flex max-w-xl px-4 py-16">
      <div className="w-full rounded-[34px] border border-slate-200 bg-white p-8 shadow-lift dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-4xl font-black">تسجيل الدخول</h1>
        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800"
            placeholder="name@example.com"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full rounded-2xl border bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800"
            placeholder="••••••••"
          />
          <div className="text-left">
            <Link
              to="/forgot-password"
              className="text-sm font-bold text-violet-700"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full rounded-2xl bg-slate-950 py-4 font-black text-white"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}{" "}
          </button>
          {error && (
            <p className="text-center text-sm font-bold text-red-600">
              {error}
            </p>
          )}
        </form>
        <Link to="/register">
          <button className="cursor-pointer mt-6 w-full font-black text-violet-700">
            <span>إنشاء حساب جديد </span>
          </button>
        </Link>
      </div>
      <div>
        <button
          type="button"
          onClick={() => handleQuickLogin("admin@test.com", "Test@1234")}
          disabled={loading}
          className="cursor-pointer mt-6 w-full font-black text-violet-700"
        >
          الدخول بصيغة الادمن
        </button>

        <button
          type="button"
          onClick={() => handleQuickLogin("user1@test.com", "Test@1234")}
          disabled={loading}
          className="cursor-pointer mt-6 w-full font-black text-violet-700"
        >
          الدخول بصيغة المانيجر
        </button>

        <button
          type="button"
          onClick={() => handleQuickLogin("user6@test.com", "Test@1234")}
          disabled={loading}
          className="cursor-pointer mt-6 w-full font-black text-violet-700"
        >
          الدخول بصيغة اليوزر
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
