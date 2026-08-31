import ShowAllAddress from "../../Components/Management/UserAddress/ShowAllAddress";
import UserSideBar from "../../Components/User/UserSideBar";

function UserAllAdress() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <UserSideBar />
      <ShowAllAddress />
    </div>
  );
}

export default UserAllAdress;
