import { ReceiptText, ShoppingBag, Truck, User, WalletCards } from "lucide-react";
import React from "react";

function ManageDetaliesOrder() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <small className="font-black text-violet-600">إدارة المتجر</small>

          <h1 className="mt-1 flex items-center gap-2 text-3xl font-black">
            <span className="text-violet-600">
              <ReceiptText/>
            </span>
            تفاصيل الطلب
          </h1>
        </div>

        <button
          type="button"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black dark:border-slate-700 dark:bg-slate-900"
        >
          رجوع
        </button>
      </div>

      <div className="mb-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              رقم الطلب
            </p>

            <h2 className="mt-1 text-2xl font-black">#HS-231231</h2>
          </div>

          <div className="rounded-2xl bg-slate-50 px-5 py-3 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              حالة الطلب
            </p>

            <p className="mt-1 font-black text-violet-700 dark:text-violet-400">
              قيد التنفيذ
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-2xl text-violet-600">
              <User/>
            </span>

            <h2 className="text-xl font-black">معلومات العميل</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                الاسم
              </p>

              <p className="mt-1 font-black">Ahmed Mohammed</p>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                البريد الإلكتروني
              </p>

              <p className="mt-1 font-black">ahmed@example.com</p>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                رقم الهاتف
              </p>

              <p className="mt-1 font-black">059 123 4567</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-2xl text-violet-600">
              <WalletCards/>
            </span>

            <h2 className="text-xl font-black">معلومات الدفع</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                طريقة الدفع
              </span>

              <span className="font-black">Cash</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                حالة الدفع
              </span>

              <span className="font-black text-violet-700 dark:text-violet-400">
                غير مدفوع
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                تاريخ الطلب
              </span>

              <span className="font-black">16 أغسطس 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 p-6 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-violet-600">
              <ShoppingBag/>
            </span>

            <h2 className="text-xl font-black">المنتجات</h2>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
            <img
              src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500"
              alt="Samsung Galaxy"
              className="h-24 w-24 rounded-2xl object-cover"
            />

            <div className="flex-1">
              <h3 className="font-black">Samsung Galaxy AMOLED</h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                اللون: أسود
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                الكمية: 2
              </p>
            </div>

            <div className="text-start sm:text-end">
              <p className="font-black">2,400 ₪</p>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                1,200 ₪ × 2
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
              alt="iPhone"
              className="h-24 w-24 rounded-2xl object-cover"
            />

            <div className="flex-1">
              <h3 className="font-black">iPhone 15</h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                اللون: أبيض
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                الكمية: 1
              </p>
            </div>

            <div className="text-start sm:text-end">
              <p className="font-black">1,199 ₪</p>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                1,199 ₪ × 1
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-2xl text-violet-600">
              <Truck/>
            </span>

            <h2 className="text-xl font-black">عنوان الشحن</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                المدينة
              </p>

              <p className="mt-1 font-black">Jenin</p>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                العنوان
              </p>

              <p className="mt-1 font-black">
                شارع الجامعة، بالقرب من السوق الرئيسي
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                الهاتف
              </p>

              <p className="mt-1 font-black">059 123 4567</p>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                الرمز البريدي
              </p>

              <p className="mt-1 font-black">00970</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-2xl text-violet-600">
              <ReceiptText/>
            </span>

            <h2 className="text-xl font-black">ملخص الطلب</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                مجموع المنتجات
              </span>

              <span className="font-black">3,599 ₪</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                الضريبة
              </span>

              <span className="font-black">30 ₪</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                رسوم الشحن
              </span>

              <span className="font-black">20 ₪</span>
            </div>

            <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="text-lg font-black">الإجمالي</span>

                <span className="text-xl font-black text-violet-700 dark:text-violet-400">
                  3,649 ₪
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center gap-2">
          <span className="text-2xl text-violet-600">
            <Truck/>
          </span>

          <h2 className="text-xl font-black">حالة التوصيل</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              الحالة الحالية
            </p>

            <p className="mt-1 font-black text-violet-700 dark:text-violet-400">
              قيد التنفيذ
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              تم التوصيل
            </p>

            <p className="mt-1 font-black">لا</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              تاريخ التوصيل
            </p>

            <p className="mt-1 font-black text-slate-400 dark:text-slate-500">
              لم يتم التوصيل بعد
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-black dark:border-slate-700 dark:bg-slate-900"
        >
          رجوع
        </button>

        <button
          type="button"
          className="rounded-2xl bg-violet-700 px-6 py-3 font-black text-white"
        >
          تحديث حالة الطلب
        </button>
      </div>
    </div>
  );
}

export default ManageDetaliesOrder;
