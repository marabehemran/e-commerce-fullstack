import React, { useState } from "react";
import { LayoutGrid } from "lucide-react";

function CategoryHeader() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categoryData = {
    electronics: {
      name: "الإلكترونيات",
      subCategories: [
        "الكل",
        "هواتف",
        "لابتوبات",
        "سماعات",
        "ساعات ذكية",
        "أجهزة لوحية",
        "إكسسوارات",
      ],
    },

    fashion: {
      name: "الملابس",
      subCategories: [
        "الكل",
        "ملابس رجالية",
        "ملابس نسائية",
        "ملابس أطفال",
        "جاكيتات",
        "قمصان",
        "بناطيل",
      ],
    },

    shoes: {
      name: "الأحذية",
      subCategories: [
        "الكل",
        "أحذية رياضية",
        "أحذية رجالية",
        "أحذية نسائية",
        "أحذية أطفال",
        "صنادل",
        "بوت",
      ],
    },
  };

  return (
    <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4">

        <div className="flex items-center gap-2 overflow-x-auto py-3">

          <div className="ml-2 flex shrink-0 items-center gap-2 text-sm font-black text-slate-400">
            <LayoutGrid  />
            التصنيفات
          </div>

          <button
            onClick={() => setSelectedCategory("all")}
            className={`shrink-0 rounded-2xl px-5 py-2.5 text-sm font-black ${
              selectedCategory === "all"
                ? "bg-slate-950 text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            كل المنتجات
          </button>

          <button
            onClick={() => setSelectedCategory("electronics")}
            className={`shrink-0 rounded-2xl px-5 py-2.5 text-sm font-black ${
              selectedCategory === "electronics"
                ? "bg-slate-950 text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            الإلكترونيات
          </button>

          <button
            onClick={() => setSelectedCategory("fashion")}
            className={`shrink-0 rounded-2xl px-5 py-2.5 text-sm font-black ${
              selectedCategory === "fashion"
                ? "bg-slate-950 text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            الملابس
          </button>

          <button
            onClick={() => setSelectedCategory("shoes")}
            className={`shrink-0 rounded-2xl px-5 py-2.5 text-sm font-black ${
              selectedCategory === "shoes"
                ? "bg-slate-950 text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            الأحذية
          </button>

        </div>



        {selectedCategory !== "all" && (
          <div className="border-t border-slate-100 py-3 dark:border-slate-800">

            <div className="flex items-center gap-2 overflow-x-auto">

              <span className="ml-2 shrink-0 text-xs font-black text-slate-400">
                التصنيفات الفرعية
              </span>

              {categoryData[selectedCategory].subCategories.map(
                (subCategory) => (
                  <button
                    key={subCategory}
                    className="shrink-0 rounded-2xl px-5 py-2.5 text-sm font-black text-slate-500 hover:bg-slate-100"
                  >
                    {subCategory}
                  </button>
                )
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default CategoryHeader;