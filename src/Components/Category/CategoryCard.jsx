import React from "react";

function CategoryCard({ CategoryImage, CategoryName }) {
  return (
    <div className="flex flex-col items-center py-3 h-35 place-items-center rounded-[24px] border border-slate-200 bg-white text-2xl font-black shadow-soft dark:border-slate-800 dark:bg-slate-900 transition duration-300 hover:-translate-y-1 hover:scale-105">

      <p className="h-22 ">

        <img
          src={CategoryImage}
          alt={CategoryName}
          className="w-22 h-22"
        />

      </p>

      <p>{CategoryName}</p>

    </div>
  );
}

export default CategoryCard;