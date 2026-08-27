import { Laptop } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function ShowOrderCard() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex justify-between">
        <b className="text-xl">#234401</b>
        <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-black">
          تم التسليم
        </span>
      </div>
      <div className="mt-4 grid gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800 md:grid-cols-[90px_1fr_auto] md:items-center">
        <div className="grid h-20 place-items-center rounded-xl bg-white dark:bg-slate-900">
          <span className="text-5xl">
            <Laptop />
          </span>
        </div>
        <div>
          <b>لابتوب خفيف</b>
          <p className="text-sm text-slate-500">الكمية: 1</p>
        </div>
        <b>2,299 ₪</b>
      </div>
      <div className="mt-4 grid gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800 md:grid-cols-[90px_1fr_auto] md:items-center">
        <div className="grid h-20 place-items-center rounded-xl bg-white dark:bg-slate-900">
          <span className="text-5xl">
            <Laptop />
          </span>
        </div>
        <div>
          <b>لابتوب خفيف</b>
          <p className="text-sm text-slate-500">الكمية: 1</p>
        </div>
        <b>2,299 ₪</b>
      </div>
      <div className="mt-4 grid gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800 md:grid-cols-[90px_1fr_auto] md:items-center">
        <div className="grid h-20 place-items-center rounded-xl bg-white dark:bg-slate-900">
          <span className="text-5xl">
            <Laptop />
          </span>
        </div>
        <div>
          <b>لابتوب خفيف</b>
          <p className="text-sm text-slate-500">الكمية: 1</p>
        </div>
        <b>2,299 ₪</b>
      </div>
      <Link to="/user/ordersdetalies">
        <button className="mt-4 rounded-2xl bg-slate-950 px-5 py-3 font-black text-white transition hover:bg-violet-700">
          عرض تفاصيل الطلب
        </button>
      </Link>
    </div>
  );
}

export default ShowOrderCard;
