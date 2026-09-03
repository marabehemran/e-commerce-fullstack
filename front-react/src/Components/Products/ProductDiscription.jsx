import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { addProductToCart } from "../../features/cart/cartSlice";

function ProductDiscription({ product, brands }) {
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState(null);

  const brand = brands.find(
    (brand) => brand._id === (product.brand?._id || product.brand),
  );

  useEffect(() => {
    if (product.colors?.length > 0) {
      setSelectedColor(product.colors[0]);
    } else {
      setSelectedColor(null);
    }
  }, [product]);

  const handleAddToCart = async () => {
    try {
      await dispatch(
        addProductToCart({
          productId: product._id,
          color: selectedColor?.name,
        }),
      ).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <small className="font-black text-violet-600">
        {product.category?.name || "بدون تصنيف"} :
      </small>

      <h1 className="mt-2 text-2xl font-black leading-relaxed md:text-3xl">
        {product.title}
      </h1>

      <div className="mt-3 text-amber-500">
        ★ <b>{product.ratingsAverage || 0}</b>
        <span className="mr-2 text-sm text-slate-400">
          ({product.ratingsQuantity || 0} تقييم)
        </span>
      </div>

      <div className="mt-7">
        <b className="font-black">
          الماركة :{" "}
          <span className="text-violet-700">{brand?.name || "بدون ماركة"}</span>
        </b>

        {product.colors?.length > 0 && (
          <div className="mt-3 flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color.value}
                type="button"
                title={color.name}
                onClick={() => setSelectedColor(color)}
                style={{
                  backgroundColor: color.value,
                }}
                className={`h-9 w-9 cursor-pointer rounded-full border ring-offset-2 transition dark:ring-offset-slate-950 ${
                  selectedColor?.value === color.value
                    ? "border-violet-600 ring-2 ring-violet-600"
                    : "border-slate-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-7">
        <b className="mb-2 block font-black">المواصفات :</b>

        <p className="text-sm leading-8 text-slate-500 dark:text-slate-400">
          {product.description}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          type="button"
          onClick={handleAddToCart}
          className="shine cursor-pointer rounded-2xl bg-slate-950 px-8 py-3.5 font-black text-white hover:bg-violet-700"
        >
          اضف للعربة
        </button>

        <div>
          {product.priceAfterDiscount ? (
            <>
              <b className="text-2xl">{product.priceAfterDiscount} ₪</b>

              <span className="mr-3 text-slate-400 line-through">
                {product.price} ₪
              </span>
            </>
          ) : (
            <b className="text-2xl">{product.price} ₪</b>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDiscription;
