import { Laptop } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function ManageProductsCard() {
  return (
    <div className="tilt overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="grid h-48 place-items-center bg-slate-50 dark:bg-slate-800">
        <span className="text-[110px] text-sky-700">
          <Laptop />
        </span>
      </div>
      <div className="p-5">
        لابتوب خفيف
        <div className="mt-2 flex justify-between text-sm text-slate-500">
          <span>2,299 ₪</span>
          <span>12 بالمخزون</span>
        </div>
        <div className="mt-5 flex gap-2">
          <Link to="/manageupdateproduct">
            <button className="rounded-xl bg-violet-50 px-3 py-2 font-black text-violet-700 cursor-pointer">
              تعديل
            </button>
          </Link>
          <button className="rounded-xl bg-rose-50 px-3 py-2 font-black text-rose-600 cursor-pointer">
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageProductsCard;
