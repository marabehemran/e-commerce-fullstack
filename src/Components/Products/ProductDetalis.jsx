import React from "react";

import ProductGallery from "./ProductGallery";
import ProductDiscription from "./ProductDiscription";

import RateContainer from "../Rate/RateContainer";

import CardProductsCountainer from "./CardProductsCountainer";

function ProductDetalis({ product, brands }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-7">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
        <ProductGallery product={product} />

        <ProductDiscription product={product} brands={brands} />
      </div>

      <RateContainer product={product} />

      <CardProductsCountainer
        title="منتجات قد تعجبك"
        category={product.category?._id || product.category}
        excludeProductId={product._id}
      />
    </div>
  );
}

export default ProductDetalis;
