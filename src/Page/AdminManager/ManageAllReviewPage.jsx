import React from "react";
import ManagementAllReviews from "../../Components/Management/ReviewManage/ManagementAllReviews";
import ManagementSideBar from "../../Components/Management/ManagementSideBar";

function AdminAllReviewPage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManagementAllReviews />
    </div>
  );
}

export default AdminAllReviewPage;
