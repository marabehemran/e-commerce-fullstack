import { Link } from "react-router-dom";

import { Package } from "lucide-react";

function ShowOrderCard({ order }) {
  const getOrderStatus = () => {
    if (order.isDelivered) {
      return {
        text: "تم التسليم",
        className: "bg-emerald-50 text-emerald-700",
      };
    }

    if (order.isPaid) {
      return {
        text: "تم الدفع",
        className: "bg-blue-50 text-blue-700",
      };
    }

    return {
      text: "قيد الانتظار",
      className: "bg-amber-50 text-amber-700",
    };
  };

  const status = getOrderStatus();

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex justify-between">
        <b className="text-xl">#{order._id?.slice(-6)}</b>

        <span
          className={`rounded-full px-3 py-1 text-xs font-black ${status.className}`}
        >
          {status.text}
        </span>
      </div>

      {order.cartItems?.map((item) => (
        <div
          key={item._id}
          className="mt-4 grid gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800 md:grid-cols-[90px_1fr_auto] md:items-center"
        >
          <div className="grid h-20 place-items-center overflow-hidden rounded-xl bg-white dark:bg-slate-900">
            {item.product?.imageCover ? (
              <img
                src={item.product.imageCover}
                alt={item.product?.title || "product"}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-5xl">
                <Package />
              </span>
            )}
          </div>

          <div>
            <b>{item.product?.title || "منتج غير متوفر"}</b>

            <p className="text-sm text-slate-500">الكمية: {item.quantity}</p>

            {item.color && (
              <p className="text-sm text-slate-500">اللون: {item.color}</p>
            )}
          </div>

          <b>{item.price} ₪</b>
        </div>
      ))}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">إجمالي الطلب</p>

          <b className="text-xl">{order.totalOrderPrice} ₪</b>
        </div>

        <Link to={`/user/ordersdetalies?id=${order._id}`}>
          <button className="cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 font-black text-white transition hover:bg-violet-700">
            عرض تفاصيل الطلب
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ShowOrderCard;
