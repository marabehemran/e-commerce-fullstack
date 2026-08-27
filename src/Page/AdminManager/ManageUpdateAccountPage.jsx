import React from 'react'
import ManageUpdateUser from '../../Components/Management/AccountManage/ManageUpdateUser'
import ManagementSideBar from '../../Components/Management/ManagementSideBar'

function AdminUpdateAccountPage() {
  return (
     <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManageUpdateUser/>
    </div>
  )
}

export default AdminUpdateAccountPage
