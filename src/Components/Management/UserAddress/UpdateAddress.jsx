import React from "react";
import { MapPin } from "lucide-react";

function UpdateAddress() {
  return (
    <div >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <small className="font-black text-violet-600">حسابي</small>

          <h1 className="mt-1 flex items-center gap-2 text-3xl font-black">
            <MapPin className="text-violet-600" size={30} />
            تعديل العنوان
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
          <div>
            <label className="mb-2 block font-black">اسم العنوان</label>

            <input
              type="text"
              defaultValue="المنزل"
              placeholder="مثال: المنزل، العمل..."
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-black">رقم الهاتف</label>

            <input
              type="tel"
              defaultValue="0591234567"
              placeholder="رقم الهاتف"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-black">المدينة</label>

            <input
              type="text"
              defaultValue="جنين"
              placeholder="المدينة"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-black">الرمز البريدي</label>

            <input
              type="text"
              defaultValue="00970"
              placeholder="الرمز البريدي"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-black">تفاصيل العنوان</label>

            <textarea
              defaultValue="شارع الجامعة، بالقرب من السوق الرئيسي"
              placeholder="اكتب تفاصيل العنوان بالتفصيل..."
              className="min-h-32 w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-violet-600" />

            <span className="font-black">معاينة العنوان</span>
          </div>

          <div className="mt-3">
            <p className="font-black">المنزل</p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              شارع الجامعة، بالقرب من السوق الرئيسي
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              جنين • 00970 • 0591234567
            </p>
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

export default UpdateAddress;
