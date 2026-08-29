import React, {
  useEffect,
  useState,
} from "react";

import {
  ImagePlus,
  LayoutGrid,
  Plus,
  X,
} from "lucide-react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import ManageProductsCard from "./ManageProductsCard";

import Pagination from "../../Utility/Pagination";

import {
  createProduct,
  getProducts,
} from "../../../features/products/productSlice";

import {
  getAllCategories,
} from "../../../features/categories/categorySlice";

import {
  getAllBrands,
} from "../../../features/brands/brandSlice";

import {
  getSubCategoriesByCategory,
} from "../../../features/subCategories/subCategorySlice";

function ManagementAllProducts() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] =
    useState(1);

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] = useState("");

  const [
    priceAfterDiscount,
    setPriceAfterDiscount,
  ] = useState("");

  const [quantity, setQuantity] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [brandId, setBrandId] =
    useState("");

  const [
    selectedSubCategories,
    setSelectedSubCategories,
  ] = useState([]);

  const [imageCover, setImageCover] =
    useState(null);

  const [images, setImages] =
    useState([]);

  const [color, setColor] = useState("");

  const [colors, setColors] =
    useState([]);

  const [createError, setCreateError] =
    useState(null);

  const {
    products,
    paginationResult,
    loading,
  } = useSelector(
    (state) => state.products,
  );

  const categories = useSelector(
    (state) =>
      state.categories.allCategories,
  );

  const brands = useSelector(
    (state) => state.brands.allBrands,
  );

  const categorySubCategories =
    useSelector(
      (state) =>
        state.subCategories
          .categorySubCategories,
    );

  useEffect(() => {
    dispatch(
      getProducts({
        page: currentPage,
      }),
    );
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(getAllCategories());

    dispatch(getAllBrands());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    const selectedCategoryId =
      e.target.value;

    setCategoryId(
      selectedCategoryId,
    );

    setSelectedSubCategories([]);

    if (selectedCategoryId) {
      dispatch(
        getSubCategoriesByCategory(
          selectedCategoryId,
        ),
      );
    }
  };

  const handleSubCategoryChange = (
    e,
  ) => {
    const selectedValues =
      Array.from(
        e.target.selectedOptions,
      ).map(
        (option) => option.value,
      );

    setSelectedSubCategories(
      selectedValues,
    );
  };

  const handleImagesChange = (e) => {
    const selectedImages =
      Array.from(e.target.files);

    setImages(selectedImages);
  };

  const handleAddColor = () => {
    if (!color.trim()) {
      return;
    }

    if (!colors.includes(color)) {
      setColors([
        ...colors,
        color,
      ]);
    }

    setColor("");
  };

  const handleRemoveColor = (
    colorToRemove,
  ) => {
    setColors(
      colors.filter(
        (item) =>
          item !== colorToRemove,
      ),
    );
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

    setColor("");

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
      setCreateError(
        "يرجى تعبئة جميع الحقول المطلوبة",
      );

      return;
    }

    const formData =
      new FormData();

    formData.append(
      "title",
      title.trim(),
    );

    formData.append(
      "description",
      description.trim(),
    );

    formData.append(
      "price",
      price,
    );

    formData.append(
      "quantity",
      quantity,
    );

    formData.append(
      "category",
      categoryId,
    );

    formData.append(
      "imageCover",
      imageCover,
    );

    if (priceAfterDiscount) {
      formData.append(
        "priceAfterDiscount",
        priceAfterDiscount,
      );
    }

    if (brandId) {
      formData.append(
        "brand",
        brandId,
      );
    }

    selectedSubCategories.forEach(
      (subCategoryId) => {
        formData.append(
          "subCategories",
          subCategoryId,
        );
      },
    );

    colors.forEach((item) => {
      formData.append(
        "colors",
        item,
      );
    });

    images.forEach((image) => {
      formData.append(
        "images",
        image,
      );
    });

    try {
      await dispatch(
        createProduct(formData),
      ).unwrap();

      resetForm();

      setCurrentPage(1);

      dispatch(
        getProducts({
          page: 1,
        }),
      );
    } catch (error) {
      setCreateError(error);
    }
  };

  const handleProductDeleted =
    () => {
      dispatch(
        getProducts({
          page: currentPage,
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
          <h1 className="text-2xl font-black">
            إدارة المنتجات
          </h1>

          <p className="text-sm text-slate-500">
            إضافة وتعديل وحذف المنتجات
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
      >

        <div className="grid gap-5 md:grid-cols-2">

          <div className="md:col-span-2">
            <label className="mb-2 block font-black">
              الصورة الرئيسية
            </label>

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 p-6 text-slate-500 dark:border-slate-700">
              <ImagePlus />

              <span>
                اختر الصورة الرئيسية
              </span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setImageCover(
                    e.target.files[0],
                  )
                }
              />
            </label>

            {imageCover && (
              <p className="mt-2 text-sm text-slate-500">
                {imageCover.name}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-black">
              الصور الإضافية
            </label>

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 p-6 text-slate-500 dark:border-slate-700">
              <ImagePlus />

              <span>
                اختر صور إضافية
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={
                  handleImagesChange
                }
              />
            </label>

            {images.length > 0 && (
              <p className="mt-2 text-sm text-slate-500">
                تم اختيار{" "}
                {images.length} صور
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-black">
              اسم المنتج
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value,
                )
              }
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
              placeholder="اسم المنتج"
            />
          </div>

          <div>
            <label className="mb-2 block font-black">
              الكمية
            </label>

            <input
              type="number"
              min="0"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  e.target.value,
                )
              }
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
              placeholder="الكمية"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-black">
              وصف المنتج
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value,
                )
              }
              className="min-h-32 w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
              placeholder="وصف المنتج"
            />
          </div>

          <div>
            <label className="mb-2 block font-black">
              السعر
            </label>

            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value,
                )
              }
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
              placeholder="السعر"
            />
          </div>

          <div>
            <label className="mb-2 block font-black">
              السعر بعد الخصم
            </label>

            <input
              type="number"
              min="0"
              value={
                priceAfterDiscount
              }
              onChange={(e) =>
                setPriceAfterDiscount(
                  e.target.value,
                )
              }
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
              placeholder="اختياري"
            />
          </div>

          <div>
            <label className="mb-2 block font-black">
              التصنيف
            </label>

            <select
              value={categoryId}
              onChange={
                handleCategoryChange
              }
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
            >
              <option value="">
                اختر التصنيف
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category._id}
                    value={
                      category._id
                    }
                  >
                    {category.name}
                  </option>
                ),
              )}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-black">
              البراند
            </label>

            <select
              value={brandId}
              onChange={(e) =>
                setBrandId(
                  e.target.value,
                )
              }
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
            >
              <option value="">
                بدون براند
              </option>

              {brands.map(
                (brand) => (
                  <option
                    key={brand._id}
                    value={
                      brand._id
                    }
                  >
                    {brand.name}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-black">
              التصنيفات الفرعية
            </label>

            <select
              multiple
              value={
                selectedSubCategories
              }
              onChange={
                handleSubCategoryChange
              }
              disabled={!categoryId}
              className="min-h-32 w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 disabled:opacity-50 dark:border-slate-700"
            >
              {categorySubCategories.map(
                (subCategory) => (
                  <option
                    key={
                      subCategory._id
                    }
                    value={
                      subCategory._id
                    }
                  >
                    {
                      subCategory.name
                    }
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-black">
              الألوان
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={color}
                onChange={(e) =>
                  setColor(
                    e.target.value,
                  )
                }
                className="flex-1 rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
                placeholder="مثال: Black"
              />

              <button
                type="button"
                onClick={
                  handleAddColor
                }
                className="grid size-12 cursor-pointer place-items-center rounded-2xl bg-violet-100 text-violet-700"
              >
                <Plus />
              </button>
            </div>

            {colors.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {colors.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800"
                    >
                      <span>
                        {item}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveColor(
                            item,
                          )
                        }
                        className="cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>

        </div>

        {createError && (
          <p className="mt-4 font-bold text-rose-600">
            {createError}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-2xl bg-violet-700 px-6 py-3 font-black text-white disabled:opacity-50"
          >
            {loading
              ? "جاري الإضافة..."
              : "إضافة المنتج"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="cursor-pointer rounded-2xl bg-slate-100 px-6 py-3 font-black text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            إلغاء
          </button>
        </div>

      </form>

      {loading &&
      products.length === 0 ? (
        <p className="text-center">
          جاري تحميل المنتجات...
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map(
            (product) => (
              <ManageProductsCard
                key={product._id}
                product={product}
                onDeleted={
                  handleProductDeleted
                }
              />
            ),
          )}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        numberOfPages={
          paginationResult?.numberOfPages
        }
        onPageChange={
          setCurrentPage
        }
      />

    </div>
  );
}

export default ManagementAllProducts;