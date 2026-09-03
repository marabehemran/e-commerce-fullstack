import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

// GET WISHLIST
export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/wishlist");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist",
      );
    }
  },
);

// ADD PRODUCT TO WISHLIST
export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async (productId, thunkAPI) => {
    try {
      await api.post("/wishlist", {
        productId,
      });

      const response = await api.get("/wishlist");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product to wishlist",
      );
    }
  },
);

// REMOVE PRODUCT FROM WISHLIST
export const removeProductFromWishlist = createAsyncThunk(
  "wishlist/removeProductFromWishlist",
  async (productId, thunkAPI) => {
    try {
      await api.delete(`/wishlist/${productId}`);

      const response = await api.get("/wishlist");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove product from wishlist",
      );
    }
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    wishlist: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearWishlistState: (state) => {
      state.wishlist = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET WISHLIST
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.data;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD PRODUCT
      .addCase(addProductToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.data;
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REMOVE PRODUCT
      .addCase(removeProductFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.data;
      })
      .addCase(removeProductFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlistState } = wishlistSlice.actions;

export default wishlistSlice.reducer;
