import React from "react";

import {
  LayoutGrid,
} from "lucide-react";

function CategoryHeader({
  categories,
  subCategories,

  selectedCategory,
  selectedSubCategory,

  onCategoryChange,
  onSubCategoryChange,
}) {
  return (
    <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

      <div className="mx-auto max-w-7xl px-4">

        <div className="flex items-center gap-2 overflow-x-auto py-3">

          <div className="ml-2 flex shrink-0 items-center gap-2 text-sm font-black text-slate-400">
            <LayoutGrid />
            التصنيفات
          </div>

          <button
            type="button"
            onClick={() =>
              onCategoryChange("")
            }
            className={`shrink-0 cursor-pointer rounded-2xl px-5 py-2.5 text-sm font-black ${
              selectedCategory === ""
                ? "bg-slate-950 text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            كل المنتجات
          </button>

          {categories.map(
            (category) => (
              <button
                key={
                  category._id
                }
                type="button"
                onClick={() =>
                  onCategoryChange(
                    category._id,
                  )
                }
                className={`shrink-0 cursor-pointer rounded-2xl px-5 py-2.5 text-sm font-black ${
                  selectedCategory ===
                  category._id
                    ? "bg-slate-950 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {category.name}
              </button>
            ),
          )}

        </div>

        {selectedCategory && (
          <div className="border-t border-slate-100 py-3 dark:border-slate-800">

            <div className="flex items-center gap-2 overflow-x-auto">

              <span className="ml-2 shrink-0 text-xs font-black text-slate-400">
                التصنيفات الفرعية
              </span>

              <button
                type="button"
                onClick={() =>
                  onSubCategoryChange(
                    "",
                  )
                }
                className={`shrink-0 cursor-pointer rounded-2xl px-5 py-2.5 text-sm font-black ${
                  selectedSubCategory ===
                  ""
                    ? "bg-violet-100 text-violet-700"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                الكل
              </button>

              {subCategories.map(
                (subCategory) => (
                  <button
                    key={
                      subCategory._id
                    }
                    type="button"
                    onClick={() =>
                      onSubCategoryChange(
                        subCategory._id,
                      )
                    }
                    className={`shrink-0 cursor-pointer rounded-2xl px-5 py-2.5 text-sm font-black ${
                      selectedSubCategory ===
                      subCategory._id
                        ? "bg-violet-100 text-violet-700"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {
                      subCategory.name
                    }
                  </button>
                ),
              )}

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default CategoryHeader;