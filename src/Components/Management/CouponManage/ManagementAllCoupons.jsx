import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ManageCouponCard from "./ManageCouponCard";
import ManagementTable from "../ManagementTable";
import Pagination from "../../Utility/Pagination";

import { Ticket } from "lucide-react";

import {
  createCoupon,
  getCoupons,
} from "../../../features/coupons/couponSlice";

function ManagementAllCoupons() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [expire, setExpire] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [createError, setCreateError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const coupons = useSelector((state) => state.coupons.coupons);

  const paginationResult = useSelector(
    (state) => state.coupons.paginationResult,
  );

  useEffect(() => {
    dispatch(
      getCoupons({
        page: currentPage,
        keyword: searchKeyword,
      }),
    );
  }, [currentPage, searchKeyword, dispatch]);

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCreateError(null);

    if (!name.trim() || !discount || !expire) {
      return;
    }

    const couponData = {
      name: name.trim(),
      discount: Number(discount),
      expire,
    };

    try {
      await dispatch(createCoupon(couponData)).unwrap();

      setName("");
      setDiscount("");
      setExpire("");

      if (currentPage === 1) {
        dispatch(
          getCoupons({
            page: 1,
            keyword: searchKeyword,
          }),
        );
      } else {
        setCurrentPage(1);
      }
    } catch (error) {
      setCreateError(error);
    }
  };

  const handleCouponDeleted = () => {
    if (coupons.length === 1 && currentPage > 1) {
      setCurrentPage((page) => page - 1);
    } else {
      dispatch(
        getCoupons({
          page: currentPage,
          keyword: searchKeyword,
        }),
      );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <small className="font-black text-violet-600">إدارة المتجر</small>

        <h1 className="mt-1 text-3xl font-black">
          <span className="text-violet-600">
            <Ticket />
          </span>
          الكوبونات
        </h1>
      </div>

      <details className="mb-5 rounded-[28px] border border-violet-200 bg-white p-5 shadow-soft dark:border-violet-900 dark:bg-slate-900">
        <summary className="cursor-pointer font-black text-violet-700">
          إضافة جديد
        </summary>

        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block font-black">اسم الكوبون</label>

              <input
                type="text"
                placeholder="اسم الكوبون"
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-black">نسبة الخصم</label>

              <div className="relative">
                <input
                  type="number"
                  placeholder="نسبة الخصم"
                  min="1"
                  max="100"
                  className="w-full rounded-2xl border p-3.5 pe-12 dark:border-slate-700 dark:bg-slate-800"
                  value={discount}
                  onChange={(e) => {
                    setDiscount(e.target.value);
                  }}
                  required
                />

                <span className="absolute end-4 top-1/2 -translate-y-1/2 font-black text-slate-400">
                  %
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block font-black">تاريخ الانتهاء</label>

              <input
                type="date"
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                value={expire}
                onChange={(e) => {
                  setExpire(e.target.value);
                }}
                required
              />
            </div>
          </div>

          {createError && (
            <p className="mt-4 text-sm font-bold text-red-500">{createError}</p>
          )}

          <button
            type="submit"
            className="mt-5 cursor-pointer rounded-2xl bg-violet-700 px-6 py-3.5 font-black text-white"
          >
            حفظ
          </button>
        </form>
      </details>

      <ManagementTable
        searchValue={searchKeyword}
        onSearchChange={handleSearchChange}
      >
        {coupons.map((coupon) => (
          <ManageCouponCard
            key={coupon._id}
            coupon={coupon}
            onDeleted={handleCouponDeleted}
          />
        ))}
      </ManagementTable>

      <Pagination
        currentPage={currentPage}
        numberOfPages={paginationResult?.numberOfPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ManagementAllCoupons;
