import { useDispatch } from "react-redux";

import { deleteReview } from "../../../features/reviews/reviewSlice";

function ManageReviewCard({ review, onDeleted }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteReview(review._id)).unwrap();

      if (onDeleted) {
        onDeleted();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800">
      <td className="px-5 py-4">
        <div>
          <p className="font-black">{review?.user?.name || "مستخدم"}</p>

          <div className="mt-1 text-amber-500">★ {review?.ratings || 0}</div>
        </div>
      </td>

      <td className="px-5 py-4 text-slate-500 dark:text-slate-300">
        {review?.title}
      </td>

      <td className="px-5 py-4">
        <button
          type="button"
          onClick={handleDelete}
          className="cursor-pointer rounded-xl bg-rose-50 px-3 py-2 font-black text-rose-600"
        >
          حذف
        </button>
      </td>
    </tr>
  );
}

export default ManageReviewCard;
