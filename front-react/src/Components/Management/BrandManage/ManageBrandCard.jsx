
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { deleteBrand } from "../../../features/brands/brandSlice";

function ManageBrandCard({ brand, onDeleted }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleDelete = async () => {
    try {
      await dispatch(deleteBrand(brand._id)).unwrap();

      if (onDeleted) {
        onDeleted();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <img
            src={brand.image}
            alt={brand.name}
            className="h-14 w-14 rounded-xl object-contain"
          />

          <span className="font-black">{brand.name}</span>
        </div>
      </td>

      <td className="px-5 py-4 text-slate-500">ماركة</td>

      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/manageupdatebrand/${brand._id}`}
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
      </td>
    </tr>
  );
}

export default ManageBrandCard;
