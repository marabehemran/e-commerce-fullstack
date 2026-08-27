import React from "react";
import ManageCouponCard from "./ManageCouponCard";
import {  Ticket } from "lucide-react";
import ManagementTable from "../ManagementTable";
function ManagementAllCoupons() {
  return (
    <div >
      <div className="mb-6">
        <small className="font-black text-violet-600">
            إدارة المتجر
        </small>
        <h1 className="mt-1 text-3xl font-black">
          <span className="text-violet-600">
            <Ticket/>
          </span>
            الكوبونات
        </h1>
      </div>
      <details className="mb-5 rounded-[28px] border border-violet-200 bg-white p-5 shadow-soft dark:border-violet-900 dark:bg-slate-900">
        <summary className="cursor-pointer font-black text-violet-700">
            إضافة جديد
        </summary>
        <form className="mt-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block font-black">اسم الكوبون</label>

              <input
                type="text"
           
                placeholder="اسم الكوبون"
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="mb-2 block font-black">نسبة الخصم</label>

              <div className="relative">
                <input
                  type="number"
      
                  placeholder="نسبة الخصم"
                  className="w-full rounded-2xl border p-3.5 pe-12 dark:border-slate-700 dark:bg-slate-800"
                />

                <span className="absolute end-4 top-1/2 -translate-y-1/2 font-black text-slate-400">
                  %
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block font-black">تاريخ الانتهاء</label>

              <input
                type="date"
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 rounded-2xl bg-violet-700 px-6 py-3.5 font-black text-white"
          >
            حفظ
          </button>
        </form>
      </details>
      <ManagementTable>
        <ManageCouponCard/>
        <ManageCouponCard/>
        <ManageCouponCard/>
        <ManageCouponCard/>
        <ManageCouponCard/>

      </ManagementTable>
    </div>
  );
}

export default ManagementAllCoupons;
