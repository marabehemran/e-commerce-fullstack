import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  updateLoggedUserData,
  changeLoggedUserPassword,
  deleteLoggedUser,
  resetProfileStatus,
} from "../../../features/auth/authSlice";

function ShowProfileUser() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, loading, error, profileUpdateSuccess, passwordUpdateSuccess } =
    useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(resetProfileStatus());
    };
  }, [dispatch]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    try {
      await dispatch(
        updateLoggedUserData({
          name: name.trim(),

          phone: phone.trim(),

          email: email.trim(),
        }),
      ).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !password || !passwordConfirm) {
      return;
    }

    try {
      await dispatch(
        changeLoggedUserPassword({
          currentPassword,

          password,

          passwordConfirm,
        }),
      ).unwrap();

      setCurrentPassword("");

      setPassword("");

      setPasswordConfirm("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("هل أنت متأكد من تعطيل الحساب؟");

    if (!confirmDelete) {
      return;
    }

    try {
      await dispatch(deleteLoggedUser()).unwrap();

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black">الملف الشخصي</h1>

      <div className="mt-6 space-y-5">
        <form
          onSubmit={handleUpdateProfile}
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-xl font-black">بيانات الحساب</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              placeholder="الاسم"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              placeholder="رقم الهاتف"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800 md:col-span-2"
              placeholder="البريد الإلكتروني"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer mt-4 rounded-2xl bg-slate-950 px-5 py-3 font-black text-white disabled:opacity-60"
          >
            {loading ? "جاري الحفظ..." : "حفظ"}
          </button>

          {profileUpdateSuccess && (
            <p className="mt-3 font-bold text-green-600">
              تم تحديث بيانات الحساب بنجاح
            </p>
          )}
        </form>

        <form
          onSubmit={handleChangePassword}
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-xl font-black">تغيير كلمة المرور</h2>

          <input
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
            className="mt-4 w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            placeholder="كلمة المرور الحالية"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="mt-3 w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            placeholder="كلمة المرور الجديدة"
          />

          <input
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            type="password"
            className="mt-3 w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            placeholder="تأكيد كلمة المرور الجديدة"
          />

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer mt-4 rounded-2xl bg-violet-700 px-5 py-3 font-black text-white disabled:opacity-60"
          >
            {loading ? "جاري التغيير..." : "تغيير"}
          </button>

          {passwordUpdateSuccess && (
            <p className="mt-3 font-bold text-green-600">
              تم تغيير كلمة المرور بنجاح
            </p>
          )}
        </form>

        {error && <p className="font-bold text-red-600">{error}</p>}

        <button
          type="button"
          onClick={handleDeleteAccount}
          disabled={loading}
          className="cursor-pointer font-black text-rose-600 disabled:opacity-60"
        >
          تعطيل الحساب
        </button>
      </div>
    </div>
  );
}

export default ShowProfileUser;
