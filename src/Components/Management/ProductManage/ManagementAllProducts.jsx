import React from "react";
import ManageProductsCard from "./ManageProductsCard";
import Pagination from "../../Utility/Pagination";
import { ImagePlus, Package } from "lucide-react";

function ManagementAllProducts() {
  return (
    <div>
      <div className="mb-6">
        <small
          className="font-black text-violet-600"
        >
          إدارة المتجر
        </small>
        <h1 className="mt-1 text-3xl font-black">
          <span className="text-violet-600">
            <Package/>
          </span>
            المنتجات
        </h1>
      </div>
      <details className="mb-5 rounded-[28px] border border-violet-200 bg-white p-5 shadow-soft dark:border-violet-900 dark:bg-slate-900">
        <summary
          className="cursor-pointer font-black text-violet-700"
         
        >
          إضافة منتج جديد
        </summary>
       <form
  className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
>
  <div className="grid gap-5 md:grid-cols-2">

    <label className="md:col-span-2 cursor-pointer rounded-[26px] border-2 border-dashed border-slate-300 bg-slate-50 p-7 text-center dark:border-slate-700 dark:bg-slate-800">
      <span className="text-6xl text-violet-600">
        <ImagePlus/>
      </span>

      <b className="mt-2 block">
        إضافة صور للمنتج
      </b>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        يمكنك اختيار أكثر من صورة للمنتج
      </p>

      <input type="file" multiple hidden />
    </label>


    <div className="md:col-span-2">
      <label className="mb-2 block font-bold">
        اسم المنتج
      </label>

      <input
        type="text"
        placeholder="اسم المنتج"
        className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
      />
    </div>


    <div className="md:col-span-2">
      <label className="mb-2 block font-bold">
        وصف المنتج
      </label>

      <textarea
        placeholder="وصف المنتج..."
        className="min-h-28 w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
      />
    </div>


    <div>
      <label className="mb-2 block font-bold">
        السعر
      </label>

      <input
        type="number"
        placeholder="السعر"
        className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
      />
    </div>


    <div>
      <label className="mb-2 block font-bold">
        الكمية
      </label>

      <input
        type="number"
        placeholder="الكمية"
        className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
      />
    </div>


    <div>
      <label className="mb-2 block font-bold">
        التصنيف
      </label>

      <select className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800">
        <option>Electronics</option>
      </select>
    </div>


    <div>
      <label className="mb-2 block font-bold">
        العلامة التجارية
      </label>

      <select className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800">
        <option>Samsung</option>
      </select>
    </div>


    <div className="md:col-span-2">
      <label className="mb-2 block font-bold">
        التصنيفات الفرعية
      </label>

      <select
        multiple
        className="min-h-32 w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
      >
        <option>Smart Phones</option>
        <option>Android Phones</option>
        <option>5G Phones</option>
        <option>AMOLED Phones</option>
      </select>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        يمكنك اختيار أكثر من تصنيف فرعي
      </p>
    </div>


    <div className="md:col-span-2">
      <label className="mb-2 block font-bold">
        ألوان المنتج
      </label>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="مثال: أسود"
          className="flex-1 rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
        />

        <button
          type="button"
          className="rounded-2xl bg-violet-600 px-6 font-bold text-white"
        >
          إضافة لون
        </button>
      </div>


     
    </div>

        <hr />

    <div className="md:col-span-2 flex justify-end gap-3 pt-2">
      <button
        type="button"
        className="rounded-2xl border border-slate-200 px-6 py-3 font-bold dark:border-slate-700"
      >
        إلغاء
      </button>

      <button
        type="submit"
        className="rounded-2xl bg-violet-600 px-7 py-3 font-bold text-white"
      >
        إضافة المنتج
      </button>

    </div>

  </div>
</form>
      
      </details>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <ManageProductsCard />
        <ManageProductsCard />
        <ManageProductsCard />
        <ManageProductsCard />
        <ManageProductsCard />
        <ManageProductsCard />
        <ManageProductsCard />
      </div>
      <Pagination />
    </div>
  );
}

export default ManagementAllProducts;
