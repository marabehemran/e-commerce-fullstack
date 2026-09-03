import { useState } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteSubCategory } from "../../../features/subCategories/subCategorySlice";

function ManageSubCategoryCard({ subCategory, onDeleted }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const categories = useSelector(
    (state) => state.categories.allCategories,
  );

  const [deleteError, setDeleteError] = useState(null);

  const category = categories.find(
    (category) => category._id === subCategory.category,
  );

  const handleDelete = async () => {
    setDeleteError(null);

    try {
      await dispatch(
        deleteSubCategory(subCategory._id),
      ).unwrap();

      onDeleted?.();
    } catch (error) {
      setDeleteError(error);
    }
  };

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800">
      <td className="px-5 py-4 font-black">
        {subCategory.name}
      </td>

      <td className="px-5 py-4 text-slate-500">
        {category?.name || "غير معروف"}
      </td>

      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/manageupdatesubcategory/${subCategory._id}`}
            className="rounded-xl bg-violet-50 px-3 py-2 font-black text-violet-700"
          >
            تعديل
          </Link>

          {user?.role === "admin" && (
            <button
              type="button"
              onClick={handleDelete}
              className="cursor-pointer rounded-xl bg-rose-50 px-3 py-2 font-black text-rose-600"
            >
              حذف
            </button>
          )}
        </div>

        {deleteError && (
          <p className="mt-2 text-sm font-bold text-red-500">
            {deleteError}
          </p>
        )}
      </td>
    </tr>
  );
}

export default ManageSubCategoryCard;