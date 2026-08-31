import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import RatePost from "./RatePost";
import RateItem from "./RateItem";
import Pagination from "../Utility/Pagination";

import { getProductReviews } from "../../features/reviews/reviewSlice";

function RateContainer({ product }) {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const { reviews, paginationResult, loading, error } = useSelector(
    (state) => state.reviews,
  );

  useEffect(() => {
    if (product?._id) {
      dispatch(
        getProductReviews({
          productId: product._id,
          page: currentPage,
          limit: 5,
        }),
      );
    }
  }, [dispatch, product?._id, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-16 border-t border-slate-200 pt-10 dark:border-slate-800 rounded-3xl bg-slate-900 p-5">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-black">التقيمات</h2>

        <span className="flex items-center gap-1 font-black text-amber-500">
          {product?.ratingsAverage || 0} ★
        </span>

        <span className="text-sm text-slate-400">
          {product?.ratingsQuantity || 0} تقييم
        </span>
      </div>

      <RatePost productId={product?._id} />

      {loading && (
        <p className="py-5 text-slate-400">جاري تحميل التقييمات...</p>
      )}

      {error && <p className="py-5 text-red-500">{error}</p>}

      {!loading &&
        reviews.map((review) => <RateItem key={review._id} review={review} />)}

      <Pagination
        currentPage={currentPage}
        numberOfPages={paginationResult?.numberOfPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default RateContainer;
