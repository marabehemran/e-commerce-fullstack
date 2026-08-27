import React from "react";

function ShowProfileUser() {
  return (
    <dev>
      <h1 className="text-3xl font-black">الملف الشخصي</h1>
      <div className="mt-6 space-y-5">
        <form
          onsubmit="
                event.preventDefault();
                toast('تم حفظ البيانات', 'Profile saved');
              "
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-xl font-black">بيانات الحساب</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              value="أحمد عبدالله"
              className="rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
            <input
              value="0590000000"
              className="rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
            <input
              value="ahmed@gmail.com"
              className="rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800 md:col-span-2"
            />
          </div>
          <button className="mt-4 rounded-2xl bg-slate-950 px-5 py-3 font-black text-white">
            حفظ
          </button>
        </form>
        <form
          onsubmit="
                event.preventDefault();
                toast('تم تغيير كلمة المرور', 'Password changed');
              "
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-xl font-black">تغيير كلمة المرور</h2>
          <input
            type="password"
            className="mt-4 w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            placeholder="كلمة المرور الحالية"
          />
          <input
            type="password"
            className="mt-3 w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            placeholder="كلمة المرور الجديدة"
          />
          <button className="mt-4 rounded-2xl bg-violet-700 px-5 py-3 font-black text-white">
            تغيير
          </button>
        </form>
        <button
          className="font-black text-rose-600"
        >
          تعطيل الحساب
        </button>
      </div>
    </dev>
  );
}

export default ShowProfileUser;
