import React from "react";
import { useSelector } from "react-redux";

import CartItem from "../../Components/Cart/CartItem";
import CartCheckout from "../../Components/Cart/CartCheckout";
import SubTitle from "../../Components/Utility/SubTitle";

function CartPage() {
  const { cart, loading, error } = useSelector((state) => state.cart);

  const cartItems = cart?.cartItems || [];

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6">
      <SubTitle title="عربة التسوق" />

      {loading && cartItems.length === 0 ? (
        <p className="py-10 text-center">جاري تحميل السلة...</p>
      ) : error && cartItems.length === 0 ? (
        <p className="py-10 text-center text-red-500">{error}</p>
      ) : cartItems.length === 0 ? (
        <p className="py-10 text-center text-slate-500">سلة التسوق فارغة</p>
      ) : (
        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_360px]">
          <div className="self-start">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          <CartCheckout cart={cart} />
        </div>
      )}
    </div>
  );
}

export default CartPage;
