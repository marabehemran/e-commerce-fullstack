import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import BrandContainer from "../../Components/Brand/BrandContainer";

import Pagination from "../../Components/Utility/Pagination";

import { getBrands } from "../../features/brands/brandSlice";

function AllBrandPage() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const brands = useSelector(
    (state) => state.brands.brands,
  );

  const paginationResult = useSelector(
    (state) => state.brands.paginationResult,
  );

  useEffect(() => {
    dispatch(getBrands(currentPage));
  }, [currentPage, dispatch]);

  return (
    <div>
      <BrandContainer brands={brands} />

      <Pagination
        currentPage={currentPage}
        numberOfPages={paginationResult?.numberOfPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default AllBrandPage;