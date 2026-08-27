import React from "react";
import CategoryHeader from "../../Components/Category/CategoryHeader";
import SearchCountResult from "../../Components/Utility/SearchCountResult";
import SideFillter from "../../Components/Utility/SideFillter";
import CardProductsCountainer from "../../Components/Products/CardProductsCountainer";
import Pagination from "../../Components/Utility/Pagination";

function ShopProductPage() {
  return (
    <div>
      <CategoryHeader />
      <SearchCountResult />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
        <CardProductsCountainer />
        <SideFillter />

        <Pagination />
      </div>
    </div>
  );
}

export default ShopProductPage;
