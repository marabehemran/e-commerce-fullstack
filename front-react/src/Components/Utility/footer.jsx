import logo from "../../images/logo.png";
function footer() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid gap-8 px-4 py-10 md:grid-cols-4 sm:grid-cols-1 ">
        <div className="mx-auto">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-800 text-white">
              <span>
                <img src={logo} alt="" />
              </span>
            </div>
            <b className="text-xl">
              Happy<span className="text-violet-600">Shop</span>
            </b>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
            تجربة تسوق واضحة، سريعة وآمنة من أول نقرة حتى استلام الطلب.
          </p>
        </div>
        <div className="mx-auto">
          <b>المتجر</b>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <p>المنتجات والتصنيفات</p>
            <p>الماركات والعروض</p>
            <p>السلة والدفع</p>
          </div>
        </div>
        <div className="mx-auto">
          <b>المساعدة</b>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <p>الشحن والتوصيل</p>
            <p>الاسترجاع والاستبدال</p>
            <p>الخصوصية</p>
          </div>
        </div>
        <div className="mx-auto">
          <b>تواصل معنا</b>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <p>0590 000 000</p>
            <p>support@happyshop.com</p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400 dark:border-slate-800">
        © 2026 HappyShop
      </div>
    </div>
  );
}

export default footer;
