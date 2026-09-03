import ManagementAllUsers from "../../Components/Management/AccountManage/ManagementAllUsers";
import ManagementSideBar from "../../Components/Management/ManagementSideBar";

function AdminAllUserPage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManagementAllUsers />
    </div>
  );
}

export default AdminAllUserPage;
