import React from "react";
import ManageReviewCard from "./ManageReviewCard";
import { MessageSquareText } from "lucide-react";
import ManagementTable from "../ManagementTable";
function ManagementAllReviews() {
  return (
    <div>
      <div className="mb-6">
        <small className="font-black text-violet-600">إدارة المتجر</small>
        <h1 className="mt-1 text-3xl font-black">
          <span className="text-violet-600">
            <MessageSquareText />
          </span>
          التقييمات
        </h1>
      </div>
      <ManagementTable>
        <ManageReviewCard />
        <ManageReviewCard />
        <ManageReviewCard />
        <ManageReviewCard />
      </ManagementTable>
    </div>
  );
}

export default ManagementAllReviews;
