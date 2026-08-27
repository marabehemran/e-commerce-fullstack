import React, { useState } from "react";
import { Pencil, Star } from "lucide-react";

function UpdateReview() {
  const [rating, setRating] = useState(4);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">

      {/* Header */}
      <div className="mb-6">
        <small className="font-black text-violet-600">
          تعديل التقييم
        </small>

        <h1 className="mt-1 flex items-center gap-2 text-2xl font-black">
          <Pencil size={25} className="text-violet-600" />
          تعديل تقييمك
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          قم بتعديل تقييمك وتعليقك على المنتج
        </p>
      </div>


      {/* Product */}
      <div className="mb-6 flex items-center gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">

        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-700">
          <img
            src="https://via.placeholder.com/100"
            alt="Product"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h2 className="font-black">
            لابتوب Dell XPS
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Electronics / Laptops
          </p>
        </div>

      </div>


      {/* Rating */}
      <div className="mb-6">

        <label className="mb-3 block text-sm font-black">
          تقييمك
        </label>

        <div className="flex gap-1">

          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="transition hover:scale-110"
            >
              <Star
                size={28}
                className={
                  star <= rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300 dark:text-slate-600"
                }
              />
            </button>
          ))}

          <span className="ms-2 flex items-center text-sm font-black text-amber-500">
            {rating}.0
          </span>

        </div>

      </div>


      {/* Comment */}
      <div className="mb-6">

        <label
          htmlFor="review"
          className="mb-3 block text-sm font-black"
        >
          تعليقك
        </label>

        <textarea
          id="review"
          defaultValue="منتج ممتاز وسريع والتغليف جيد جدًا."
          rows={5}
          placeholder="اكتب تعليقك..."
          className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-800"
        />

      </div>


      {/* Actions */}
      <div className="flex flex-wrap gap-3">

        <button
          type="button"
          className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-black transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          إلغاء
        </button>

        <button
          type="button"
          className="rounded-xl bg-violet-700 px-6 py-3 text-sm font-black text-white transition hover:bg-violet-800"
        >
          حفظ التعديل
        </button>

      </div>

    </div>
  );
}

export default UpdateReview;