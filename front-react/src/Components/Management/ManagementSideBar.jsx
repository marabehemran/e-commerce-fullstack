import { useSelector } from "react-redux";

import AdminSideBar from "../Admin/AdminSideBar";
import ManagerSideBar from "../Manager/ManagerSideBar";

function ManagementSideBar() {
  const { user } = useSelector((state) => state.auth);

  if (user?.role === "admin") {
    return <AdminSideBar />;
  }

  if (user?.role === "manager") {
    return <ManagerSideBar />;
  }

  return null;
}

export default ManagementSideBar;