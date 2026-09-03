import ManageUpdateSubCategory from "../../Components/Management/SubCategoryManage/ManageUpdateSubCategory";
import ManagementSideBar from "../../Components/Management/ManagementSideBar";

function AdminUpdateSubCategoryPage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManageUpdateSubCategory />
    </div>
  );
}

export default AdminUpdateSubCategoryPage;
