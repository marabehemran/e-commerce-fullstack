import { useDispatch } from "react-redux";

import { Trash } from "lucide-react";

import {
  removeCartItem,
  updateCartItemQuantity,
} from "../../features/cart/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleIncrease = async () => {
    try {
      await dispatch(
        updateCartItemQuantity({
          itemId: item._id,
          quantity: item.quantity + 1,
        }),
      ).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecrease = async () => {
    if (item.quantity <= 1) {
      return;
    }

    try {
      await dispatch(
        updateCartItemQuantity({
          itemId: item._id,
          quantity: item.quantity - 1,
        }),
      ).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async () => {
    try {
      await dispatch(removeCartItem(item._id)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-5 md:grid-cols-[130px_1fr_auto] md:items-center">
        <div className="grid h-32 place-items-center rounded-2xl bg-slate-50 dark:bg-slate-800">
          <span>
            <img
              className="max-h-34 max-w-34 object-contain"
              src={item.product?.imageCover}
              alt={item.product?.title}
            />
          </span>
        </div>

        <div>
          <b>{item.product?.title}</b>

          <div className="mt-4 inline-flex rounded-2xl border p-1 dark:border-slate-700">
            <button
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
              className="h-9 w-9"
            >
              −
            </button>

            <b className="min-w-10 text-center">{item.quantity}</b>

            <button onClick={handleIncrease} className="h-9 w-9">
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-7 sm:flex-row">
          <b className="text-2xl">
            {(item.price * item.quantity).toLocaleString()} ₪
          </b>

          <button onClick={handleRemove} className="text-red-500">
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
