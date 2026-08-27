import React from "react";
import ManageOrderCard from "./ManageOrderCard";
import { ReceiptText } from "lucide-react";
import ManagementTable from "../ManagementTable";
function ManagementAllOrders() {
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

      <ManagementTable>
        <ManageOrderCard />
        <ManageOrderCard />
        <ManageOrderCard />
        <ManageOrderCard />
        <ManageOrderCard />
      </ManagementTable>
    </div>
  );
}

export default ManagementAllOrders;
