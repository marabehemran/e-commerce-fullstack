import React from 'react'
import UserSideBar from '../../Components/User/UserSideBar'
import UpdateAddress from '../../Components/Management/UserAddress/UpdateAddress'

function UserUpdateAddressPage() {
  return (
 <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <UserSideBar />       
      <UpdateAddress/>
    </div>
  )
}

export default UserUpdateAddressPage
