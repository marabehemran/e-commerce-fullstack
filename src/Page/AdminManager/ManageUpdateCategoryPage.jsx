import React from 'react'
import ManageUpdateCategory from '../../Components/Management/CategoryManage/ManageUpdateCategory'
import ManagementSideBar from '../../Components/Management/ManagementSideBar'

function AdminUpdateCategoryPage() {
  return (
     <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManageUpdateCategory/>
    </div>
  )
}

export default AdminUpdateCategoryPage
