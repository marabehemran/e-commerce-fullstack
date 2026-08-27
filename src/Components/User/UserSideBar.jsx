import React from "react";
import {
  ReceiptText,
  MapPin,
  UserCog,
  User,
  MessageSquareText,
} from "lucide-react";
import { Link } from "react-router-dom";

function UserSideBar() {
  return (
    <aside className="h-fit rounded-[28px] border border-slate-200 bg-white p-3 shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-28">
      <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950/30">
          <span>
            <User />
          </span>
        </div>

        <div>
          <b>Ahmed Abdullah</b>

          <small className="block text-slate-400">حساب مستخدم</small>
        </div>
      </div>

      <nav className="space-y-1 text-sm font-black">
        <Link to="/user/allorder">
          <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start transition hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/20">
            <span className="text-[20px]">
              <ReceiptText />
            </span>

            <span>طلباتي</span>
          </button>
        </Link>
        <Link to="/user/alladdress">
          <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start transition hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/20">
            <span className="text-[20px]">
              <MapPin />
            </span>

            <span>العناوين</span>
          </button>
        </Link>
        <Link to="/user/reviews">
          <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start transition hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/20">
            <span className="text-[20px]">
              <MessageSquareText />
            </span>

            <span>تقييماتي</span>
          </button>
        </Link>
        <Link to="/user/profile">
          <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start transition hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/20">
            <span className="text-[20px]">
              <UserCog />
            </span>

            <span>الملف الشخصي</span>
          </button>
        </Link>
      </nav>
    </aside>
  );
}

export default UserSideBar;
