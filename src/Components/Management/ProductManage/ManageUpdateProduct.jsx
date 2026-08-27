import { ImagePlus } from "lucide-react";
import React from "react";

function ManageUpdateProduct() {
  return (
    <div >
      <div className="mb-6 flex items-center justify-between">
        <h1
          className="text-3xl font-black"
        >
          تعديل المنتج
        </h1>

        <button
          type="button"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black dark:border-slate-700 dark:bg-slate-900"
        >
          رجوع
        </button>
      </div>

      <form className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-5 md:grid-cols-2">

          <div className="md:col-span-2">
            <label className="mb-2 block font-black">
              صور المنتج
            </label>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

              <div className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500"
                  alt="Product"
                  className="h-40 w-full object-cover"
                />

                <button
                  type="button"
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow dark:bg-slate-900 dark:text-white"
                >
                  ×
                </button>

                <div className="p-2 text-center text-xs font-bold text-slate-500">
                  الصورة الرئيسية
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
                  alt="Product"
                  className="h-40 w-full object-cover"
                />

                <button
                  type="button"
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow dark:bg-slate-900 dark:text-white"
                >
                  ×
                </button>
              </div>

              <div className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"
                  alt="Product"
                  className="h-40 w-full object-cover"
                />

                <button
                  type="button"
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow dark:bg-slate-900 dark:text-white"
                >
                  ×
                </button>
              </div>

              <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-slate-300 bg-slate-50 text-center dark:border-slate-700 dark:bg-slate-800">
                <span className="text-4xl text-violet-600">
                  <ImagePlus/>
                </span>

                <span className="mt-2 text-sm font-black">
                  إضافة صور
                </span>

                <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  صور جديدة
                </span>

                <input type="file" multiple hidden />
              </label>

            </div>
          </div>


          <div className="md:col-span-2">
            <label className="mb-2 block font-black">
              اسم المنتج
            </label>

            <input
              value="هاتف ذكي AMOLED"
              readOnly
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>


          <div className="md:col-span-2">
            <label className="mb-2 block font-black">
              وصف المنتج
            </label>

            <textarea
              readOnly
              className="min-h-28 w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              defaultValue="هاتف ذكي بشاشة AMOLED عالية الجودة، كاميرا متطورة وأداء قوي للاستخدام اليومي."
            />
          </div>


          <div>
            <label className="mb-2 block font-black">
              السعر
            </label>

            <input
              value="1699"
              readOnly
              type="number"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>


          <div>
            <label className="mb-2 block font-black">
              الكمية
            </label>

            <input
              value="34"
              readOnly
              type="number"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>


          <div>
            <label className="mb-2 block font-black">
              التصنيف
            </label>

            <select
              defaultValue="electronics"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home & Living</option>
            </select>
          </div>


          <div>
            <label className="mb-2 block font-black">
              العلامة التجارية
            </label>

            <select
              defaultValue="samsung"
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="samsung">Samsung</option>
              <option value="apple">Apple</option>
              <option value="xiaomi">Xiaomi</option>
            </select>
          </div>


          <div className="md:col-span-2">
            <label className="mb-2 block font-black">
              التصنيفات الفرعية
            </label>

            <select
              multiple
              defaultValue={[
                "smartphones",
                "android",
                "5g"
              ]}
              className="min-h-32 w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="smartphones">
                Smart Phones
              </option>

              <option value="android">
                Android Phones
              </option>

              <option value="5g">
                5G Phones
              </option>

              <option value="amoled">
                AMOLED Phones
              </option>

              <option value="gaming">
                Gaming Phones
              </option>
            </select>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              التصنيفات المحددة حاليًا: Smart Phones، Android Phones، 5G Phones
            </p>
          </div>


          <div className="md:col-span-2">
            <label className="mb-2 block font-black">
              ألوان المنتج
            </label>

            <div className="flex gap-3">
              <input
                placeholder="إضافة لون جديد"
                className="flex-1 rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              />

              <button
                type="button"
                className="rounded-2xl bg-violet-700 px-6 py-3.5 font-black text-white"
              >
                إضافة لون
              </button>
            </div>


            <div className="mt-4 flex flex-wrap gap-2">

              <span className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold dark:bg-slate-800">
                أسود

                <button
                  type="button"
                  className="text-slate-400 hover:text-red-500"
                >
                  ×
                </button>
              </span>

              <span className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold dark:bg-slate-800">
                أبيض

                <button
                  type="button"
                  className="text-slate-400 hover:text-red-500"
                >
                  ×
                </button>
              </span>

              <span className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold dark:bg-slate-800">
                أزرق

                <button
                  type="button"
                  className="text-slate-400 hover:text-red-500"
                >
                  ×
                </button>
              </span>

            </div>
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

export default ManageUpdateProduct;