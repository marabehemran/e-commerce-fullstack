import { Ticket } from "lucide-react";

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import {
  getCoupon,
  updateCoupon,
} from "../../../features/coupons/couponSlice";

function ManageUpdateCoupon() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const coupon = useSelector(
    (state) => state.coupons.coupon,
  );

  const [name, setName] = useState("");

  const [discount, setDiscount] = useState("");

  const [expire, setExpire] = useState("");

  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    dispatch(getCoupon(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (coupon) {
      setName(coupon.name || "");

      setDiscount(
        coupon.discount !== undefined
          ? coupon.discount
          : "",
      );

      if (coupon.expire) {
        setExpire(coupon.expire.split("T")[0]);
      } else {
        setExpire("");
      }
    }
  }, [coupon]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdateError(null);

    if (!name.trim() || !discount || !expire) {
      return;
    }

    const couponData = {
      name: name.trim(),
      discount: Number(discount),
      expire,
    };

    try {
      await dispatch(
        updateCoupon({
          id,
          couponData,
        }),
      ).unwrap();

      dispatch(getCoupon(id));
    } catch (error) {
      setUpdateError(error);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <small className="font-black text-violet-600">
            إدارة المتجر
          </small>

          <h1 className="mt-1 flex items-center gap-2 text-3xl font-black">
            <span className="text-violet-600">
              <Ticket />
            </span>

            تعديل الكوبون
          </h1>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black dark:border-slate-700 dark:bg-slate-900"
        >
          رجوع
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block font-black">
              اسم الكوبون
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-black">
              نسبة الخصم
            </label>

            <div className="relative">
              <input
                type="number"
                min="1"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full rounded-2xl border p-3.5 pe-12 dark:border-slate-700 dark:bg-slate-800"
                required
              />

              <span className="absolute end-4 top-1/2 -translate-y-1/2 font-black text-slate-400">
                %
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-black">
              تاريخ الانتهاء
            </label>

            <input
              type="date"
              value={expire}
              onChange={(e) => setExpire(e.target.value)}
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              required
            />
          </div>
        </div>

        {updateError && (
          <p className="mt-4 text-sm font-bold text-red-500">
            {updateError}
          </p>
        )}

        <button
          type="submit"
          className="mt-5 cursor-pointer rounded-2xl bg-violet-700 px-6 py-3.5 font-black text-white"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
}

export default ManageUpdateCoupon;