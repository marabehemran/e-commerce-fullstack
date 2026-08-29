import React, { useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import ManageReviewCard from "./ManageReviewCard";
import ManagementTable from "../ManagementTable";
import Pagination from "../../Utility/Pagination";

import { getReviews } from "../../../features/reviews/reviewSlice";

function ManagementAllReviews() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const { reviews, paginationResult, loading, error } = useSelector(
    (state) => state.reviews,
  );

  useEffect(() => {
    dispatch(
      getReviews({
        page: currentPage,
        limit: 10,
      }),
    );
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="mb-6">
        <small className="font-black text-violet-600">إدارة المتجر</small>

        <h1 className="mt-1 text-3xl font-black">
          <span className="text-violet-600">
            <MessageSquareText />
          </span>
          التقييمات
        </h1>
      </div>

      {loading && <p>جاري تحميل التقييمات...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && reviews.length === 0 && <p>لا يوجد تقييمات</p>}

      {!loading && reviews.length > 0 && (
        <ManagementTable>
          {reviews.map((review) => (
            <ManageReviewCard key={review._id} review={review} />
          ))}
        </ManagementTable>
      )}

      <Pagination
        currentPage={currentPage}
        numberOfPages={paginationResult?.numberOfPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ManagementAllReviews;
