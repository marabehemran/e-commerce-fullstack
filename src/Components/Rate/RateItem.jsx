import React from "react";

function RateItem() {
  return (
    <div className=" dark:divide-slate-800">
        <hr />
      <div className="py-5">
        <div className="flex items-center gap-2 font-black">
          <span>احمد محمود</span>
          <span className="text-amber-500">4.3 ★</span>
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
      
            منتج مناسب سعره للوقت الحالي وجه كويس جدا ومعاه دراع زيادة
        </p>
      </div>
    </div>
  );
}

export default RateItem;
