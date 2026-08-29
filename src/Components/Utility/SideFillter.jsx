import React from "react";

import { Funnel } from "lucide-react";

function SideFillter({
  categories,
  brands,

  selectedCategory,
  selectedBrand,

  minPrice,
  maxPrice,

  onCategoryChange,
  onBrandChange,

  onMinPriceChange,
  onMaxPriceChange,

  onClearFilters,
}) {
  return (
    <div className="h-fit rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-32">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-violet-600">
            <Funnel />
          </span>

          <h2 className="font-black">الفلاتر</h2>
        </div>

        <button
          type="button"
          onClick={onClearFilters}
          className="cursor-pointer text-xs font-black text-slate-400"
        >
          مسح الكل
        </button>
      </div>

      {/* CATEGORY */}

      <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
        <b>الفئة</b>

        <div className="mt-3 space-y-3 text-sm text-slate-500">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCategory === ""}
              onChange={() => onCategoryChange("")}
            />
            كل المنتجات
          </label>

          {categories.map((category) => (
            <label
              key={category._id}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selectedCategory === category._id}
                onChange={() => onCategoryChange(category._id)}
              />

              {category.name}
            </label>
          ))}
        </div>
      </div>

      {/* BRAND */}

      <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
        <b>الماركة</b>

        <div className="mt-3 space-y-3 text-sm text-slate-500">
          {brands.map((brand) => (
            <label
              key={brand._id}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selectedBrand === brand._id}
                onChange={() =>
                  onBrandChange(selectedBrand === brand._id ? "" : brand._id)
                }
              />

              {brand.name}
            </label>
          ))}
        </div>
      </div>

      {/* PRICE */}

      <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
        <b>السعر</b>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <input
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
            placeholder="من"
            type="number"
          />

          <input
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
            placeholder="إلى"
            type="number"
          />
        </div>
      </div>
    </div>
  );
}

export default SideFillter;
