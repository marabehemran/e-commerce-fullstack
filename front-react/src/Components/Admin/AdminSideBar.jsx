import { Link } from "react-router-dom";

import {
  GitBranch,
  LayoutGrid,
  MessageSquareText,
  Package,
  ReceiptText,
  ShieldUser,
  Tag,
  Ticket,
  Users,
} from "lucide-react";

function AdminSideBar() {
  return (
    <div className="h-fit rounded-[28px] border border-slate-200 bg-white p-3 shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-28">
      <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950/30">
          <span className="">
            <ShieldUser />
          </span>
        </div>
        <div>
          <b>Admin</b>
          <small className="block text-slate-400">لوحة إدارة</small>
        </div>
      </div>
      <nav className="space-y-1 text-sm font-black">
        <Link to="/manageallorders">
          <button className="navbtn flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start transition hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/20">
            <span className="text-[20px]">
              <ReceiptText />
            </span>
            الطلبات
          </button>
        </Link>
        <Link to="/manageallproducts">
          <button className="navbtn flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start transition hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/20">
            <span className="text-[20px]">
              <Package />
            </span>
            المنتجات
          </button>
        </Link>
        <Link to="/manageallcategories">
          <button className="navbtn flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start transition hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/20">
            <span className="text-[20px]">
              <LayoutGrid />
            </span>
            التصنيفات
          </button>
        </Link>
        <Link to="/manageallsubcategories">
          <button className="navbtn flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start transition hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/20">
            <span className="text-[20px]">
              <GitBranch />
            </span>
            التصنيفات الفرعية
          </button>
        </Link>
        <Link to="/manageallbrands">
          <button className="navbtn flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start transition hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/20">
            <span className="text-[20px]">
              <Tag />
            </span>
            الماركات
          </button>
        </Link>
        <Link to="/manageallcoupons">
          <button className="navbtn flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start transition hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/20">
            <span className="text-[20px]">
              <Ticket />
            </span>
            الكوبونات
          </button>
        </Link>
        <Link to="/manageallreviews">
          <button className="navbtn flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start transition hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/20">
            <span className="text-[20px]">
              <MessageSquareText />
            </span>
            التقييمات
          </button>
        </Link>
        <Link to="/manageallusers">
          <button className="navbtn flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start transition hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/20">
            <span className="text-[20px]">
              <Users />
            </span>
            المستخدمون
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default AdminSideBar;
