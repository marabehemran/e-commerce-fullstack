import React from "react";
import SubTitle from "../Utility/SubTitle";
import BrandCard from "./BrandCard";
import brand1 from "../../images/brand1.png";

function BrandFeature({ title,btnTitle }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6">
      <SubTitle title={title} btnTitle={btnTitle} pathText="/allbrand"/>
      <div className="my-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
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

export default BrandFeature;
