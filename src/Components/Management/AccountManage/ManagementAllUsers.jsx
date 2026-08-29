import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ManageUserCard from "./ManageUserCard";
import { Plus, Users } from "lucide-react";
import ManagementTable from "../ManagementTable";
import Pagination from "../../Utility/Pagination";
import {
  createUser,
  getUsers,
} from "../../../features/users/userSlice";

function ManagementAllUsers() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");

  const { users, paginationResult, loading, error } = useSelector(
    (state) => state.users,
  );

  useEffect(() => {
    dispatch(getUsers(currentPage));
  }, [dispatch, currentPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      return;
    }

    const userData = {
      name: name.trim(),
      email: email.trim(),
      role,
      password,
      passwordConfirm: password,
    };

    try {
      await dispatch(createUser(userData)).unwrap();

      setName("");
      setEmail("");
      setRole("user");
      setPassword("");

      dispatch(getUsers(currentPage));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleted = () => {
    dispatch(getUsers(currentPage));
  };

  return (
    <div>
      <div className="mb-6">
        <small className="font-black text-violet-600">إدارة المتجر</small>

        <h1 className="mt-1 text-3xl font-black">
          <span className="text-violet-600">
            <Users />
          </span>

          المستخدمون
        </h1>
      </div>

      <details className="mb-5 rounded-[28px] border border-violet-200 bg-white p-5 shadow-soft dark:border-violet-900 dark:bg-slate-900">
        <summary className="cursor-pointer font-black text-violet-700">
          <span>
            <Plus />
          </span>

          إضافة جديد
        </summary>

        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-black">الاسم</label>

              <input
                type="text"
                placeholder="الاسم"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="mb-2 block font-black">
                البريد الإلكتروني
              </label>

              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="mb-2 block font-black">الصلاحية</label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-2xl border p-3.5 font-bold dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="user">User</option>

                <option value="manager">Manager</option>

                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-black">كلمة المرور</label>

              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 cursor-pointer rounded-2xl bg-violet-700 px-6 py-3.5 font-black text-white"
          >
            حفظ
          </button>
        </form>
      </details>

      {loading && (
        <p className="mb-4 font-bold text-violet-700">
          جاري تحميل المستخدمين...
        </p>
      )}

      {error && (
        <p className="mb-4 font-bold text-red-500">
          {error}
        </p>
      )}

      <ManagementTable>
        {users.map((user) => (
          <ManageUserCard
            key={user._id}
            user={user}
            onDeleted={handleDeleted}
          />
        ))}
      </ManagementTable>

      <Pagination
        currentPage={currentPage}
        numberOfPages={paginationResult?.numberOfPages || 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ManagementAllUsers;

