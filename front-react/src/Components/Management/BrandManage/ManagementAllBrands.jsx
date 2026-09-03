import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ManageBrandCard from "./ManageBrandCard";
import ManagementTable from "../ManagementTable";
import Pagination from "../../Utility/Pagination";

import { GitBranch, ImagePlus } from "lucide-react";

import { createBrand, getBrands } from "../../../features/brands/brandSlice";

function ManagementAllBrands() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [createError, setCreateError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const brands = useSelector((state) => state.brands.brands);

  const paginationResult = useSelector(
    (state) => state.brands.paginationResult,
  );

  useEffect(() => {
    dispatch(
      getBrands({
        page: currentPage,
        keyword: searchKeyword,
      }),
    );
  }, [currentPage, searchKeyword, dispatch]);

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

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  };

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
      await dispatch(createBrand(formData)).unwrap();

      setName("");

      setImage(null);

      if (currentPage === 1) {
        dispatch(
          getBrands({
            page: 1,
            keyword: searchKeyword,
          }),
        );
      } else {
        setCurrentPage(1);
      }
    } catch (error) {
      setCreateError(error);
    }
  };

  const handleBrandDeleted = () => {
    if (brands.length === 1 && currentPage > 1) {
      setCurrentPage((page) => page - 1);
    } else {
      dispatch(
        getBrands({
          page: currentPage,
          keyword: searchKeyword,
        }),
      );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <small className="font-black text-violet-600">إدارة المتجر</small>

        <h1 className="mt-1 text-3xl font-black">
          <span className="text-violet-600">
            <GitBranch />
          </span>
          الماركات
        </h1>
      </div>

      <details className="mb-5 rounded-[28px] border border-violet-200 bg-white p-5 shadow-soft dark:border-violet-900 dark:bg-slate-900">
        <summary className="cursor-pointer font-black text-violet-700">
          إضافة جديد
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
                    alt="Brand"
                    className="mx-auto h-40 w-40 rounded-2xl object-cover"
                  />
                ) : (
                  <ImagePlus />
                )}
              </span>

              <b className="mt-2 block">إضافة صورة الماركة</b>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                اختر صورة مناسبة للماركة
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
              <label className="mb-2 block font-black">اسم الماركة</label>

              <input
                type="text"
                placeholder="اسم الماركة"
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                أدخل اسم الماركة الذي سيظهر للمستخدمين
              </p>
            </div>
          </div>

          {createError && (
            <p className="mt-4 text-sm font-bold text-red-500">{createError}</p>
          )}

          <button
            type="submit"
            className="mt-5 cursor-pointer rounded-2xl bg-violet-700 px-5 py-3 font-black text-white"
          >
            إضافة الماركة
          </button>
        </form>
      </details>

      <ManagementTable
        searchValue={searchKeyword}
        onSearchChange={handleSearchChange}
      >
        {brands.map((brand) => (
          <ManageBrandCard
            key={brand._id}
            brand={brand}
            onDeleted={handleBrandDeleted}
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

export default ManagementAllBrands;
