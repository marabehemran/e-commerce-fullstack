
import { Camera, Info, UserCog } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUser,
  updateUser,
} from "../../../features/users/userSlice";

function ManageUpdateUser() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, loading, error } = useSelector(
    (state) => state.users,
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [active, setActive] = useState(true);

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setRole(user.role || "user");
      setActive(user.active !== false);
    }
  }, [user]);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const imageUrl = URL.createObjectURL(image);

    setPreviewUrl(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdateError(null);

    if (!name.trim() || !email.trim()) {
      return;
    }

    const formData = new FormData();

    formData.append("name", name.trim());
    formData.append("email", email.trim());
    formData.append("role", role);
    formData.append("active", active);

    if (phone.trim()) {
      formData.append("phone", phone.trim());
    }

    if (image) {
      formData.append("profileImg", image);
    }

    try {
      await dispatch(
        updateUser({
          id,
          userData: formData,
        }),
      ).unwrap();

      setImage(null);

      dispatch(getUser(id));
    } catch (error) {
      setUpdateError(error);
    }
  };

  const getUserImage = () => {
    if (image && previewUrl) {
      return previewUrl;
    }

    if (!user?.profileImg) {
      return "https://i.pravatar.cc/300?img=12";
    }

    if (user.profileImg.startsWith("http")) {
      return user.profileImg;
    }

    return `http://localhost:8000/users/${user.profileImg}`;
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <small className="font-black text-violet-600">
            إدارة المستخدمين
          </small>

          <h1 className="mt-1 flex items-center gap-2 text-3xl font-black">
            <span className="text-violet-600">
              <UserCog />
            </span>

            تعديل المستخدم
          </h1>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black dark:border-slate-700 dark:bg-slate-900"
        >
          رجوع
        </button>
      </div>

      {loading && (
        <p className="mb-4 font-bold text-violet-700">
          جاري تحميل المستخدم...
        </p>
      )}

      {error && (
        <p className="mb-4 font-bold text-red-500">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <label className="cursor-pointer rounded-[26px] border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-800 md:col-span-2">
            <div className="flex justify-center">
              <img
                src={getUserImage()}
                alt={user?.name || "User"}
                className="h-28 w-28 rounded-full object-cover"
              />
            </div>

            <span className="mt-4 flex justify-center text-4xl text-violet-600">
              <Camera />
            </span>

            <b className="mt-1 block">
              تغيير صورة المستخدم
            </b>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              اختر صورة جديدة للمستخدم
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files?.[0] || null);
              }}
              hidden
            />
          </label>

          <div>
            <label className="mb-2 block font-black">
              الاسم
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-black">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-black">
              رقم الهاتف
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-black">
              الصلاحية
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-2xl border p-3.5 font-bold dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="user">
                User
              </option>

              <option value="manager">
                Manager
              </option>

              <option value="admin">
                Admin
              </option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-black">
              حالة المستخدم
            </label>

            <select
              value={active ? "active" : "inactive"}
              onChange={(e) =>
                setActive(e.target.value === "active")
              }
              className="w-full rounded-2xl border p-3.5 font-bold dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="active">
                نشط
              </option>

              <option value="inactive">
                غير نشط
              </option>
            </select>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-violet-600">
              <Info />
            </span>

            <span className="font-black">
              معلومات المستخدم
            </span>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                اسم المستخدم
              </p>

              <p className="mt-1 font-black">
                {user?.slug || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                الحالة
              </p>

              <p className="mt-1 font-black text-violet-700 dark:text-violet-400">
                {active ? "نشط" : "غير نشط"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                الصلاحية
              </p>

              <p className="mt-1 font-black">
                {role || "-"}
              </p>
            </div>
          </div>
        </div>

        {updateError && (
          <p className="mt-4 text-sm font-bold text-red-500">
            {updateError}
          </p>
        )}

        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-5 py-3 font-black dark:border-slate-700 dark:bg-slate-900"
          >
            إلغاء
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded-2xl bg-violet-700 px-6 py-3.5 font-black text-white"
          >
            حفظ التعديلات
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManageUpdateUser;

