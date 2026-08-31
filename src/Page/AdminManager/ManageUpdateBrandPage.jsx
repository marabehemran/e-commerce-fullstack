import ManageUpdateBrand from "../../Components/Management/BrandManage/ManageUpdateBrand";
import ManagementSideBar from "../../Components/Management/ManagementSideBar";

function AdminUpdateBrandPage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManageUpdateBrand />
    </div>
  );
}

export default AdminUpdateBrandPage;
