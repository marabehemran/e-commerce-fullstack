import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Pencil, Star } from "lucide-react";

import { getReview, updateReview } from "../../../features/reviews/reviewSlice";

function UpdateReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { review, loading } = useSelector((state) => state.reviews);

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getReview(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (review) {
      setRating(review.ratings || 0);
      setTitle(review.title || "");
    }
  }, [review]);

  const handleSubmit = async () => {
    setUpdateError(null);

    if (!rating) {
      setUpdateError("يرجى اختيار تقييم");
      return;
    }

    try {
      await dispatch(
        updateReview({
          id,
          reviewData: {
            title: title.trim(),
            ratings: rating,
          },
        }),
      ).unwrap();

      navigate("/user/reviews");
    } catch (error) {
      setUpdateError(error);
    }
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <small className="font-black text-violet-600">تعديل التقييم</small>

        <h1 className="mt-1 flex items-center gap-2 text-2xl font-black">
          <Pencil size={25} className="text-violet-600" />
          تعديل تقييمك
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          قم بتعديل تقييمك وتعليقك على المنتج
        </p>
      </div>

      <div className="mb-6 flex items-center gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-700">
          <img
            src={review?.product?.imageCover}
            alt={review?.product?.title || "Product"}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h2 className="font-black">{review?.product?.title}</h2>
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-3 block text-sm font-black">تقييمك</label>

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

      <div className="mb-6">
        <label htmlFor="review" className="mb-3 block text-sm font-black">
          تعليقك
        </label>

        <textarea
          id="review"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={5}
          placeholder="اكتب تعليقك..."
          className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-800"
        />
      </div>

      {updateError && (
        <p className="mb-4 text-sm text-red-500">{updateError}</p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => navigate("/user/reviews")}
          className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-black transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          إلغاء
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="cursor-pointer rounded-xl bg-violet-700 px-6 py-3 text-sm font-black text-white transition hover:bg-violet-800"
        >
          {loading ? "جاري الحفظ..." : "حفظ التعديل"}
        </button>
      </div>
    </div>
  );
}

export default UpdateReview;
