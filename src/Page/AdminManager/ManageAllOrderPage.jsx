import React from 'react'
import ManagementAllOrders from '../../Components/Management/OrderManage/ManagementAllOrders'
import ManagementSideBar from '../../Components/Management/ManagementSideBar'

function AdminAllOrderPage() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <ManagementSideBar />
      <ManagementAllOrders/>
    </div>
  )
}

export default AdminAllOrderPage
