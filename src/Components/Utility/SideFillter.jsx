import React from "react";
import { Funnel } from "lucide-react";

function SideFillter() {
  return (
    <div className="h-fit rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-32">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-violet-600">
            <Funnel />
          </span>
          <h2 className="font-black">الفلاتر</h2>
        </div>

        <button className="text-xs font-black text-slate-400">مسح الكل</button>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
        <b>الفئة</b>

        <div className="mt-3 space-y-3 text-sm text-slate-500">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked />
            كل المنتجات
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            الإلكترونيات
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            الملابس
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            الأحذية
          </label>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
        <b>الماركة</b>

        <div className="mt-3 space-y-3 text-sm text-slate-500">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Samsung
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" /> Apple
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" /> Xiaomi
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" /> Nike
          </label>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
        <b>السعر</b>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <input
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
            placeholder="من"
            type="number"
          />

          <input
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
            placeholder="إلى"
            type="number"
          />
        </div>
      </div>
    </div>
  );
}

export default SideFillter;
