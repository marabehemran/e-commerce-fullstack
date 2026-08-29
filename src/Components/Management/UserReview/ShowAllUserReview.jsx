import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserReviewCard from "./UserReviewCard";
import Pagination from "../../Utility/Pagination";

import { getUserReviews } from "../../../features/reviews/reviewSlice";

function ShowAllUserReview() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useSelector((state) => state.auth);

  const { reviews, paginationResult, loading, error } = useSelector(
    (state) => state.reviews,
  );

  useEffect(() => {
    if (user?._id) {
      dispatch(
        getUserReviews({
          userId: user._id,
          page: currentPage,
          limit: 10,
        }),
      );
    }
  }, [dispatch, user?._id, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black">تقييماتي</h1>

      {loading && <p>جاري تحميل التقييمات...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && reviews.length === 0 && <p>لا يوجد لديك تقييمات حتى الآن</p>}

      {!loading &&
        reviews.map((review) => (
          <UserReviewCard key={review._id} review={review} />
        ))}

      <Pagination
        currentPage={currentPage}
        numberOfPages={paginationResult?.numberOfPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ShowAllUserReview;
