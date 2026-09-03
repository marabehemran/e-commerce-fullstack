
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ImagePlus, GitBranch } from "lucide-react";

import {
  getBrand,
  updateBrand,
} from "../../../features/brands/brandSlice";

function ManageUpdateBrand() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const brand = useSelector(
    (state) => state.brands.brand,
  );

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    dispatch(getBrand(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (brand) {
      setName(brand.name || "");
    }
  }, [brand]);

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

    setUpdateError(null);

    if (!name.trim()) {
      return;
    }

    const formData = new FormData();

    formData.append("name", name.trim());

    if (image) {
      formData.append("image", image);
    }

    try {
      await dispatch(
        updateBrand({
          id,
          brandData: formData,
        }),
      ).unwrap();

      setImage(null);

      dispatch(getBrand(id));
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
              <GitBranch />
            </span>

            تعديل الماركة
          </h1>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
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
          <label className="cursor-pointer rounded-[26px] border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-800">
            <div className="flex justify-center">
              {brand && (
                <img
                  src={
                    image && previewUrl
                      ? previewUrl
                      : brand.image
                  }
                  alt={brand.name}
                  className="h-40 w-40 rounded-2xl object-cover"
                />
              )}
            </div>

            <span className="mt-4 flex justify-center text-4xl text-violet-600">
              <ImagePlus />
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
              onChange={(e) => {
                setImage(e.target.files?.[0] || null);
              }}
              hidden
            />
          </label>

          <div className="flex flex-col justify-center">
            <label className="mb-2 block font-black">
              اسم الماركة
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border p-3.5 dark:border-slate-700 dark:bg-slate-800"
              required
            />

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              يمكنك تعديل اسم الماركة الحالي.
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

export default ManageUpdateBrand;