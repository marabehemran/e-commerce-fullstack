import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ManageProductsCard from "./ManageProductsCard";
import Pagination from "../../Utility/Pagination";

import { ImagePlus, LayoutGrid, Plus, X } from "lucide-react";

import {
  createProduct,
  getProducts,
} from "../../../features/products/productSlice";

import { getAllCategories } from "../../../features/categories/categorySlice";

import { getAllBrands } from "../../../features/brands/brandSlice";

import { getSubCategoriesByCategory } from "../../../features/subCategories/subCategorySlice";

function ManagementAllProducts() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [imageCover, setImageCover] = useState(null);
  const [images, setImages] = useState([]);
  const [colorName, setColorName] = useState("");
  const [colorValue, setColorValue] = useState("#000000");
  const [colors, setColors] = useState([]);
  const [createError, setCreateError] = useState(null);

  const { products, paginationResult, loading } = useSelector(
    (state) => state.products,
  );

  const categories = useSelector((state) => state.categories.allCategories);

  const brands = useSelector((state) => state.brands.allBrands);

  const categorySubCategories = useSelector(
    (state) => state.subCategories.categorySubCategories,
  );

  useEffect(() => {
    dispatch(
      getProducts({
        page: currentPage,
        keyword: searchKeyword,
      }),
    );
  }, [dispatch, currentPage, searchKeyword]);

  useEffect(() => {
    dispatch(getAllCategories());

    dispatch(getAllBrands());
  }, [dispatch]);

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;

    setCategoryId(selectedCategoryId);

    setSelectedSubCategories([]);

    if (selectedCategoryId) {
      dispatch(getSubCategoriesByCategory(selectedCategoryId));
    }
  };

  const handleSubCategoryChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions).map(
      (option) => option.value,
    );

    setSelectedSubCategories(selectedValues);
  };

  const handleImagesChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    setImages(selectedImages);
  };

  const handleAddColor = () => {
    if (!colorName.trim()) {
      return;
    }

    const colorExists = colors.some(
      (item) => item.name.toLowerCase() === colorName.trim().toLowerCase(),
    );

    if (!colorExists) {
      setColors([
        ...colors,
        {
          name: colorName.trim(),
          value: colorValue,
        },
      ]);
    }

    setColorName("");
    setColorValue("#000000");
  };

  const handleRemoveColor = (colorToRemove) => {
    setColors(colors.filter((item) => item.value !== colorToRemove.value));
  };

  const resetForm = () => {
    setTitle("");

    setDescription("");

    setPrice("");

    setPriceAfterDiscount("");

    setQuantity("");

    setCategoryId("");

    setBrandId("");

    setSelectedSubCategories([]);

    setImageCover(null);

    setImages([]);

    setColorName("");

    setColorValue("#000000");

    setColors([]);

    setCreateError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCreateError(null);

    if (
      !title.trim() ||
      !description.trim() ||
      !price ||
      !quantity ||
      !categoryId ||
      !imageCover
    ) {
      setCreateError("يرجى تعبئة جميع الحقول المطلوبة");

      return;
    }

    const formData = new FormData();

    formData.append("title", title.trim());

    formData.append("description", description.trim());

    formData.append("price", price);

    formData.append("quantity", quantity);

    formData.append("category", categoryId);

    formData.append("imageCover", imageCover);

    if (priceAfterDiscount) {
      formData.append("priceAfterDiscount", priceAfterDiscount);
    }

    if (brandId) {
      formData.append("brand", brandId);
    }

    selectedSubCategories.forEach((subCategoryId) => {
      formData.append("subCategories", subCategoryId);
    });

    colors.forEach((item) => {
      formData.append("colors", JSON.stringify(item));
    });

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await dispatch(createProduct(formData)).unwrap();

      resetForm();

      setCurrentPage(1);

      dispatch(
        getProducts({
          page: 1,
          keyword: searchKeyword,
        }),
      );
    } catch (error) {
      setCreateError(error);
    }
  };

  const handleProductDeleted = () => {
    dispatch(
      getProducts({
        page: currentPage,
        keyword: searchKeyword,
      }),
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
          <LayoutGrid />
        </div>

        <div>
          <h1 className="text-2xl font-black">إدارة المنتجات</h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            إضافة وتعديل وحذف المنتجات
          </p>
        </div>
      </div>

      <details className="rounded-[28px] border border-violet-200 bg-white p-5 shadow-soft dark:border-violet-900 dark:bg-slate-900">
        <summary className="cursor-pointer font-black text-violet-700 dark:text-violet-300">
          إضافة منتج جديد
        </summary>

        <form onSubmit={handleSubmit} className="mt-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block font-black">الصورة الرئيسية</label>

              <label className="block cursor-pointer rounded-[26px] border-2 border-dashed border-slate-300 bg-slate-50 p-7 text-center transition hover:border-violet-400 dark:border-slate-700 dark:bg-slate-800">
                <ImagePlus size={38} className="mx-auto text-violet-600" />

                <b className="mt-3 block">إضافة الصورة الرئيسية</b>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  اختر الصورة الرئيسية للمنتج
                </p>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImageCover(e.target.files?.[0] || null)}
                />
              </label>

              {imageCover && (
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {imageCover.name}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-black">الصور الإضافية</label>

              <label className="block cursor-pointer rounded-[26px] border-2 border-dashed border-slate-300 bg-slate-50 p-7 text-center transition hover:border-violet-400 dark:border-slate-700 dark:bg-slate-800">
                <ImagePlus size={38} className="mx-auto text-violet-600" />

                <b className="mt-3 block">إضافة صور إضافية</b>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  يمكنك اختيار أكثر من صورة
                </p>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImagesChange}
                />
              </label>

              {images.length > 0 && (
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  تم اختيار {images.length} صور
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-black">اسم المنتج</label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="اسم المنتج"
                className="w-full rounded-2xl border border-slate-200 p-3.5 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="mb-2 block font-black">الكمية</label>

              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="الكمية"
                className="w-full rounded-2xl border border-slate-200 p-3.5 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-black">وصف المنتج</label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="وصف المنتج"
                className="min-h-32 w-full rounded-2xl border border-slate-200 p-3.5 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="mb-2 block font-black">السعر</label>

              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="السعر"
                className="w-full rounded-2xl border border-slate-200 p-3.5 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="mb-2 block font-black">السعر بعد الخصم</label>

              <input
                type="number"
                min="0"
                value={priceAfterDiscount}
                onChange={(e) => setPriceAfterDiscount(e.target.value)}
                placeholder="اختياري"
                className="w-full rounded-2xl border border-slate-200 p-3.5 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="mb-2 block font-black">التصنيف</label>

              <select
                value={categoryId}
                onChange={handleCategoryChange}
                className="w-full rounded-2xl border border-slate-200 p-3.5 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="">اختر التصنيف</option>

                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-black">البراند</label>

              <select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 p-3.5 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="">بدون براند</option>

                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-black">التصنيفات الفرعية</label>

              <select
                multiple
                value={selectedSubCategories}
                onChange={handleSubCategoryChange}
                disabled={!categoryId}
                className="min-h-32 w-full rounded-2xl border border-slate-200 p-3.5 outline-none transition focus:border-violet-500 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800"
              >
                {categorySubCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-black">الألوان</label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  placeholder="اسم اللون"
                  className="flex-1 rounded-2xl border border-slate-200 p-3.5 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800"
                />

                <input
                  type="color"
                  value={colorValue}
                  onChange={(e) => setColorValue(e.target.value)}
                  className="h-12 w-16 cursor-pointer rounded-xl border border-slate-200 p-1 dark:border-slate-700 dark:bg-slate-800"
                />

                <button
                  type="button"
                  onClick={handleAddColor}
                  className="grid size-12 cursor-pointer place-items-center rounded-2xl bg-violet-100 text-violet-700 transition hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-300"
                >
                  <Plus />
                </button>
              </div>

              {colors.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {colors.map((item) => (
                    <div
                      key={item.value}
                      className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800"
                    >
                      <span
                        className="h-5 w-5 rounded-full border border-slate-300"
                        style={{ backgroundColor: item.value }}
                      />

                      <span>{item.name}</span>

                      <button
                        type="button"
                        onClick={() => handleRemoveColor(item)}
                        className="cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {createError && (
            <p className="mt-4 font-bold text-rose-600">{createError}</p>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-2xl bg-violet-700 px-6 py-3 font-black text-white transition hover:bg-violet-800 disabled:opacity-50"
            >
              {loading ? "جاري الإضافة..." : "إضافة المنتج"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="cursor-pointer rounded-2xl bg-slate-100 px-6 py-3 font-black text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
            >
              إلغاء
            </button>
          </div>
        </form>
      </details>

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <input
          type="text"
          placeholder="بحث عن منتج..."
          value={searchKeyword}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full rounded-2xl border bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
        />
      </div>

      {loading && products.length === 0 ? (
        <p className="text-center">جاري تحميل المنتجات...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ManageProductsCard
              key={product._id}
              product={product}
              onDeleted={handleProductDeleted}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        numberOfPages={paginationResult?.numberOfPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ManagementAllProducts;
