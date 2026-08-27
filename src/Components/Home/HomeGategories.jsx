import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SubTitle from "../Utility/SubTitle";
import CategoryCard from "../Category/CategoryCard";

import { getCategories } from "../../features/categories/categorySlice";

function HomeGategories() {
  const dispatch = useDispatch();

  const categories = useSelector(
    (state) => state.categories.categories
  );

  useEffect(() => {
    dispatch(getCategories(1));
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6">

      <SubTitle
        title="التصنيفات"
        btnTitle="المزيد"
        pathText="/allcategory"
      />

      <div className="my-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

        {categories.slice(0, 6).map((category) => (
          <CategoryCard
            key={category._id}
            CategoryImage={category.image}
            CategoryName={category.name}
          />
        ))}

      </div>
    </div>
  );
}

export default HomeGategories;