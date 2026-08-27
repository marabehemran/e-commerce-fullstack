import { Camera, Info, UserCog } from "lucide-react";
import React from "react";

function ManageUpdateUser() {
  return (
    <div >

      <div className="mb-6 flex items-center justify-between">

        <div>
          <small className="font-black text-violet-600">
            إدارة المستخدمين
          </small>

          <h1 className="mt-1 flex items-center gap-2 text-3xl font-black">
            <span className="text-violet-600">
              <UserCog/>
            </span>

            تعديل المستخدم
          </h1>
        </div>

        <button
          type="button"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black dark:border-slate-700 dark:bg-slate-900"
        >
          رجوع
        </button>

      </div>


      <form className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">

        <div className="grid gap-5 md:grid-cols-2">

          <label className="cursor-pointer rounded-[26px] border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-800 md:col-span-2">

            <div className="flex justify-center">

              <img
                src="https://i.pravatar.cc/300?img=12"
                alt="User"
                className="h-28 w-28 rounded-full object-cover"
              />

            </div>

            <span className="mt-4 text-4xl text-violet-600">
              <Camera/>
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
              hidden
            />

          </label>


          <div>

            <label className="mb-2 block font-black">
              الاسم
            </label>

            <input
              type="text"
              defaultValue="Ahmed Mohammed"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />

          </div>


          <div>

            <label className="mb-2 block font-black">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              defaultValue="ahmed@example.com"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />

          </div>


          <div>

            <label className="mb-2 block font-black">
              رقم الهاتف
            </label>

            <input
              type="tel"
              defaultValue="0591234567"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />

          </div>


          <div>

            <label className="mb-2 block font-black">
              الصلاحية
            </label>

            <select
              defaultValue="user"
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
              defaultValue="active"
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
              <Info/>
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
                ahmed-mohammed
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                الحالة
              </p>

              <p className="mt-1 font-black text-violet-700 dark:text-violet-400">
                نشط
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                الصلاحية
              </p>

              <p className="mt-1 font-black">
                User
              </p>
            </div>

          </div>

        </div>


        <div className="mt-5 flex flex-wrap justify-end gap-3">

          <button
            type="button"
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-black dark:border-slate-700 dark:bg-slate-900"
          >
            إلغاء
          </button>

          <button
            type="submit"
            className="rounded-2xl bg-violet-700 px-6 py-3.5 font-black text-white"
          >
            حفظ التعديلات
          </button>

        </div>

      </form>

    </div>
  );
}

export default ManageUpdateUser;