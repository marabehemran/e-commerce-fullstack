import React from "react";
import ProductGallery from "./ProductGallery";
import ProductDiscription from "./ProductDiscription";
import RateContainer from "../Rate/RateContainer";
import CardProductsCountainer from "./CardProductsCountainer";

function ProductDetalis() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-7">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
        <ProductGallery />
        <ProductDiscription />
      </div>
      <RateContainer/>
      <CardProductsCountainer title="منتجات قد تعجبك"/>
    </div>
  );
}
export default ProductDetalis;
