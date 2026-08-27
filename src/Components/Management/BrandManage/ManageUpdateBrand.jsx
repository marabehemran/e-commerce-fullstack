
import { ImagePlus, LayoutGrid } from "lucide-react";
import React from "react";

function ManageUpdateBrand() {
  return (
    <div>

      <div className="mb-6 flex items-center justify-between">

        <div>
          <small className="font-black text-violet-600">
            إدارة المتجر
          </small>

          <h1 className="mt-1 flex items-center gap-2 text-3xl font-black">
            <span className="text-violet-600">
              <LayoutGrid/>
            </span>

            تعديل الماركة
          </h1>
        </div>

        <button
          type="button"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black dark:border-slate-700 dark:bg-slate-900"
        >
          رجوع
        </button>

      </div>


      <form className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">

        <div className="grid gap-5 md:grid-cols-2">

          <label className="cursor-pointer rounded-[26px] border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-800">

            <div className="flex justify-center">

              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500"
                alt="Category"
                className="h-40 w-40 rounded-2xl object-cover"
              />

            </div>

            <span className="mt-4 text-4xl text-violet-600">
              <ImagePlus/>
            </span>

            <b className="mt-1 block">
              تغيير صورة الماركة
            </b>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              اختر صورة جديدة للماركة
            </p>

            <input
              type="file"
              accept="image/*"
              hidden
            />

          </label>


          <div className="flex flex-col justify-center">

            <label className="mb-2 block font-black">
              اسم الماركة
            </label>

            <input
              type="text"
              defaultValue="Electronics"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              يمكنك تعديل اسم الماركة الحالي.
            </p>

          </div>

        </div>


        <button
          type="submit"
          className="mt-5 rounded-2xl bg-violet-700 px-6 py-3.5 font-black text-white"
        >
          حفظ التعديلات
        </button>

      </form>

    </div>
  );
}

export default ManageUpdateBrand;