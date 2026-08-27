import React from 'react'
import UpdateReview from '../../Components/Management/UserReview/UpdateReview'
import UserSideBar from '../../Components/User/UserSideBar'
function UserUpdateReviewPage() {
  return (
     <div className="mx-auto grid max-w-[1500px] gap-7 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <UserSideBar />
      <UpdateReview/>
    </div>
  )
}

export default UserUpdateReviewPage
