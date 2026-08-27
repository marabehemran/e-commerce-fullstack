import React from "react";
import { Heart } from "lucide-react";
import mobile from "../../images/mobile1.png";
import { Link } from "react-router-dom";

function ProductCard() {
  return (
    <div className="overflow-hidden group rounded-[28px] border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="relative grid h-56 place-items-center overflow-hidden bg-slate-50 dark:bg-slate-800">
        <span className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-white">
          -12%
        </span>
        <button className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white shadow hover:text-rose-500 dark:bg-slate-900">
          <span>
            <Heart />
          </span>
        </button>
        <span className=" text-[125px] text-slate-800 transition duration-500 group-hover:scale-110 dark:text-slate-200">
          <Link to="/products/:id">
            <img src={mobile} className="h-full w-full object-cover" />
          </Link>
        </span>
        <button className="absolute inset-x-4 bottom-4 translate-y-20 rounded-2xl bg-slate-950 py-3 font-black text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 hover:bg-violet-700">
          <span>إضافة للسلة</span>
        </button>
      </div>
      <div className="p-5">
        <small className="font-black text-violet-600">
          <span>هواتف</span>
        </small>
        <h3 className="mt-2 min-h-[10px] font-black">
          <span>هاتف عصري و جميل للتصوير</span>
        </h3>
        <div className="mt-3 text-amber-500">
          ★ <b>4.8</b> <small className="text-slate-400">(89)</small>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <b className="text-xl">2,299 ₪</b>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
            <span>متوفر</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
