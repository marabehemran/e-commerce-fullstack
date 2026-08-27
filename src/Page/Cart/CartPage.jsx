import React from "react";
import CartItem from "../../Components/Cart/CartItem";
import CartCheckout from "../../Components/Cart/CartCheckout";
import SubTitle from "../../Components/Utility/SubTitle";

function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6">
      <SubTitle title="عربة التسوق" />
      <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_360px]">
        <div className="self-start">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <CartCheckout />
      </div>
    </div>
  );
}

export default CartPage;
