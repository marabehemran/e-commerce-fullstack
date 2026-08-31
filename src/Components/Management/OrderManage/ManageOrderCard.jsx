import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Eye } from "lucide-react";

import {
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../../../features/orders/orderSlice";

function ManageOrderCard({ order }) {
  const dispatch = useDispatch();

  const handlePaid = async () => {
    try {
      await dispatch(updateOrderToPaid(order._id)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelivered = async () => {
    try {
      await dispatch(updateOrderToDelivered(order._id)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const paymentMethod = order.paymentMethodType === "card" ? "Card" : "Cash";

  const userName = order.user?.name || "مستخدم غير معروف";

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800">
      <td className="px-5 py-4 font-black">#{order._id?.slice(-6)}</td>

      <td className="px-5 py-4 text-slate-500">
        {userName} • {order.totalOrderPrice} ₪ • {paymentMethod}
      </td>

      <td className="px-5 py-4">
        <div className="flex min-w-[400px] flex-wrap gap-2">
          <span
            className={`min-w-[120px] rounded-xl px-3 py-2 text-center font-bold ${
              order.isPaid
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {order.isPaid ? "مدفوع" : "غير مدفوع"}
          </span>

          <span
            className={`min-w-[120px] rounded-xl px-3 py-2 text-center font-bold ${
              order.isDelivered
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {order.isDelivered ? "تم التوصيل" : "لم يتم التوصيل"}
          </span>

          {!order.isPaid && (
            <button
              type="button"
              onClick={handlePaid}
              className="rounded-xl bg-violet-700 px-3 py-2 font-black text-white"
            >
              تأكيد الدفع
            </button>
          )}

          {!order.isDelivered && (
            <button
              type="button"
              onClick={handleDelivered}
              className="cursor-pointer rounded-xl bg-violet-700 px-3 py-2 font-black text-white"
            >
              تأكيد التوصيل
            </button>
          )}

          <Link to={`/manageordersdetalies?id=${order._id}`}>
            <button
              type="button"
              className="cursor-pointer flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 font-black dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="text-[20px]">
                <Eye />
              </span>
              المزيد
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default ManageOrderCard;
