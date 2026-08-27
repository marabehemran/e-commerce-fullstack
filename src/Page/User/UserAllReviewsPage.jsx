import React from "react";
import ShowAllUserReview from "../../Components/Management/UserReview/ShowAllUserReview";
import UserSideBar from "../../Components/User/UserSideBar";

function UserAllReviewsPage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <UserSideBar />
      <ShowAllUserReview />
    </div>
  );
}

export default UserAllReviewsPage;