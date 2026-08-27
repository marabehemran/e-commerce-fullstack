import React from "react";
import brand1 from "../../images/brand1.png";
import BrandCard from "./BrandCard";
import SubTitle from "../Utility/SubTitle";

function BrandContainer() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6">
      <SubTitle title="كل الماركات" />
      <div className="my-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <BrandCard BrandImage={brand1} BrandName="RALPH LUREN" />
        <BrandCard BrandImage={brand1} BrandName="RALPH LUREN" />
        <BrandCard BrandImage={brand1} BrandName="RALPH LUREN" />
        <BrandCard BrandImage={brand1} BrandName="RALPH LUREN" />
        <BrandCard BrandImage={brand1} BrandName="RALPH LUREN" />
        <BrandCard BrandImage={brand1} BrandName="RALPH LUREN" />
        <BrandCard BrandImage={brand1} BrandName="RALPH LUREN" />
        <BrandCard BrandImage={brand1} BrandName="RALPH LUREN" />
        <BrandCard BrandImage={brand1} BrandName="RALPH LUREN" />
        <BrandCard BrandImage={brand1} BrandName="RALPH LUREN" />
      </div>
    </div>
  );
}

export default BrandContainer;
