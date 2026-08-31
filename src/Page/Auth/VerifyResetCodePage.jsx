import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { verifyResetCode } from "../../features/auth/authSlice";

function VerifyResetCodePage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, resetCodeVerified, resetEmail } = useSelector(
    (state) => state.auth,
  );

  const [resetCode, setResetCode] = useState("");

  useEffect(() => {
    if (!resetCodeVerified) return;

    navigate("/reset-password");
  }, [resetCodeVerified, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      verifyResetCode({
        resetCode,
      }),
    );
  };

  return (
    <div className="mx-auto flex max-w-xl px-4 py-16">
      <div className="w-full rounded-[34px] border border-slate-200 bg-white p-8 shadow-lift dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-4xl font-black">تأكيد رمز التحقق</h1>

        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          أدخل رمز التحقق الذي تم إرساله إلى بريدك الإلكتروني.
        </p>

        {resetEmail && (
          <p className="mt-2 text-sm font-bold text-violet-700">{resetEmail}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <input
            type="text"
            required
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            className="w-full rounded-2xl border bg-slate-50 p-3.5 text-center text-xl tracking-[0.5em] dark:border-slate-700 dark:bg-slate-800"
            placeholder="000000"
            maxLength={6}
          />

          {error && <p className="text-sm font-bold text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-2xl bg-violet-700 py-4 font-black text-white"
          >
            {loading ? "جاري التحقق..." : "تأكيد الرمز"}
          </button>
        </form>

        <Link to="/forgot-password">
          <button
            type="button"
            className="mt-6 w-full cursor-pointer font-black text-violet-700"
          >
            تغيير البريد الإلكتروني
          </button>
        </Link>
      </div>
    </div>
  );
}

export default VerifyResetCodePage;
