import ManagementAllBrands from "../../Components/Management/BrandManage/ManagementAllBrands";
import ManagementSideBar from "../../Components/Management/ManagementSideBar";

function AdminAllBrandPage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManagementAllBrands />
    </div>
  );
}

export default AdminAllBrandPage;
