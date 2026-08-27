import React from "react";
import { Package, ListFilter } from "lucide-react";

function SearchCountResult() {
  return (
    <dev className="mx-auto max-w-7xl px-4 py-8 my-6 flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-50 text-violet-700 dark:bg-violet-950/30">
          <span>
            <Package />
          </span>
        </div>

        <div>
          <p className="text-xs text-slate-400">المنتجات المتاحة</p>
          <p className="font-black">
            <span id="toolbarCount">12</span> منتج
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-2 text-sm font-black text-slate-500">
          <ListFilter />
          ترتيب حسب
        </span>

        <select className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold dark:border-slate-700 dark:bg-slate-800">
          <option>الأحدث</option>
          <option>السعر: الأقل أولاً</option>
          <option>السعر: الأعلى أولاً</option>
          <option>الأعلى تقييماً</option>
        </select>
      </div>
    </dev>
  );
}

export default SearchCountResult;
