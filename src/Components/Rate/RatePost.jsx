import React, { useState } from "react";
import { Star } from "lucide-react";

function RatePost() {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <div className="mt-6 flex items-center gap-3">
        <span className="font-black">علي محمد</span>

        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={25}
              onClick={() => setRating(star)}
              className={`cursor-pointer ${
                star <= rating
                  ? "fill-amber-500 text-amber-500"
                  : "text-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700">
        <textarea
          className="w-full resize-none bg-transparent p-5 outline-none"
          rows="3"
          placeholder="اكتب تعليقك..."
        ></textarea>
      </div>

      <button className="mt-4 mb-5 rounded-2xl bg-slate-950 px-6 py-3 font-black text-white hover:bg-violet-700">
        أضف تعليق
      </button>
    </div>
  );
}

export default RatePost;
