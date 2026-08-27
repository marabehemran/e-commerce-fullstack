import React from "react";
import SubTitle from "../Utility/SubTitle";
import { MapPin } from "lucide-react";

function ChoodePayMethod() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-4xl font-black">
          <SubTitle title="اتمام الطلب" />
        </h1>
        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-black">
                <span className="material-symbols-rounded text-violet-600">
                  <MapPin/>
                </span>
               
                  عنوان التوصيل
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <input
                  className="rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                
                  placeholder="الاسم الكامل"
                />
                <input
                  className="rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
               
                  placeholder="الهاتف"
                />
                <input
                  className="rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                 
                  placeholder="المدينة"
                />
                <input
                  className="rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              
                  placeholder="الرمز البريدي"
                />
              </div>
            </div>
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-black">
                  طريقة الدفع
              </h2>
              <label className="mt-5 flex gap-4 rounded-2xl border-2 border-violet-500 bg-violet-50 p-5 dark:bg-violet-950/20">
                <input type="radio" name="pay" checked />
                <div>
                  <b>
                 
                      الدفع عند الاستلام
                  </b>
                </div>
              </label>
              <label className="mt-3 flex gap-4 rounded-2xl border-2 border-slate-200 p-5 dark:border-slate-700">
                <input type="radio" name="pay" />
                <div>
                  <b>
              
                      الدفع بالبطاقة عبر Stripe
                  </b>
                </div>
              </label>
            </div>
          </div>
          <aside className="h-fit rounded-[30px] border border-slate-200 bg-white p-6 shadow-lift dark:border-slate-800 dark:bg-slate-900">
            <b>
                الإجمالي
            </b>
            <b className="mt-4 block text-4xl">2,197 ₪</b>
            <button
              className="mt-6 w-full rounded-2xl bg-violet-700 py-4 font-black text-white"
            >
                تأكيد الطلب
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ChoodePayMethod;
