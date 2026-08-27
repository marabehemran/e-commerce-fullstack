import React from "react";

import CategoryContainer from "../../Components/Category/CategoryContainer";
import Pagination from "../../Components/Utility/Pagination";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategories } from "../../features/categories/categorySlice";

function AllCategoryPage() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const categories = useSelector(
    (state) => state.categories.categories
  );

  const paginationResult = useSelector(
    (state) => state.categories.paginationResult
  );

  useEffect(() => {
    dispatch(getCategories(currentPage));
  }, [currentPage, dispatch]);

  return (
    <div>
      <CategoryContainer categories={categories} />

      <Pagination
        currentPage={currentPage}
        numberOfPages={paginationResult?.numberOfPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default AllCategoryPage;