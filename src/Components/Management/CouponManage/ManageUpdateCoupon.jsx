import { Info, Ticket } from "lucide-react";
import React from "react";

function ManageUpdateCoupon() {
  return (
    <div>

      <div className="mb-6 flex items-center justify-between">

        <div>
          <small className="font-black text-violet-600">
            إدارة المتجر
          </small>

          <h1 className="mt-1 flex items-center gap-2 text-3xl font-black">
            <span className="text-violet-600">
              <Ticket/>
            </span>

            تعديل الكوبون
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

          <div className="md:col-span-2">

            <label className="mb-2 block font-black">
              اسم الكوبون
            </label>

            <input
              type="text"
              defaultValue="SUMMER25"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              اسم الكوبون الذي سيستخدمه العميل عند إتمام الطلب.
            </p>

          </div>


          <div>

            <label className="mb-2 block font-black">
              نسبة الخصم
            </label>

            <div className="relative">

              <input
                type="number"
                defaultValue="25"
                className="w-full rounded-2xl border p-3.5 pe-12 dark:border-slate-700 dark:bg-slate-800"
              />

              <span className="absolute end-4 top-1/2 -translate-y-1/2 font-black text-slate-400">
                %
              </span>

            </div>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              قيمة الخصم بالنسبة المئوية.
            </p>

          </div>


          <div>

            <label className="mb-2 block font-black">
              تاريخ انتهاء الكوبون
            </label>

            <input
              type="date"
              defaultValue="2026-12-31"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              بعد هذا التاريخ لن يكون الكوبون صالحًا للاستخدام.
            </p>

          </div>

        </div>


        <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">

          <div className="flex items-center gap-2">

            <span className="text-violet-600">
              <Info/>
            </span>

            <span className="font-black">
              معلومات الكوبون الحالية
            </span>

          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                الكود
              </p>

              <p className="mt-1 font-black">
                SUMMER25
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                الخصم
              </p>

              <p className="mt-1 font-black">
                25%
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                الانتهاء
              </p>

              <p className="mt-1 font-black">
                31/12/2026
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

export default ManageUpdateCoupon;