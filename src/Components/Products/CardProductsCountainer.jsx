import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SubTitle from "../Utility/SubTitle";
import ProductCard from "./ProductCard";

import { getProducts } from "../../features/products/productSlice";

function CardProductsCountainer({
  title,
  btnTitle,
  pathText,
  shopMode = false,
  shopProducts = [],
  category = "",
  excludeProductId = "",
}) {
  const dispatch = useDispatch();

  const {
    products: reduxProducts,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (shopMode) {
      return;
    }

    if (category) {
      dispatch(
        getProducts({
          page: 1,
          limit: 5,
          category,
        }),
      );
    } else {
      dispatch(
        getProducts({
          page: 1,
          limit: 4,
          sort: "-sold",
        }),
      );
    }
  }, [dispatch, shopMode, category]);

  let products = shopMode ? shopProducts : reduxProducts;

  if (excludeProductId) {
    products = products.filter((product) => product._id !== excludeProductId);
  }

  if (category && products.length > 4) {
    products = products.slice(0, 4);
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-2">
      {!shopMode && (
        <SubTitle title={title} btnTitle={btnTitle} pathText={pathText} />
      )}

      {!shopMode && loading ? (
        <p className="py-10 text-center">جاري تحميل المنتجات...</p>
      ) : !shopMode && error ? (
        <p className="py-10 text-center text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="py-10 text-center text-slate-500">لا توجد منتجات</p>
      ) : (
        <div
          className={
            shopMode
              ? "my-2 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
              : "my-2 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          }
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardProductsCountainer;
