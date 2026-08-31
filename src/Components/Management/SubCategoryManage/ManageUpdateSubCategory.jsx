import { useEffect, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  getSubCategory,
  updateSubCategory,
} from "../../../features/subCategories/subCategorySlice";

import { getAllCategories } from "../../../features/categories/categorySlice";

function ManageUpdateSubCategory() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [updateError, setUpdateError] = useState(null);

  const subCategory = useSelector(
    (state) => state.subCategories.subCategory,
  );

  const categories = useSelector(
    (state) => state.categories.allCategories,
  );

  useEffect(() => {
    dispatch(getSubCategory(id));
    dispatch(getAllCategories());
  }, [dispatch, id]);

  useEffect(() => {
    if (subCategory) {
      setName(subCategory.name || "");
      setCategoryId(subCategory.category || "");
    }
  }, [subCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdateError(null);

    if (!name.trim() || !categoryId) {
      return;
    }

    const subCategoryData = {
      name: name.trim(),
      category: categoryId,
    };

    try {
      await dispatch(
        updateSubCategory({
          id,
          subCategoryData,
        }),
      ).unwrap();

      navigate("/manageallsubcategories");
    } catch (error) {
      setUpdateError(error);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <small className="font-black text-violet-600">
            إدارة المتجر
          </small>

          <h1 className="mt-1 flex items-center gap-2 text-3xl font-black">
            <span className="text-violet-600">
              <LayoutGrid />
            </span>

            تعديل التصنيف الفرعي
          </h1>
        </div>

        <button
          type="button"
          onClick={() => navigate("/manageallsubcategories")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 font-black dark:border-slate-700 dark:bg-slate-900"
        >
          رجوع
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <label className="mb-2 block font-black">
              اسم التصنيف الفرعي
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              required
            />

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              يمكنك تعديل اسم التصنيف الفرعي
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <label className="mb-2 block font-black">
              التصنيف الرئيسي
            </label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              required
            >
              <option value="">
                اختر التصنيف الرئيسي
              </option>

              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              يمكنك تغيير التصنيف الرئيسي
            </p>
          </div>
        </div>

        {updateError && (
          <p className="mt-4 text-sm font-bold text-red-500">
            {updateError}
          </p>
        )}

        <button
          type="submit"
          className="mt-5 cursor-pointer rounded-2xl bg-violet-700 px-6 py-3.5 font-black text-white"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
}

export default ManageUpdateSubCategory;