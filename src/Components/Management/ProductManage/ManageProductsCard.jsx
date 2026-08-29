import React from "react";

import {
  Link,
} from "react-router-dom";

import {
  useDispatch,
} from "react-redux";

import {
  deleteProduct,
} from "../../../features/products/productSlice";

function ManageProductsCard({
  product,
  onDeleted,
}) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteProduct(
          product._id,
        ),
      ).unwrap();

      if (onDeleted) {
        onDeleted();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="tilt overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">

      <div className="h-48 overflow-hidden bg-slate-50 dark:bg-slate-800">
        <img
          src={product.imageCover}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">

        <h3 className="font-black">
          {product.title}
        </h3>

        <div className="mt-2 flex justify-between text-sm text-slate-500">

          <span>
            {product.priceAfterDiscount
              ? product.priceAfterDiscount
              : product.price}{" "}
            ₪
          </span>

          <span>
            {product.quantity} بالمخزون
          </span>

        </div>

        <div className="mt-5 flex gap-2">

          <Link
            to={`/manageupdateproduct/${product._id}`}
          >
            <button className="cursor-pointer rounded-xl bg-violet-50 px-3 py-2 font-black text-violet-700">
              تعديل
            </button>
          </Link>

          <button
            onClick={handleDelete}
            className="cursor-pointer rounded-xl bg-rose-50 px-3 py-2 font-black text-rose-600"
          >
            حذف
          </button>

        </div>

      </div>

    </div>
  );
}

export default ManageProductsCard;