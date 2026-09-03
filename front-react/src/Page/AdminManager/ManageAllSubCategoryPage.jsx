import ManagementAllSubCategories from "../../Components/Management/SubCategoryManage/ManagementAllSubCategories";
import ManagementSideBar from "../../Components/Management/ManagementSideBar";

function AdminAllSubCategoryPage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManagementAllSubCategories />
    </div>
  );
}

export default AdminAllSubCategoryPage;
