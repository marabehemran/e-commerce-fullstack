import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import SubTitle from "../Utility/SubTitle";

import { MapPin } from "lucide-react";

import {
  createCashOrder,
  createCheckoutSession,
} from "../../features/orders/orderSlice";

import { clearCartState } from "../../features/cart/cartSlice";

function ChoodePayMethod() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);

  const { loading, error } = useSelector((state) => state.orders);

  const [details, setDetails] = useState("");

  const [phone, setPhone] = useState("");

  const [city, setCity] = useState("");

  const [postalCode, setPostalCode] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const cartId = cart?._id;

  const totalPrice =
    cart?.totalPriceAfterDiscount !== undefined
      ? cart?.totalPriceAfterDiscount
      : cart?.totalCartPrice || 0;

  const handleSubmit = async () => {
    if (!cartId) {
      return;
    }

    if (
      !details.trim() ||
      !phone.trim() ||
      !city.trim() ||
      !postalCode.trim()
    ) {
      return;
    }

    const shippingAddress = {
      details: details.trim(),
      phone: phone.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
    };

    try {
      if (paymentMethod === "cash") {
        await dispatch(
          createCashOrder({
            cartId,
            shippingAddress,
          }),
        ).unwrap();

        dispatch(clearCartState());

        navigate("/user/allorder");
      } else {
        const result = await dispatch(
          createCheckoutSession({
            cartId,
            shippingAddress,
          }),
        ).unwrap();

        if (result.session?.url) {
          window.location.href = result.session.url;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-4xl font-black">
          <SubTitle title="اتمام الطلب" />
        </h1>

        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-black">
                <span className="material-symbols-rounded text-violet-600">
                  <MapPin />
                </span>
                عنوان التوصيل
              </h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <input
                  className="rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                  placeholder="تفاصيل العنوان"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />

                <input
                  className="rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                  placeholder="الهاتف"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <input
                  className="rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                  placeholder="المدينة"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <input
                  className="rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                  placeholder="الرمز البريدي"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-black">طريقة الدفع</h2>

              <label
                className={`mt-5 flex gap-4 rounded-2xl border-2 p-5 ${
                  paymentMethod === "cash"
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-950/20"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="pay"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <div>
                  <b>الدفع عند الاستلام</b>
                </div>
              </label>

              <label
                className={`mt-3 flex gap-4 rounded-2xl border-2 p-5 ${
                  paymentMethod === "card"
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-950/20"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="pay"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <div>
                  <b>الدفع بالبطاقة عبر Stripe</b>
                </div>
              </label>
            </div>
          </div>

          <aside className="h-fit rounded-[30px] border border-slate-200 bg-white p-6 shadow-lift dark:border-slate-800 dark:bg-slate-900">
            <b>الإجمالي</b>

            <b className="mt-4 block text-4xl">{totalPrice} ₪</b>

            {error && (
              <p className="mt-4 text-sm font-bold text-red-600">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-violet-700 py-4 font-black text-white"
            >
              {loading ? "جاري تنفيذ الطلب..." : "تأكيد الطلب"}
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ChoodePayMethod;
