import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ManageSubCategoryCard from "./ManageSubCategoryCard";
import ManagementTable from "../ManagementTable";
import Pagination from "../../Utility/Pagination";

import { GitBranch } from "lucide-react";

import {
  createSubCategory,
  getSubCategories,
} from "../../../features/subCategories/subCategorySlice";

import { getAllCategories } from "../../../features/categories/categorySlice";

function ManagementAllSubCategories() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [createError, setCreateError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const subCategories = useSelector(
    (state) => state.subCategories.subCategories,
  );

  const paginationResult = useSelector(
    (state) => state.subCategories.paginationResult,
  );

  const categories = useSelector((state) => state.categories.allCategories);

  useEffect(() => {
    dispatch(
      getSubCategories({
        page: currentPage,
        keyword: searchKeyword,
      }),
    );
  }, [currentPage, searchKeyword, dispatch]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCreateError(null);

    if (!name.trim() || !categoryId) {
      return;
    }

    const subCategoryData = {
      name: name.trim(),
      category: categoryId,
    };

    try {
      await dispatch(createSubCategory(subCategoryData)).unwrap();

      setName("");
      setCategoryId("");

      if (currentPage === 1) {
        dispatch(
          getSubCategories({
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

  const handleSubCategoryDeleted = () => {
    if (subCategories.length === 1 && currentPage > 1) {
      setCurrentPage((page) => page - 1);
    } else {
      dispatch(
        getSubCategories({
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
          التصنيفات الفرعية
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
            <div className="flex flex-col justify-center">
              <label className="mb-2 block font-black">
                اسم التصنيف الفرعي
              </label>

              <input
                type="text"
                placeholder="اسم التصنيف الفرعي"
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                أدخل اسم التصنيف الفرعي الذي سيظهر للمستخدمين
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <label className="mb-2 block font-black">التصنيف الرئيسي</label>

              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
                required
              >
                <option value="">اختر التصنيف الرئيسي</option>

                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                اختر التصنيف الرئيسي الذي ينتمي إليه التصنيف الفرعي
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
            إضافة التصنيف الفرعي
          </button>
        </form>
      </details>

      <ManagementTable
        searchValue={searchKeyword}
        onSearchChange={handleSearchChange}
      >
        {subCategories.map((subCategory) => (
          <ManageSubCategoryCard
            key={subCategory._id}
            subCategory={subCategory}
            onDeleted={handleSubCategoryDeleted}
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

export default ManagementAllSubCategories;
