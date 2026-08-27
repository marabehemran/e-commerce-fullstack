import React from "react";
import mobile from "../../images/mobile1.png";
import{Trash}  from "lucide-react";

function CartItem() {
  return (
    <div className="mt-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-5 md:grid-cols-[130px_1fr_auto] md:items-center">
        <div className="grid h-32 place-items-center rounded-2xl bg-slate-50 dark:bg-slate-800">
          <span className="">
            <img
              className="max-h-34 max-w-34 object-contain"
              src={mobile}
              alt=""
            />
          </span>
        </div>
        <div>
          <b>
         
              هاتف ذكي AMOLED 256GB
          </b>
          <div className="mt-4 inline-flex rounded-2xl border p-1 dark:border-slate-700">
            <button  className="h-9 w-9">
              −
            </button>
            <b  className="min-w-10 text-center">
              1
            </b>
            <button className="h-9 w-9">
              +
            </button>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col justify-between gap-7 items-center">
          <b className="text-2xl">1,699 ₪</b>
          <button className="text-red-500 "><Trash/></button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
