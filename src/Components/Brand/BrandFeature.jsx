import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SubTitle from "../Utility/SubTitle";
import BrandCard from "./BrandCard";

import { getBrands } from "../../features/brands/brandSlice";

function BrandFeature({ title, btnTitle }) {
  const dispatch = useDispatch();

  const brands = useSelector(
    (state) => state.brands.brands,
  );

  useEffect(() => {
    dispatch(getBrands(1));
  }, [dispatch]);

  const featuredBrands = brands.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6">
      <SubTitle
        title={title}
        btnTitle={btnTitle}
        pathText="/allbrand"
      />

      <div className="my-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
        {featuredBrands.map((brand) => (
          <BrandCard
            key={brand._id}
            BrandImage={brand.image}
            BrandName={brand.name}
          />
        ))}
      </div>
    </div>
  );
}

export default BrandFeature;