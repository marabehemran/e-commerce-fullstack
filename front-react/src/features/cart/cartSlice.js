import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

// GET LOGGED USER CART
export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    const response = await api.get("/cart");

    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return {
        data: null,
        numOfCartItems: 0,
      };
    }

    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch cart",
    );
  }
});
// ADD PRODUCT TO CART
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async ({ productId, color }, thunkAPI) => {
    try {
      const response = await api.post("/cart", {
        productId,
        color,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product to cart",
      );
    }
  },
);

// UPDATE CART ITEM QUANTITY
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ itemId, quantity }, thunkAPI) => {
    try {
      const response = await api.put(`/cart/${itemId}`, {
        quantity,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update cart quantity",
      );
    }
  },
);

// REMOVE CART ITEM
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (itemId, thunkAPI) => {
    try {
      const response = await api.delete(`/cart/${itemId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove cart item",
      );
    }
  },
);

// CLEAR CART
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      await api.delete("/cart");

      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to clear cart",
      );
    }
  },
);

// APPLY COUPON
export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",
  async (coupon, thunkAPI) => {
    try {
      const response = await api.put("/cart/applyCoupon", {
        coupon,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to apply coupon",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cart: null,
    numOfCartItems: 0,
    loading: false,
    error: null,
  },

  reducers: {
    clearCartState: (state) => {
      state.cart = null;
      state.numOfCartItems = 0;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET CART
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
        state.numOfCartItems = action.payload.numOfCartItems;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD PRODUCT
      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
        state.numOfCartItems = action.payload.numOfCartItems;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE QUANTITY
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
        state.numOfCartItems = action.payload.numOfCartItems;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REMOVE ITEM
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
        state.numOfCartItems = action.payload.numOfCartItems;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CLEAR CART
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.cart = null;
        state.numOfCartItems = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // APPLY COUPON
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
        state.numOfCartItems = action.payload.numOfCartItems;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartState } = cartSlice.actions;

export default cartSlice.reducer;
