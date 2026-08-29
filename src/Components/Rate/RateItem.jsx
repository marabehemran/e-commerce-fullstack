import React from "react";

function RateItem({ review }) {
  return (
    <div className=" dark:divide-slate-800">
      <hr />

      <div className="py-5">
        <div className="flex items-center gap-2 font-black">
          <span>{review?.user?.name}</span>

          <span className="text-amber-500">{review?.ratings} ★</span>
        </div>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {review?.title}
        </p>
      </div>
    </div>
  );
}

export default RateItem;
