import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../features/auth/authSlice";

function ForgotPasswordPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, resetCodeSent } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!resetCodeSent) return;

    navigate("/verify-reset-code");
  }, [resetCodeSent, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      forgotPassword({
        email,
      }),
    );
  };

  return (
    <div className="mx-auto flex max-w-xl px-4 py-16">
      <div className="w-full rounded-[34px] border border-slate-200 bg-white p-8 shadow-lift dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-4xl font-black">نسيت كلمة المرور؟</h1>

        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          أدخل البريد الإلكتروني المرتبط بحسابك وسنرسل لك رمزًا لإعادة تعيين
          كلمة المرور.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800"
            placeholder="name@example.com"
          />

          {error && <p className="text-sm font-bold text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-2xl bg-violet-700 py-4 font-black text-white"
          >
            {loading ? "جاري إرسال الرمز..." : "إرسال رمز التحقق"}
          </button>
        </form>

        <Link to="/login">
          <button
            type="button"
            className="mt-6 w-full cursor-pointer font-black text-violet-700"
          >
            العودة إلى تسجيل الدخول
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
