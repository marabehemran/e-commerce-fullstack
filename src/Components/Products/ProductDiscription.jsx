function ProductDiscription({ product, brands }) {
  const brand = brands.find(
    (brand) => brand._id === (product.brand?._id || product.brand),
  );

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
            {product.colors.map((color, index) => (
              <button
                key={index}
                title={color}
                style={{
                  backgroundColor: color,
                }}
                className="h-9 w-9 rounded-full border border-slate-300 ring-offset-2 first:ring-2 first:ring-violet-600 dark:ring-offset-slate-950"
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
        <button className="shine rounded-2xl bg-slate-950 px-8 py-3.5 font-black text-white hover:bg-violet-700">
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
