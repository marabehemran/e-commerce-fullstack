import ManagementAllProducts from "../../Components/Management/ProductManage/ManagementAllProducts";
import ManagementSideBar from "../../Components/Management/ManagementSideBar";
function AdminAllProductPage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManagementAllProducts />
    </div>
  );
}

export default AdminAllProductPage;
