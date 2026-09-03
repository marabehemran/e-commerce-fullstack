import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ManageReviewCard from "./ManageReviewCard";
import ManagementTable from "../ManagementTable";
import Pagination from "../../Utility/Pagination";

import { MessageSquareText } from "lucide-react";

import { getReviews } from "../../../features/reviews/reviewSlice";

function ManagementAllReviews() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

  const { reviews, paginationResult, loading, error } = useSelector(
    (state) => state.reviews,
  );

  useEffect(() => {
    dispatch(
      getReviews({
        page: currentPage,
        limit: 10,
        keyword: searchKeyword,
      }),
    );
  }, [dispatch, currentPage, searchKeyword]);

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  };

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

      <ManagementTable
        searchValue={searchKeyword}
        onSearchChange={handleSearchChange}
      >
        {reviews.map((review) => (
          <ManageReviewCard key={review._id} review={review} />
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

export default ManagementAllReviews;
