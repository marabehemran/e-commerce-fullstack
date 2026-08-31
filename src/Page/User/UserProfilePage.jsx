import UserSideBar from "../../Components/User/UserSideBar";
import ShowProfileUser from "../../Components/Management/UserProfile/ShowProfileUser";

function UserProfilePage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <UserSideBar />
      <ShowProfileUser />
    </div>
  );
}

export default UserProfilePage;
