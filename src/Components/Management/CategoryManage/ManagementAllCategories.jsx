import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import ManageCategoryCard from "./ManageCategoryCard";

import { ImagePlus, LayoutGrid } from "lucide-react";

import ManagementTable from "../ManagementTable";

import Pagination from "../../Utility/Pagination";

import {
  createCategory,
  getCategories,
} from "../../../features/categories/categorySlice";

function ManagementAllCategories() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [image, setImage] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [createError, setCreateError] = useState(null);

  const categories = useSelector(
    (state) => state.categories.categories,
  );

  const paginationResult = useSelector(
    (state) => state.categories.paginationResult,
  );

  useEffect(() => {
    dispatch(getCategories(currentPage));
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);

      return;
    }

    const imageUrl = URL.createObjectURL(image);

    setPreviewUrl(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCreateError(null);

    if (!name.trim()) {
      return;
    }

    const formData = new FormData();

    formData.append("name", name.trim());

    if (image) {
      formData.append("image", image);
    }

    try {
      await dispatch(createCategory(formData)).unwrap();

      setName("");

      setImage(null);

      if (currentPage === 1) {
        dispatch(getCategories(1));
      } else {
        setCurrentPage(1);
      }
    } catch (error) {
      setCreateError(error);
    }
  };

  const handleCategoryDeleted = () => {
    if (categories.length === 1 && currentPage > 1) {
      setCurrentPage((page) => page - 1);
    } else {
      dispatch(getCategories(currentPage));
    }
  };

  return (
    <div>
      <div className="mb-6">
        <small className="font-black text-violet-600">
          إدارة المتجر
        </small>

        <h1 className="mt-1 text-3xl font-black">
          <span className="text-violet-600">
            <LayoutGrid />
          </span>

          التصنيفات
        </h1>
      </div>

      <details className="mb-5 rounded-[28px] border border-violet-200 bg-white p-5 shadow-soft dark:border-violet-900 dark:bg-slate-900">
        <summary className="cursor-pointer font-black text-violet-700">
          إضافة
        </summary>

        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="cursor-pointer rounded-[26px] border-2 border-dashed border-slate-300 bg-slate-50 p-7 text-center dark:border-slate-700 dark:bg-slate-800">
              <span className="text-6xl text-violet-600">
                {image ? (
                  <img
                    src={previewUrl}
                    alt="Category"
                    className="mx-auto h-40 w-40 rounded-2xl object-cover"
                  />
                ) : (
                  <span className="text-6xl text-violet-600">
                    <ImagePlus />
                  </span>
                )}
              </span>

              <b className="mt-2 block">
                إضافة صورة التصنيف
              </b>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                اختر صورة مناسبة للتصنيف
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files?.[0] || null);
                }}
                hidden
              />
            </label>

            <div className="flex flex-col justify-center">
              <label className="mb-2 block font-black">
                اسم التصنيف
              </label>

              <input
                type="text"
                placeholder="اسم التصنيف"
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                أدخل اسم التصنيف الذي سيظهر للمستخدمين
              </p>
            </div>
          </div>

          {createError && (
            <p className="mt-4 text-sm font-bold text-red-500">
              {createError}
            </p>
          )}

          <button
            type="submit"
            className="cursor-pointer mt-5 rounded-2xl bg-violet-700 px-5 py-3 font-black text-white"
          >
            إضافة التصنيف
          </button>
        </form>
      </details>

      <ManagementTable>
        {categories.map((category) => (
          <ManageCategoryCard
            key={category._id}
            category={category}
            onDeleted={handleCategoryDeleted}
          />
        ))}
      </ManagementTable>

      <Pagination
        currentPage={currentPage}
        numberOfPages={paginationResult?.numberOfPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ManagementAllCategories;