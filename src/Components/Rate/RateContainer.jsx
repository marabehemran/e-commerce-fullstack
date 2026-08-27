import React from "react";
import RatePost from "./RatePost";
import RateItem from "./RateItem";
import Pagination from "../Utility/Pagination";

function RateContainer() {
  return (
    <div className="mt-16 border-t border-slate-200 pt-10 dark:border-slate-800 rounded-3xl bg-slate-900 p-5">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-black">التقيمات</h2>
        <span className="flex items-center gap-1 font-black text-amber-500">
          4.3 ★
        </span>
        <span className="text-sm text-slate-400">160 تقييم</span>
      </div>
      <RatePost />
      <RateItem />
      <RateItem />
      <RateItem />
      <RateItem />

      <Pagination />
    </div>
  );
}

export default RateContainer;
