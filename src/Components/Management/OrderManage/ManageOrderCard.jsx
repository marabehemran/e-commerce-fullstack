import React from "react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

function ManageOrderCard() {
  return (
    <tr className="border-b border-slate-100 dark:border-slate-800">
      <td className="px-5 py-4 font-black">#HS-231231</td>

      <td className="px-5 py-4 text-slate-500">Ahmed • 3,649 ₪ • Cash</td>

      <td className="px-5 py-4">
        <div className="flex min-w-[400px] flex-wrap gap-2">
          <select className="min-w-[175px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-bold dark:border-slate-700 dark:bg-slate-800">
            <option>قيد التنفيذ</option>
            <option>تم التجهيز</option>
            <option>قيد التوصيل</option>
            <option>تم الاستلام</option>
            <option>ملغي</option>
          </select>

          <button
            type="button"
            className="rounded-xl bg-violet-700 px-3 py-2 font-black text-white"
          >
            حفظ الحالة
          </button>
          <Link to="/manageordersdetalies">
            <button
              type="button"
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 font-black dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="text-[20px]">
                <Eye />
              </span>
              المزيد
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default ManageOrderCard;
