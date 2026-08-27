import React from "react";
import SubTitle from "../Utility/SubTitle";
import ProductCard from "./ProductCard";

function CardProductsCountainer({ title, btnTitle, pathText}) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-2">
      <SubTitle title={title} btnTitle={btnTitle} pathText={pathText}/>
      <div className="my-2 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default CardProductsCountainer;
