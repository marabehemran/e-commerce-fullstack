import { useDispatch, useSelector } from "react-redux";

import SubTitle from "../../Components/Utility/SubTitle";
import ProductCard from "../../Components/Products/ProductCard";

import { addProductToCart } from "../../features/cart/cartSlice";

function WishPage() {
  const dispatch = useDispatch();

  const { wishlist, loading, error } = useSelector((state) => state.wishlist);

  const handleAddAllToCart = async () => {
    try {
      for (const product of wishlist) {
        if (product.quantity > 0) {
          await dispatch(
            addProductToCart({
              productId: product._id,
            }),
          ).unwrap();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-5">
        <SubTitle
          title="المفضلة"
          btnTitle="اضافة الكل للسلة "
          onClick={handleAddAllToCart}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pt-2">
        {loading && wishlist.length === 0 ? (
          <p className="py-10 text-center">جاري تحميل المفضلة...</p>
        ) : error && wishlist.length === 0 ? (
          <p className="py-10 text-center text-red-500">{error}</p>
        ) : wishlist.length === 0 ? (
          <p className="py-10 text-center text-slate-500">
            لا توجد منتجات في المفضلة
          </p>
        ) : (
          <div className="my-2 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {wishlist.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishPage;
