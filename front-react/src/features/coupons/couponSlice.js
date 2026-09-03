import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// GET ALL COUPONS
export const getCoupons = createAsyncThunk(
  "coupons/getCoupons",

  async ({ page = 1, keyword = "" } = {}, thunkAPI) => {
    try {
      const response = await api.get(
        `/coupons?page=${page}&limit=10&keyword=${encodeURIComponent(keyword)}`,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch coupons",
      );
    }
  },
);

// CREATE COUPON
export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (couponData, thunkAPI) => {
    try {
      const response = await api.post("/coupons", couponData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create coupon",
      );
    }
  },
);

// GET ONE COUPON
export const getCoupon = createAsyncThunk(
  "coupons/getCoupon",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/coupons/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch coupon",
      );
    }
  },
);

// UPDATE COUPON
export const updateCoupon = createAsyncThunk(
  "coupons/updateCoupon",
  async ({ id, couponData }, thunkAPI) => {
    try {
      const response = await api.put(`/coupons/${id}`, couponData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update coupon",
      );
    }
  },
);

// DELETE COUPON
export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/coupons/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete coupon",
      );
    }
  },
);

const couponSlice = createSlice({
  name: "coupons",

  initialState: {
    coupons: [],
    paginationResult: null,
    loading: false,
    error: null,
    coupon: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET COUPONS
      .addCase(getCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload.data;
        state.paginationResult = action.payload.paginationResult;
      })

      .addCase(getCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE COUPON
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons.push(action.payload.data);
      })

      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ONE COUPON
      .addCase(getCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon = action.payload.data;
      })

      .addCase(getCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE COUPON
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCoupon = action.payload.data;

        const index = state.coupons.findIndex(
          (coupon) => coupon._id === updatedCoupon._id,
        );

        if (index !== -1) {
          state.coupons[index] = updatedCoupon;
        }

        state.coupon = updatedCoupon;
      })

      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE COUPON
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;

        state.coupons = state.coupons.filter(
          (coupon) => coupon._id !== action.payload,
        );
      })

      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default couponSlice.reducer;
