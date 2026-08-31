import { Link } from "react-router-dom";

import { MapPin, Phone, Pencil, Trash2 } from "lucide-react";

function ShowAddressCard({ address, onDelete }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 dark:bg-slate-800">
            <MapPin size={24} className="text-violet-600" />
          </div>

          <div>
            <h2 className="font-black">{address.alias}</h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              عنوان الشحن
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
        <div>
          <p className="text-sm text-slate-500">العنوان</p>

          <p className="font-bold">{address.details}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">المدينة</p>

            <p className="font-bold">{address.city}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">الرمز البريدي</p>

            <p className="font-bold">{address.postalCode || "غير محدد"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Phone size={17} className="text-violet-600" />

          <span className="font-bold">{address.phone}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/user/updateaddres/${address._id}`}
          className="flex items-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 font-black text-white"
        >
          <Pencil size={17} />
          تعديل
        </Link>

        <button
          type="button"
          onClick={() => onDelete(address._id)}
          className="cursor-pointer flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 font-black dark:border-slate-700"
        >
          <Trash2 size={17} />
          حذف
        </button>
      </div>
    </div>
  );
}

export default ShowAddressCard;
