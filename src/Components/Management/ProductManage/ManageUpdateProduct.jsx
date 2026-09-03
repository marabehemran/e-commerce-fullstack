import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ImagePlus, LayoutGrid, Plus, X } from "lucide-react";

import {
  getProduct,
  updateProduct,
} from "../../../features/products/productSlice";

import { getAllCategories } from "../../../features/categories/categorySlice";
import { getAllBrands } from "../../../features/brands/brandSlice";
import { getSubCategoriesByCategory } from "../../../features/subCategories/subCategorySlice";

function ManageUpdateProduct() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorName, setColorName] = useState("");
  const [colorValue, setColorValue] = useState("#000000");
  const [imageCover, setImageCover] = useState(null);
  const [images, setImages] = useState([]);
  const [updateError, setUpdateError] = useState(null);

  const { product, loading } = useSelector((state) => state.products);

  const categories = useSelector((state) => state.categories.allCategories);

  const brands = useSelector((state) => state.brands.allBrands);

  const categorySubCategories = useSelector(
    (state) => state.subCategories.categorySubCategories,
  );

  useEffect(() => {
    dispatch(getProduct(id));

    dispatch(getAllCategories());

    dispatch(getAllBrands());
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product._id === id) {
      setTitle(product.title || "");

      setDescription(product.description || "");

      setPrice(product.price ?? "");

      setPriceAfterDiscount(product.priceAfterDiscount ?? "");

      setQuantity(product.quantity ?? "");

      const currentCategoryId = product.category?._id || product.category || "";

      setCategoryId(currentCategoryId);

      setBrandId(product.brand?._id || product.brand || "");

      const currentSubCategories =
        product.subCategories?.map(
          (subCategory) => subCategory?._id || subCategory,
        ) || [];

      setSelectedSubCategories(currentSubCategories);

      setColors(product.colors || []);

      if (currentCategoryId) {
        dispatch(getSubCategoriesByCategory(currentCategoryId));
      }
    }
  }, [product, id, dispatch]);

  const handleCategoryChange = (e) => {
    const newCategoryId = e.target.value;

    setCategoryId(newCategoryId);

    setSelectedSubCategories([]);

    if (newCategoryId) {
      dispatch(getSubCategoriesByCategory(newCategoryId));
    }
  };

  const handleSubCategoryChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions).map(
      (option) => option.value,
    );

    setSelectedSubCategories(selectedValues);
  };

  const handleAddColor = () => {
    const newColorName = colorName.trim();

    if (!newColorName) {
      return;
    }

    const colorExists = colors.some(
      (item) => item.name.toLowerCase() === newColorName.toLowerCase(),
    );

    if (!colorExists) {
      setColors([
        ...colors,
        {
          name: newColorName,
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

  const handleImagesChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    if (selectedImages.length > 5) {
      setUpdateError("يمكنك اختيار 5 صور إضافية كحد أقصى");

      return;
    }

    setUpdateError(null);

    setImages(selectedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdateError(null);

    if (
      !title.trim() ||
      !description.trim() ||
      !price ||
      !quantity ||
      !categoryId
    ) {
      setUpdateError("يرجى تعبئة جميع الحقول المطلوبة");

      return;
    }

    const formData = new FormData();

    formData.append("title", title.trim());

    formData.append("description", description.trim());

    formData.append("price", price);

    formData.append("priceAfterDiscount", priceAfterDiscount);

    formData.append("quantity", quantity);

    formData.append("category", categoryId);

    formData.append("brand", brandId);

    if (selectedSubCategories.length > 0) {
      selectedSubCategories.forEach((subCategoryId) => {
        formData.append("subCategories", subCategoryId);
      });
    } else {
      formData.append("subCategories", "");
    }

    if (colors.length > 0) {
      colors.forEach((item) => {
        formData.append("colors", JSON.stringify(item));
      });
    } else {
      formData.append("colors", "");
    }

    if (imageCover) {
      formData.append("imageCover", imageCover);
    }

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await dispatch(
        updateProduct({
          id,
          productData: formData,
        }),
      ).unwrap();

      navigate("/manageallproducts");
    } catch (error) {
      setUpdateError(error);
    }
  };

  if (loading && (!product || product._id !== id)) {
    return <p className="text-center">جاري تحميل المنتج...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
          <LayoutGrid />
        </div>

        <div>
          <h1 className="text-2xl font-black">تعديل المنتج</h1>

          <p className="text-sm text-slate-500">تعديل بيانات المنتج</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {product?.imageCover && (
            <div className="md:col-span-2">
              <label className="mb-2 block font-black">
                الصورة الرئيسية الحالية
              </label>

              <img
                src={product.imageCover}
                alt={product.title}
                className="h-52 w-full rounded-2xl object-cover"
              />
            </div>
          )}

          <div className="md:col-span-2">
            <label className="mb-2 block font-black">
              تغيير الصورة الرئيسية
            </label>

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 p-6 text-slate-500 dark:border-slate-700">
              <ImagePlus />

              <span>اختر صورة جديدة</span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageCover(e.target.files[0])}
              />
            </label>

            {imageCover && (
              <p className="mt-2 text-sm text-slate-500">{imageCover.name}</p>
            )}
          </div>

          {product?.images?.length > 0 && (
            <div className="md:col-span-2">
              <label className="mb-2 block font-black">
                الصور الإضافية الحالية
              </label>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {product.images.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`product-${index}`}
                    className="h-32 w-full rounded-2xl object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="md:col-span-2">
            <label className="mb-2 block font-black">
              تغيير الصور الإضافية
            </label>

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 p-6 text-slate-500 dark:border-slate-700">
              <ImagePlus />

              <span>اختر صور جديدة</span>

              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImagesChange}
              />
            </label>

            {images.length > 0 && (
              <p className="mt-2 text-sm text-slate-500">
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
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="mb-2 block font-black">الكمية</label>

            <input
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-black">الوصف</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="mb-2 block font-black">السعر</label>

            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="mb-2 block font-black">السعر بعد الخصم</label>

            <input
              type="number"
              min="0"
              value={priceAfterDiscount}
              onChange={(e) => setPriceAfterDiscount(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
              placeholder="اختياري"
            />
          </div>

          <div>
            <label className="mb-2 block font-black">التصنيف</label>

            <select
              value={categoryId}
              onChange={handleCategoryChange}
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
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
              className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
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
              disabled={!categoryId}
              value={selectedSubCategories}
              onChange={handleSubCategoryChange}
              className="min-h-32 w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 disabled:opacity-50 dark:border-slate-700"
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
                className="flex-1 rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-violet-500 dark:border-slate-700"
                placeholder="اسم اللون"
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
                className="grid size-12 cursor-pointer place-items-center rounded-2xl bg-violet-100 text-violet-700"
              >
                <Plus />
              </button>
            </div>

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
          </div>
        </div>

        {updateError && (
          <p className="mt-4 font-bold text-rose-600">{updateError}</p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-2xl bg-violet-700 px-6 py-3 font-black text-white disabled:opacity-50"
          >
            {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/manageallproducts")}
            className="cursor-pointer rounded-2xl bg-slate-100 px-6 py-3 font-black text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManageUpdateProduct;
