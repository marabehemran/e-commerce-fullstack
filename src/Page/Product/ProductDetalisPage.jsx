import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import ProductDetalis from "../../Components/Products/ProductDetalis";

import { getProduct } from "../../features/products/productSlice";

import { getAllBrands } from "../../features/brands/brandSlice";

function ProductDetalisPage() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { product, loading, error } = useSelector((state) => state.products);

  const brands = useSelector((state) => state.brands.allBrands);

  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getAllBrands());
  }, [dispatch, id]);

  if (loading && (!product || product._id !== id)) {
    return <p className="py-10 text-center">جاري تحميل المنتج...</p>;
  }

  if (error) {
    return <p className="py-10 text-center text-red-500">{error}</p>;
  }

  if (!product) {
    return null;
  }

  return (
    <div>
      <ProductDetalis product={product} brands={brands} />
    </div>
  );
}

export default ProductDetalisPage;
