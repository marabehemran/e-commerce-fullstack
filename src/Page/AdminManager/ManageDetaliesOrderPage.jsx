import React from 'react'
import ManageDetaliesOrder from '../../Components/Management/OrderManage/ManageDetaliesOrder'
import ManagementSideBar from '../../Components/Management/ManagementSideBar'

function AdminDetaliesOrderPage() {
  return (
     <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManageDetaliesOrder/>
      
    </div>
  )
}

export default AdminDetaliesOrderPage
