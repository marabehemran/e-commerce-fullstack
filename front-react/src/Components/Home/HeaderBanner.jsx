import { Zap } from "lucide-react";
import home from "../../images/home.jpg";

function HeaderBanner() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="relative overflow-hidden rounded-[38px] bg-slate-950 text-white shadow-lift">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl"></div>
        <div className="relative grid min-h-[510px] items-center gap-8 p-8 lg:grid-cols-2 lg:p-14">
          <div >
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black">
              <span className="text-orange-300">
                <Zap />
              </span>
              <span>عروض جديدة كل أسبوع</span>
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.2] md:text-6xl">
              <span>تسوق أسرع. اختر أذكى.</span>
              <span className="bg-gradient-to-r from-violet-300 to-orange-300 bg-clip-text text-transparent">
                <span className="">استمتع أكثر.</span>
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              <span>
                بحث سريع، فلاتر بسيطة، تقييمات واضحة ودفع آمن — بدون تعقيد.
              </span>
            </p>
            <div className="mt-8 flex gap-3">
              <button className="shine rounded-2xl bg-white px-6 py-3.5 font-black text-slate-950 cursor-pointer">
                <span>ابدا التسوق </span>
              </button>
              <button className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 font-black cursor-pointer">
                <span>استكشف الأقسام</span>
              </button>
            </div>
          </div>
          <div className="hidden lg:grid place-items-center">
            <div className="grid h-80 w-80 place-items-center overflow-hidden rounded-[48px] border border-white/15 bg-white/10 backdrop-blur-xl">
              <img src={home} className="w-[100%] h-[100%]" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderBanner;
