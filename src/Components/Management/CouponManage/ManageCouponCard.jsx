import React from "react";
import { Link } from "react-router-dom";

function ManageCouponCard() {
  return (
    <tr className="border-b border-slate-100 dark:border-slate-800">
      <td className="px-5 py-4 font-black">WELCOME20</td>
      <td className="px-5 py-4 text-slate-500">20% • 2026-09-01</td>
      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          <Link to="/manageupdatecoupon">
            <button className="rounded-xl bg-violet-50 px-3 py-2 font-black text-violet-700">
              تعديل
            </button>
          </Link>
          <button className="rounded-xl bg-rose-50 px-3 py-2 font-black text-rose-600">
            حذف
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ManageCouponCard;
