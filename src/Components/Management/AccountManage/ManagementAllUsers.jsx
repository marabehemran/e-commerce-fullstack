import React from "react";
import ManageUserCard from "./ManageUserCard";
import { Plus, Users } from "lucide-react";
import ManagementTable from "../ManagementTable";
function ManagementAllUsers() {
  return (
    <div >
      <div className="mb-6">
        <small className="font-black text-violet-600">
            إدارة المتجر
        </small>
        <h1 className="mt-1 text-3xl font-black">
          <span className="text-violet-600"><Users/></span>
            المستخدمون
        </h1>
      </div>
      <details className="mb-5 rounded-[28px] border border-violet-200 bg-white p-5 shadow-soft dark:border-violet-900 dark:bg-slate-900">
        <summary className="cursor-pointer font-black text-violet-700">
          <span className=""><Plus/></span>
            إضافة جديد
        </summary>
        <form className="mt-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-black">الاسم</label>

              <input
                type="text"
                placeholder="الاسم"
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="mb-2 block font-black">البريد الإلكتروني</label>

              <input
                type="email"
                placeholder="email@example.com"
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="mb-2 block font-black">الصلاحية</label>

              <select
                className="w-full rounded-2xl border p-3.5 font-bold dark:border-slate-700 dark:bg-slate-800"
                defaultValue="user"
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
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 rounded-2xl bg-violet-700 px-6 py-3.5 font-black text-white"
          >
            حفظ
          </button>
        </form>
      </details>
      <ManagementTable>
        <ManageUserCard/>
        <ManageUserCard/>
        <ManageUserCard/>
        <ManageUserCard/>
        <ManageUserCard/>
        <ManageUserCard/>

      </ManagementTable>
    </div>
  );
}

export default ManagementAllUsers;
