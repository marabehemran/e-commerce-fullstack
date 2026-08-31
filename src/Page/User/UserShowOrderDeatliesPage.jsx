import UserSideBar from "../../Components/User/UserSideBar";
import ShowOrderDeatlies from "../../Components/Management/UserOrder/ShowOrderDeatlies";

function UserShowOrderDeatliesPage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <UserSideBar />
      <ShowOrderDeatlies />
    </div>
  );
}

export default UserShowOrderDeatliesPage;
