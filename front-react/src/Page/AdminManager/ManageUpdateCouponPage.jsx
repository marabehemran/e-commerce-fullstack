import ManageUpdateCoupon from "../../Components/Management/CouponManage/ManageUpdateCoupon";
import ManagementSideBar from "../../Components/Management/ManagementSideBar";

function AdminUpdateCouponPage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManageUpdateCoupon />
    </div>
  );
}

export default AdminUpdateCouponPage;
