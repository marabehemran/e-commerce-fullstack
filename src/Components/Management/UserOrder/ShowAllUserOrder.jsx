import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import ShowOrderCard from "./ShowOrderCard";

import { getOrders } from "../../../features/orders/orderSlice";

function ShowAllUserOrder() {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-black">طلباتي</h1>

      <div className="mt-6 space-y-4">
        {loading && <p className="text-slate-500">جاري تحميل الطلبات...</p>}

        {!loading && error && <p className="font-bold text-red-600">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p className="text-slate-500">لا يوجد لديك طلبات حتى الآن</p>
        )}

        {!loading &&
          !error &&
          orders.map((order) => (
            <ShowOrderCard key={order._id} order={order} />
          ))}
      </div>
    </div>
  );
}

export default ShowAllUserOrder;
