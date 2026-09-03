import ManagementAllCoupons from "../../Components/Management/CouponManage/ManagementAllCoupons";
import ManagementSideBar from "../../Components/Management/ManagementSideBar";

function AdminAllCouponPage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManagementAllCoupons />
    </div>
  );
}

export default AdminAllCouponPage;
