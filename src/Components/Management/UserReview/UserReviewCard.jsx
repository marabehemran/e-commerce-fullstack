import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteReview } from "../../../features/reviews/reviewSlice";

function UserReviewCard({ review }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteReview(review._id)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800">
      <td className="px-5 py-4 font-black">
        {review?.user?.name} — {review?.ratings} ★
      </td>

      <td className="px-5 py-4 text-slate-500">{review?.title}</td>

      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          <Link to={`/user/updatereview/${review._id}`}>
            <button className="rounded-xl bg-violet-50 px-3 py-2 font-black text-violet-700 cursor-pointer">
              تعديل
            </button>
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-rose-50 px-3 py-2 font-black text-rose-600"
          >
            حذف
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UserReviewCard;
