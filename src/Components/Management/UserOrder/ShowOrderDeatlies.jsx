import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Package,
  ReceiptText,
  ShoppingBag,
  Truck,
  WalletCards,
} from "lucide-react";


import { getOrder } from "../../../features/orders/orderSlice";

function ShowOrderDeatlies() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { order, loading, error } = useSelector((state) => state.orders);

  const orderId = searchParams.get("id");

  useEffect(() => {
    if (orderId) {
      dispatch(getOrder(orderId));
    }
  }, [dispatch, orderId]);

  if (loading) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <p className="font-black">جاري تحميل تفاصيل الطلب...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <p className="font-black text-red-600">{error}</p>
      </div>
    );
  }

  if (!orderId) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <p className="font-black text-red-600">رقم الطلب غير موجود</p>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const orderStatus = order.isDelivered
    ? "تم التسليم"
    : order.isPaid
      ? "تم الدفع"
      : "قيد الانتظار";

  const productsTotal =
    order.cartItems?.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    ) || 0;

  const formatDate = (date) => {
    if (!date) {
      return "غير متوفر";
    }

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <small className="font-black text-violet-600">طلباتي</small>

          <h1 className="mt-1 flex items-center gap-2 text-3xl font-black">
            <span className="text-violet-600">
              <ReceiptText />
            </span>
            تفاصيل الطلب
          </h1>
        </div>

        <button
          type="button"
          onClick={() => navigate("/user/allorder")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black dark:border-slate-700 dark:bg-slate-900"
        >
          رجوع
        </button>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              رقم الطلب
            </p>

            <h2 className="mt-1 text-2xl font-black">
              #{order._id?.slice(-6)}
            </h2>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              تاريخ الطلب
            </p>

            <p className="mt-1 font-black">{formatDate(order.createdAt)}</p>
          </div>

          <div className="rounded-full bg-slate-50 px-4 py-2 dark:bg-slate-800">
            <span className="font-black text-violet-700 dark:text-violet-400">
              {orderStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 p-6 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-violet-600">
              <ShoppingBag />
            </span>

            <h2 className="text-xl font-black">المنتجات</h2>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {order.cartItems?.map((item) => (
            <div
              key={item._id}
              className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center"
            >
              <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800">
                {item.product?.imageCover ? (
                  <img
                    src={item.product.imageCover}
                    alt={item.product?.title || "product"}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-5xl text-slate-600 dark:text-slate-300">
                    <Package />
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-black">
                  {item.product?.title || "منتج غير متوفر"}
                </h3>

                {item.color && (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    اللون: {item.color}
                  </p>
                )}

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  الكمية: {item.quantity}
                </p>
              </div>

              <div className="sm:text-end">
                <p className="font-black">{item.price * item.quantity} ₪</p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  سعر الوحدة: {item.price} ₪
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-2xl text-violet-600">
              <WalletCards />
            </span>

            <h2 className="text-xl font-black">معلومات الدفع</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                طريقة الدفع
              </span>

              <span className="font-black">
                {order.paymentMethodType === "card" ? "Card" : "Cash"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                حالة الدفع
              </span>

              <span className="font-black text-violet-700 dark:text-violet-400">
                {order.isPaid ? "مدفوع" : "غير مدفوع"}
              </span>
            </div>

            {order.isPaid && order.paidAt && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  تاريخ الدفع
                </span>

                <span className="font-black">{formatDate(order.paidAt)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-2xl text-violet-600">
              <Truck />
            </span>

            <h2 className="text-xl font-black">عنوان الشحن</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                المدينة
              </p>

              <p className="mt-1 font-black">
                {order.shippingAddress?.city || "غير متوفر"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                العنوان
              </p>

              <p className="mt-1 font-black">
                {order.shippingAddress?.details || "غير متوفر"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                الهاتف
              </p>

              <p className="mt-1 font-black">
                {order.shippingAddress?.phone || "غير متوفر"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                الرمز البريدي
              </p>

              <p className="mt-1 font-black">
                {order.shippingAddress?.postalCode || "غير متوفر"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center gap-2">
          <span className="text-2xl text-violet-600">
            <ReceiptText />
          </span>

          <h2 className="text-xl font-black">ملخص الطلب</h2>
        </div>

        <div className="max-w-lg space-y-4">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              مجموع المنتجات
            </span>

            <span className="font-black">{productsTotal} ₪</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">الضريبة</span>

            <span className="font-black">{order.taxPrice || 0} ₪</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              رسوم الشحن
            </span>

            <span className="font-black">{order.shippingPrice || 0} ₪</span>
          </div>

          <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="flex justify-between">
              <span className="text-lg font-black">الإجمالي</span>

              <span className="text-xl font-black text-violet-700 dark:text-violet-400">
                {order.totalOrderPrice} ₪
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center gap-2">
          <span className="text-2xl text-violet-600">
            <Package />
          </span>

          <h2 className="text-xl font-black">حالة التوصيل</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              حالة الطلب
            </p>

            <p className="mt-1 font-black text-violet-700 dark:text-violet-400">
              {orderStatus}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              تم التوصيل
            </p>

            <p className="mt-1 font-black">
              {order.isDelivered ? "نعم" : "لا"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              تاريخ التوصيل
            </p>

            <p className="mt-1 font-black">
              {order.isDelivered
                ? formatDate(order.deliveredAt)
                : "لم يتم التوصيل بعد"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={() => navigate("/user/allorder")}
          className="cursor-pointer hover:bg-violet-700 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-black dark:border-slate-700 dark:bg-slate-900"
        >
          العودة إلى طلباتي
        </button>
      </div>
    </div>
  );
}

export default ShowOrderDeatlies;
