import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ManageOrderCard from "./ManageOrderCard";
import ManagementTable from "../ManagementTable";

import { ReceiptText } from "lucide-react";

import { getOrders } from "../../../features/orders/orderSlice";

function ManagementAllOrders() {
  const dispatch = useDispatch();

  const [searchKeyword, setSearchKeyword] = useState("");

  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(
      getOrders({
        keyword: searchKeyword,
      }),
    );
  }, [dispatch, searchKeyword]);

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
  };

  return (
    <div>
      <div className="mb-6">
        <small className="font-black text-violet-600">إدارة المتجر</small>

        <h1 className="mt-1 text-3xl font-black">
          <span className="text-violet-600">
            <ReceiptText />
          </span>
          الطلبات
        </h1>
      </div>

      {loading && <p className="mb-4 text-slate-500">جاري تحميل الطلبات...</p>}

      {!loading && error && (
        <p className="mb-4 font-bold text-red-600">{error}</p>
      )}

      <ManagementTable
        searchValue={searchKeyword}
        onSearchChange={handleSearchChange}
      >
        {orders.map((order) => (
          <ManageOrderCard key={order._id} order={order} />
        ))}
      </ManagementTable>
    </div>
  );
}

export default ManagementAllOrders;
