import { Package, ListFilter, Search } from "lucide-react";

function SearchCountResult({
  count,
  sort,
  keyword,
  onSortChange,
  onKeywordChange,
}) {
  return (
    <div className="mx-auto my-6 flex max-w-7xl flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 px-4 py-8 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-50 text-violet-700 dark:bg-violet-950/30">
          <Package />
        </div>

        <div>
          <p className="text-xs text-slate-400">المنتجات المتاحة</p>

          <p className="font-black">
            <span>{count || 0}</span> منتج
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder="ابحث عن منتج..."
            className="rounded-2xl border border-slate-200 bg-slate-50 py-3 pr-10 pl-4 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
          />
        </div>

        <span className="flex items-center gap-2 text-sm font-black text-slate-500">
          <ListFilter />
          ترتيب حسب
        </span>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="-createdAt">الأحدث</option>

          <option value="price">السعر: الأقل أولاً</option>

          <option value="-price">السعر: الأعلى أولاً</option>

          <option value="-ratingsAverage">الأعلى تقييماً</option>
        </select>
      </div>
    </div>
  );
}

export default SearchCountResult;
