import React from "react";
import ShowAllUserOrder from "../../Components/Management/UserOrder/ShowAllUserOrder";
import UserSideBar from "../../Components/User/UserSideBar";

function UserAllOrderePage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <UserSideBar />
      <ShowAllUserOrder />
    </div>
  );
}

export default UserAllOrderePage;
