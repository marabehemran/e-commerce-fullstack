
import ManagementAllCategories from "../../Components/Management/CategoryManage/ManagementAllCategories";
import ManagementSideBar from "../../Components/Management/ManagementSideBar";
function AdminAllCategoryPage() {
  return (

    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManagementAllCategories />
    </div>
  );
}

export default AdminAllCategoryPage;
