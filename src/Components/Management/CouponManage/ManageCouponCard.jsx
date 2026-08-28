import React from "react";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { deleteCoupon } from "../../../features/coupons/couponSlice";

function ManageCouponCard({ coupon, onDeleted }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteCoupon(coupon._id)).unwrap();

      if (onDeleted) {
        onDeleted();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800">
      <td className="px-5 py-4 font-black">
        {coupon.name}
      </td>

      <td className="px-5 py-4 text-slate-500">
        <div className="flex flex-wrap gap-3">
          <span>
            الخصم: {coupon.discount}%
          </span>

          <span>
            تاريخ الانتهاء:{" "}
            {coupon.expire
              ? new Date(coupon.expire).toLocaleDateString()
              : ""}
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/manageupdatecoupon/${coupon._id}`}
            className="cursor-pointer rounded-xl bg-violet-50 px-3 py-2 font-black text-violet-700 dark:bg-violet-950"
          >
            تعديل
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            className="cursor-pointer rounded-xl bg-rose-50 px-3 py-2 font-black text-rose-600 dark:bg-rose-950"
          >
            حذف
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ManageCouponCard;