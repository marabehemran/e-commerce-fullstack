import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import CategoryHeader from "../../Components/Category/CategoryHeader";
import SearchCountResult from "../../Components/Utility/SearchCountResult";
import SideFillter from "../../Components/Utility/SideFillter";
import CardProductsCountainer from "../../Components/Products/CardProductsCountainer";
import Pagination from "../../Components/Utility/Pagination";

import { getProducts } from "../../features/products/productSlice";
import { getAllCategories } from "../../features/categories/categorySlice";
import { getAllBrands } from "../../features/brands/brandSlice";
import { getSubCategoriesByCategory } from "../../features/subCategories/subCategorySlice";

function ShopProductPage() {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("-createdAt");

  const { products, paginationResult, loading } = useSelector(
    (state) => state.products,
  );

  const categories = useSelector((state) => state.categories.allCategories);

  const brands = useSelector((state) => state.brands.allBrands);

  const subCategories = useSelector(
    (state) => state.subCategories.categorySubCategories,
  );

  useEffect(() => {
    dispatch(getAllCategories());

    dispatch(getAllBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getProducts({
        page: currentPage,
        limit: 9,
        keyword,
        category,
        subCategory,
        brand,
        minPrice,
        maxPrice,
        sort,
      }),
    );
  }, [
    dispatch,
    currentPage,
    keyword,
    category,
    subCategory,
    brand,
    minPrice,
    maxPrice,
    sort,
  ]);

  const handleCategoryChange = (categoryId) => {
    setCategory(categoryId);
    setSubCategory("");
    setCurrentPage(1);

    if (categoryId) {
      dispatch(getSubCategoriesByCategory(categoryId));
    }
  };

  const handleSubCategoryChange = (subCategoryId) => {
    setSubCategory(subCategoryId);

    setCurrentPage(1);
  };

  const handleBrandChange = (brandId) => {
    setBrand(brandId);

    setCurrentPage(1);
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);

    setCurrentPage(1);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);

    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);

    setCurrentPage(1);
  };

  const handleKeywordChange = (value) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      newSearchParams.set("keyword", value);
    } else {
      newSearchParams.delete("keyword");
    }

    setSearchParams(newSearchParams);

    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setCategory("");
    setSubCategory("");
    setBrand("");
    setMinPrice("");
    setMaxPrice("");
    setSort("-createdAt");
    setCurrentPage(1);

    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete("keyword");

    setSearchParams(newSearchParams);
  };

  return (
    <div>
      <CategoryHeader
        categories={categories}
        subCategories={subCategories}
        selectedCategory={category}
        selectedSubCategory={subCategory}
        onCategoryChange={handleCategoryChange}
        onSubCategoryChange={handleSubCategoryChange}
      />

      <SearchCountResult
        count={paginationResult?.totalDocuments || products.length}
        sort={sort}
        keyword={keyword}
        onSortChange={handleSortChange}
        onKeywordChange={handleKeywordChange}
      />

      <div className="mx-auto mt-6 grid max-w-7xl gap-6 px-4 lg:grid-cols-[1fr_280px]">
        <div>
          {loading ? (
            <p className="py-10 text-center">جاري تحميل المنتجات...</p>
          ) : products.length > 0 ? (
            <CardProductsCountainer shopMode={true} shopProducts={products} />
          ) : (
            <p className="py-10 text-center font-black text-slate-500">
              لا توجد منتجات مطابقة
            </p>
          )}

          <Pagination
            currentPage={currentPage}
            numberOfPages={paginationResult?.numberOfPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <SideFillter
          categories={categories}
          brands={brands}
          selectedCategory={category}
          selectedBrand={brand}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
          onClearFilters={handleClearFilters}
        />
      </div>
    </div>
  );
}

export default ShopProductPage;
