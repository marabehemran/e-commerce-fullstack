import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Heart } from "lucide-react";

import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../features/wishlist/wishlistSlice";

import { addProductToCart } from "../../features/cart/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);

  const isInWishlist = wishlist.some(
    (wishlistProduct) => wishlistProduct._id === product._id,
  );

  const discountPercentage = product.priceAfterDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100,
      )
    : 0;

  const handleWishlist = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "user") {
      return;
    }

    try {
      if (isInWishlist) {
        await dispatch(removeProductFromWishlist(product._id)).unwrap();
      } else {
        await dispatch(addProductToWishlist(product._id)).unwrap();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "user") {
      return;
    }

    try {
      await dispatch(
        addProductToCart({
          productId: product._id,
        }),
      ).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="relative grid h-56 place-items-center overflow-hidden bg-slate-50 dark:bg-slate-800">
        {product.priceAfterDiscount && (
          <span className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-white">
            -{discountPercentage}%
          </span>
        )}

        <button
          onClick={handleWishlist}
          className={`absolute left-4 top-4 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white shadow hover:text-rose-500 dark:bg-slate-900 ${
            isInWishlist ? "text-rose-500" : ""
          }`}
        >
          <Heart className={isInWishlist ? "fill-rose-500" : ""} />
        </button>

        <Link to={`/products/${product._id}`} className="h-full w-full">
          <img
            src={product.imageCover}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </Link>

        <button
          onClick={handleAddToCart}
          disabled={product.quantity <= 0}
          className="absolute inset-x-4 bottom-4 translate-y-20 cursor-pointer rounded-2xl bg-slate-950 py-3 font-black text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 hover:bg-violet-700"
        >
          إضافة للسلة
        </button>
      </div>

      <div className="p-5">
        <small className="font-black text-violet-600">
          {product.category?.name || "بدون تصنيف"}
        </small>

        <h3 className="mt-2 min-h-[24px] font-black">{product.title}</h3>

        <div className="mt-3 text-amber-500">
          ★ <b>{product.ratingsAverage || 0}</b>
          <small className="text-slate-400">
            {" "}
            ({product.ratingsQuantity || 0})
          </small>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            {product.priceAfterDiscount ? (
              <>
                <b className="text-xl">{product.priceAfterDiscount} ₪</b>

                <span className="mr-2 text-sm text-slate-400 line-through">
                  {product.price} ₪
                </span>
              </>
            ) : (
              <b className="text-xl">{product.price} ₪</b>
            )}
          </div>

          {product.quantity > 0 ? (
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
              متوفر
            </span>
          ) : (
            <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-black text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
              نفذت الكمية
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
