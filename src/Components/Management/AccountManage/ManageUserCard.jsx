import React from "react";
import { Link } from "react-router-dom";

function ManageUserCard() {
  return (
    <tr className="border-b border-slate-100 dark:border-slate-800">
      <td className="px-5 py-4 font-black">Ahmed Abdullah</td>
      <td className="px-5 py-4 text-slate-500">user • ahmed@gmail.com</td>
      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          <Link to="/manageupdateaccout">
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

export default ManageUserCard;
