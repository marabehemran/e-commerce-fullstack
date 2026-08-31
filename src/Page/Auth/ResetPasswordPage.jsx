import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  resetPassword,
  resetPasswordFlow,
} from "../../features/auth/authSlice";

function ResetPasswordPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    loading,
    error,
    resetEmail,
    resetCodeVerified,
    passwordResetSuccess,
  } = useSelector((state) => state.auth);

  const [newPassword, setNewPassword] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    if (!passwordResetSuccess) return;

    navigate("/login");

    dispatch(resetPasswordFlow());
  }, [passwordResetSuccess, navigate, dispatch]);

  useEffect(() => {
    if (!resetCodeVerified) {
      navigate("/forgot-password");
    }
  }, [resetCodeVerified, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== passwordConfirm) {
      return;
    }

    dispatch(
      resetPassword({
        email: resetEmail,
        newPassword,
      }),
    );
  };

  return (
    <div className="mx-auto flex max-w-xl px-4 py-16">
      <div className="w-full rounded-[34px] border border-slate-200 bg-white p-8 shadow-lift dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-4xl font-black">إعادة تعيين كلمة المرور</h1>

        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          أدخل كلمة المرور الجديدة لحسابك.
        </p>

        {resetEmail && (
          <p className="mt-2 text-sm font-bold text-violet-700">{resetEmail}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-2xl border bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800"
            placeholder="كلمة المرور الجديدة"
          />

          <input
            type="password"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full rounded-2xl border bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800"
            placeholder="تأكيد كلمة المرور"
          />

          {newPassword !== passwordConfirm && passwordConfirm && (
            <p className="text-sm font-bold text-red-500">
              كلمتا المرور غير متطابقتين
            </p>
          )}

          {error && <p className="text-sm font-bold text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={
              loading ||
              !newPassword ||
              !passwordConfirm ||
              newPassword !== passwordConfirm
            }
            className="w-full cursor-pointer rounded-2xl bg-violet-700 py-4 font-black text-white"
          >
            {loading ? "جاري تغيير كلمة المرور..." : "تغيير كلمة المرور"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
