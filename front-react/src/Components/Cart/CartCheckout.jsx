import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { applyCoupon } from "../../features/cart/cartSlice";

function CartCheckout({ cart }) {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.cart);

  const [coupon, setCoupon] = useState("");

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      return;
    }

    try {
      await dispatch(applyCoupon(coupon.trim())).unwrap();
      setCoupon("");
    } catch (error) {
      console.error(error);
    }
  };

  const totalPrice = cart?.totalCartPrice || 0;

  const finalPrice = cart?.totalPriceAfterDiscount || cart?.totalCartPrice || 0;

  return (
    <div className="h-fit rounded-[30px] border border-slate-200 bg-white p-6 shadow-lift dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-black">ملخص الطلب</h2>

      <div className="mt-6 flex justify-between">
        <span>المجموع</span>

        <b>{totalPrice.toLocaleString()} ₪</b>
      </div>

      {cart?.totalPriceAfterDiscount && (
        <div className="mt-3 flex justify-between">
          <span>بعد الخصم</span>

          <b className="text-violet-700">{finalPrice.toLocaleString()} ₪</b>
        </div>
      )}

      <div className="mt-3 flex justify-between">
        <span>الشحن</span>

        <b className="text-emerald-600">مجاني</b>
      </div>

      <div className="my-6 border-t border-dashed dark:border-slate-700"></div>

      <div className="flex gap-2">
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="min-w-0 flex-1 rounded-2xl border bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-800"
          placeholder="كود الخصم"
        />

        <button
          onClick={handleApplyCoupon}
          disabled={loading}
          className="rounded-2xl bg-slate-950 px-4 font-black text-white"
        >
          تطبيق
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <Link to="/order/paymethod">
        <button className="mt-6 w-full rounded-2xl bg-violet-700 py-4 font-black text-white">
          إتمام الشراء
        </button>
      </Link>
    </div>
  );
}

export default CartCheckout;
