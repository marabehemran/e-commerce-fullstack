import React from "react";
import ManageBrandCard from "./ManageBrandCard";
import { GitBranch, ImagePlus } from "lucide-react";
import ManagementTable from "../ManagementTable";
function ManagementAllBrands() {
  return (
    <div >
      <div className="mb-6">
        <small className="font-black text-violet-600">
            إدارة المتجر
        </small>
        <h1 className="mt-1 text-3xl font-black">
          <span className="text-violet-600">
            <GitBranch/>
          </span>
            الماركات
        </h1>
      </div>
      <details className="mb-5 rounded-[28px] border border-violet-200 bg-white p-5 shadow-soft dark:border-violet-900 dark:bg-slate-900">
        <summary className="cursor-pointer font-black text-violet-700">
            إضافة جديد
        </summary>
        <form className="mt-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="cursor-pointer rounded-[26px] border-2 border-dashed border-slate-300 bg-slate-50 p-7 text-center dark:border-slate-700 dark:bg-slate-800">
              <span className="text-6xl text-violet-600">
                <ImagePlus/>
              </span>

              <b className="mt-2 block">إضافة صورة الماركة</b>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                اختر صورة مناسبة للماركة 
              </p>

              <input type="file" accept="image/*" hidden />
            </label>

            <div className="flex flex-col justify-center">
              <label className="mb-2 block font-black">
                اسم الماركة
              </label>

              <input
                type="text"
           
                placeholder="اسم التصنيف الفرعي"
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              />

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                أدخل اسم  الماركة الذي سيظهر للمستخدمين
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 rounded-2xl bg-violet-700 px-5 py-3 font-black text-white"
          >
           
              إضافة الماركة 
          </button>
        </form>
      </details>
     <ManagementTable>
      <ManageBrandCard/>
      <ManageBrandCard/>
      <ManageBrandCard/>
      <ManageBrandCard/>
      <ManageBrandCard/>
      <ManageBrandCard/>
     </ManagementTable>
    </div>
  );
}

export default ManagementAllBrands;
