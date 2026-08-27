import React from "react";
import { MapPin, Phone, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function ShowAddressCard() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-50 dark:bg-slate-800">
            <MapPin className="text-violet-600" size={24} />
          </div>

          <div>
            <h2 className="font-black">المنزل</h2>

            <span className="text-sm text-slate-500 dark:text-slate-400">
              العنوان الرئيسي
            </span>
          </div>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
          العنوان الأساسي
        </span>
      </div>

      <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">العنوان</p>

          <p className="mt-1 font-bold">
            شارع الجامعة، بالقرب من السوق الرئيسي
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              المدينة
            </p>

            <p className="mt-1 font-bold">جنين</p>
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              الرمز البريدي
            </p>

            <p className="mt-1 font-bold">00970</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Phone size={17} className="text-violet-600" />

          <span className="font-bold">059 123 4567</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link to="/user/updateaddres">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 font-black text-white"
          >
            <Pencil size={17} />
            تعديل
          </button>
        </Link>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-black dark:border-slate-700 dark:bg-slate-900"
        >
          <Trash2 size={17} />
          حذف
        </button>
      </div>
    </div>
  );
}

export default ShowAddressCard;
