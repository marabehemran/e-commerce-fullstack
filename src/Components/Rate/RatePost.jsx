import { useState } from "react";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReview,
  getProductReviews,
} from "../../features/reviews/reviewSlice";

function RatePost({ productId }) {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [reviewError, setReviewError] = useState(null);

  const { loading } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    setReviewError(null);

    if (!rating) {
      setReviewError("يرجى اختيار تقييم");
      return;
    }

    try {
      await dispatch(
        createReview({
          productId,
          reviewData: {
            title: title.trim(),
            ratings: rating,
          },
        }),
      ).unwrap();

      setRating(0);
      setTitle("");

      dispatch(
        getProductReviews({
          productId,
          page: 1,
          limit: 5,
        }),
      );
    } catch (error) {
      setReviewError(error);
    }
  };

  return (
    <div>
      <div className="mt-6 flex items-center gap-3">
        <span className="font-black">{user?.name}</span>

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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
      </div>

      {reviewError && (
        <p className="mt-2 text-sm text-red-500">{reviewError}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 mb-5 rounded-2xl bg-slate-950 px-6 py-3 font-black text-white hover:bg-violet-700"
      >
        {loading ? "جاري الإضافة..." : "أضف تعليق"}
      </button>
    </div>
  );
}

export default RatePost;
