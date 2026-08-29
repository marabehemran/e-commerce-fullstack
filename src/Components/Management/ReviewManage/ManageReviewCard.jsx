import React from "react";

import { Link } from "react-router-dom";

function ManageReviewCard({ review }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-black">{review?.user?.name || "مستخدم"}</p>

          <div className="mt-2 text-amber-500">★ {review?.ratings || 0}</div>
        </div>

        <Link
          to={`/manager/reviews/${review?._id}`}
          className="rounded-xl bg-violet-700 px-4 py-2 font-black text-white"
        >
          تعديل
        </Link>
      </div>

      <p className="mt-4 text-slate-600 dark:text-slate-300">{review?.title}</p>
    </div>
  );
}

export default ManageReviewCard;
