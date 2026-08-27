import React from "react";
import SubTitle from "../../Components/Utility/SubTitle";
import CardProductsCountainer from "../../Components/Products/CardProductsCountainer";

function WishPage() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-4 pt-5">
          <SubTitle title="المفضلة" btnTitle="اضافة الكل للسلة " />
      </div>
      <CardProductsCountainer />
    </div>
  );
}

export default WishPage;
