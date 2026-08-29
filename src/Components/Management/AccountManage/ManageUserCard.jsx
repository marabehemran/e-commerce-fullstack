import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../features/users/userSlice";

function ManageUserCard({ user, onDeleted }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser(user._id)).unwrap();

      onDeleted?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800">
      <td className="px-5 py-4 font-black">
        {user.name}
      </td>

      <td className="px-5 py-4 text-slate-500">
        {user.role} • {user.email}
      </td>

      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          <Link to={`/manageupdateaccout/${user._id}`}>
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
      </td>
    </tr>
  );
}

export default ManageUserCard;
