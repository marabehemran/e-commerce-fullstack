import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserReviewCard from "./UserReviewCard";
import Pagination from "../../Utility/Pagination";
import ManagementTable from "../ManagementTable";

import { getUserReviews } from "../../../features/reviews/reviewSlice";

function ShowAllUserReview() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

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
          keyword: searchKeyword,
        }),
      );
    }
  }, [dispatch, user?._id, currentPage, searchKeyword]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value) => {
    setSearchKeyword(value);

    setCurrentPage(1);
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black">تقييماتي</h1>

      {loading && <p className="mb-4">جاري تحميل التقييمات...</p>}

      {error && <p className="mb-4 text-red-500">{error}</p>}

      <ManagementTable
        searchValue={searchKeyword}
        onSearchChange={handleSearchChange}
      >
        {reviews.map((review) => (
          <UserReviewCard key={review._id} review={review} />
        ))}
      </ManagementTable>

      <Pagination
        currentPage={currentPage}
        numberOfPages={paginationResult?.numberOfPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ShowAllUserReview;
