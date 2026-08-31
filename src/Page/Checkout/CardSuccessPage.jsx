import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { createCardOrder } from "../../features/orders/orderSlice";
import { clearCartState } from "../../features/cart/cartSlice";

function CardSuccessPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { loading, error } = useSelector((state) => state.orders);

  const sessionId = searchParams.get("session_id");
  const cartId = searchParams.get("cart_id");

  useEffect(() => {
    const createOrder = async () => {
      if (!sessionId || !cartId) {
        return;
      }

      try {
        await dispatch(
          createCardOrder({
            cartId,
            sessionId,
          }),
        ).unwrap();

        dispatch(clearCartState());

        navigate("/user/allorder");
      } catch (error) {
        console.error(error);
      }
    };

    createOrder();
  }, [dispatch, navigate, sessionId, cartId]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <div className="mx-auto max-w-xl rounded-[30px] border border-slate-200 bg-white p-8 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
        {loading && (
          <>
            <h1 className="text-2xl font-black">جاري تأكيد عملية الدفع...</h1>

            <p className="mt-3 text-slate-500">يرجى الانتظار</p>
          </>
        )}

        {!loading && error && (
          <>
            <h1 className="text-2xl font-black text-red-600">
              حدث خطأ أثناء إنشاء الطلب
            </h1>

            <p className="mt-3 text-slate-500">{error}</p>
          </>
        )}

        {!loading && !error && (!sessionId || !cartId) && (
          <>
            <h1 className="text-2xl font-black text-red-600">
              بيانات الدفع غير مكتملة
            </h1>

            <button
              onClick={() => navigate("/cart")}
              className="mt-6 rounded-2xl bg-violet-700 px-6 py-3 font-black text-white"
            >
              العودة إلى السلة
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CardSuccessPage;
