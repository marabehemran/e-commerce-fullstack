import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

// CREATE CASH ORDER
export const createCashOrder = createAsyncThunk(
  "orders/createCashOrder",

  async ({ cartId, shippingAddress }, thunkAPI) => {
    try {
      const response = await api.post(`/orders/${cartId}`, {
        shippingAddress,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create cash order",
      );
    }
  },
);

// CREATE STRIPE CHECKOUT SESSION
export const createCheckoutSession = createAsyncThunk(
  "orders/createCheckoutSession",

  async ({ cartId, shippingAddress }, thunkAPI) => {
    try {
      const response = await api.post(`/orders/checkout-session/${cartId}`, {
        shippingAddress,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create checkout session",
      );
    }
  },
);

// CREATE CARD ORDER AFTER STRIPE PAYMENT
export const createCardOrder = createAsyncThunk(
  "orders/createCardOrder",

  async ({ cartId, sessionId }, thunkAPI) => {
    try {
      const response = await api.post(`/orders/card/${cartId}`, {
        sessionId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create card order",
      );
    }
  },
);

// GET ALL ORDERS
export const getOrders = createAsyncThunk(
  "orders/getOrders",

  async ({ keyword = "" } = {}, thunkAPI) => {
    try {
      const response = await api.get(
        `/orders?keyword=${encodeURIComponent(keyword)}`,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

// GET SPECIFIC ORDER
export const getOrder = createAsyncThunk(
  "orders/getOrder",

  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/orders/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch order",
      );
    }
  },
);

// UPDATE ORDER TO PAID
export const updateOrderToPaid = createAsyncThunk(
  "orders/updateOrderToPaid",

  async (id, thunkAPI) => {
    try {
      const response = await api.put(`/orders/${id}/pay`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order payment",
      );
    }
  },
);

// UPDATE ORDER TO DELIVERED
export const updateOrderToDelivered = createAsyncThunk(
  "orders/updateOrderToDelivered",

  async (id, thunkAPI) => {
    try {
      const response = await api.put(`/orders/${id}/deliver`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order delivery",
      );
    }
  },
);

const initialState = {
  orders: [],

  order: null,

  checkoutSession: null,

  loading: false,

  error: null,
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    clearOrderState: (state) => {
      state.orders = [];

      state.order = null;

      state.checkoutSession = null;

      state.loading = false;

      state.error = null;
    },

    clearCheckoutSession: (state) => {
      state.checkoutSession = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE CASH ORDER
      .addCase(createCashOrder.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(createCashOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.order = action.payload.data;
      })

      .addCase(createCashOrder.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // CREATE CHECKOUT SESSION
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;

        state.checkoutSession = action.payload.session;
      })

      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // CREATE CARD ORDER
      .addCase(createCardOrder.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(createCardOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.order = action.payload.data;

        state.checkoutSession = null;
      })

      .addCase(createCardOrder.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // GET ALL ORDERS
      .addCase(getOrders.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.data;
      })

      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // GET SPECIFIC ORDER
      .addCase(getOrder.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.order = action.payload.data;
      })

      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // UPDATE ORDER TO PAID
      .addCase(updateOrderToPaid.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(updateOrderToPaid.fulfilled, (state, action) => {
        state.loading = false;

        state.order = action.payload.data;

        const index = state.orders.findIndex(
          (order) => order._id === action.payload.data._id,
        );

        if (index !== -1) {
          state.orders[index] = action.payload.data;
        }
      })

      .addCase(updateOrderToPaid.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // UPDATE ORDER TO DELIVERED
      .addCase(updateOrderToDelivered.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(updateOrderToDelivered.fulfilled, (state, action) => {
        state.loading = false;

        state.order = action.payload.data;

        const index = state.orders.findIndex(
          (order) => order._id === action.payload.data._id,
        );

        if (index !== -1) {
          state.orders[index] = action.payload.data;
        }
      })

      .addCase(updateOrderToDelivered.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export const { clearOrderState, clearCheckoutSession } = orderSlice.actions;

export default orderSlice.reducer;
