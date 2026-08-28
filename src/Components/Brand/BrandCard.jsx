import React from "react";

function BrandCard({ BrandImage, BrandName }) {
  return (
    <div className="flex h-35 flex-col place-items-center items-center rounded-3xl border border-slate-200 bg-white py-3 text-2xl font-black shadow-soft transition duration-300 hover:-translate-y-1 hover:scale-105 dark:border-slate-800 dark:bg-slate-900">
      <p className="h-22">
        <img
          src={BrandImage}
          alt={BrandName}
          className="h-22 w-22 object-contain"
        />
      </p>

      <p>{BrandName}</p>
    </div>
  );
}

export default BrandCard;