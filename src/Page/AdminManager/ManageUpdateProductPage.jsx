import ManageUpdateProduct from "../../Components/Management/ProductManage/ManageUpdateProduct";
import ManagementSideBar from "../../Components/Management/ManagementSideBar";

function AdminUpdateProductPage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManageUpdateProduct />
    </div>
  );
}

export default AdminUpdateProductPage;
