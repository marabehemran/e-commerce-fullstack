import React from "react";

function ProductDiscription() {
  return (
    <div>
      <small className="font-black text-violet-600">
          الالكترونيات :
      </small>
      <h1 className="mt-2 text-2xl font-black leading-relaxed md:text-3xl">
       
          آيفون XR بذاكرة سعة 128 جيجابايت ويدعم تقنية 4G LTE مع تطبيق فيس تايم
          (برودكت) أحمر
      </h1>
      <div className="mt-3 text-amber-500">
        ★ <b>4.5</b>
      </div>
      <div className="mt-7">
        <b className="font-black">
            الماركة :
          <span className="text-violet-700">سامسونج</span>
        </b>
        <div className="mt-3 flex gap-3">
          <button className="h-9 w-9 rounded-full bg-slate-950 ring-2 ring-offset-2 ring-violet-600 dark:ring-offset-slate-950"></button>
          <button className="h-9 w-9 rounded-full border border-slate-300 bg-white"></button>
          <button className="h-9 w-9 rounded-full bg-rose-600"></button>
        </div>
      </div>
      <div className="mt-7">
        <b className="mb-2 block font-black">
            المواصفات :
        </b>
        <p className="text-sm leading-8 text-slate-500 dark:text-slate-400">
         
            يتميز بوجود بطاقة SIM مزدوجة بطاقة فعلية وبطاقة e-SIM يمكنك فتح قفل
            هاتفك الايفون وتسجيل الدخول إلى التطبيقات والحسابات بسهولة، وتعدّ
            خاصية معرف الوجه الأسرع والأكثر أماناً للمصادقة عن طريق بصمة الوجه
            بتقنية بايونيك A12 والتي تعد أذكى وأقوى شريحة شكلت أكثر كاميرات
            العالم شهرة عصراً جديداً من التصوير الفوتوغرافي حيث يعمل جهاز
            الاستشعار الابتكاري بخاصية ISP والمحرك العصبي ما يمكّنك من التقاط
            صور لم يسبق لها مثيل كاميرا بعدسة واحدة تجعل الأشخاص الموجودين في
            الأمام على عكس نطاق تركيز دقيق في نطاق الخلفية نظرة غير الواضح عامة
        </p>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          className="shine rounded-2xl bg-slate-950 px-8 py-3.5 font-black text-white hover:bg-violet-700"
        >
            اضف للعربة
        </button>
        <b className="text-2xl">
          34000{" "}
            جنية
        </b>
      </div>
    </div>
  );
}

export default ProductDiscription;
