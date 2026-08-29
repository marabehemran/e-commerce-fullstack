import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/axios";

// GET ALL PRODUCTS
export const getProducts = createAsyncThunk(
  "products/getProducts",

  async (
    {
      page = 1,
      limit = 10,
      keyword = "",
      category = "",
      brand = "",
      subCategory = "",
      minPrice = "",
      maxPrice = "",
      sort = "",
    } = {},

    thunkAPI,
  ) => {
    try {
      const params = new URLSearchParams();

      params.append("page", page);

      params.append("limit", limit);

      if (keyword) {
        params.append("keyword", keyword);
      }
      if (category) {
        params.append("category", category);
      }
      if (brand) {
        params.append("brand", brand);
      }
      if (subCategory) {
        params.append("subCategories", subCategory);
      }
      if (minPrice) {
        params.append("price[gte]", minPrice);
      }
      if (maxPrice) {
        params.append("price[lte]", maxPrice);
      }
      if (sort) {
        params.append("sort", sort);
      }
      
      const response = await api.get(`/products?${params.toString()}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
);

// GET ONE PRODUCT
export const getProduct = createAsyncThunk(
  "products/getProduct",

  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/products/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product",
      );
    }
  },
);

// CREATE PRODUCT
export const createProduct = createAsyncThunk(
  "products/createProduct",

  async (productData, thunkAPI) => {
    try {
      const response = await api.post("/products", productData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create product",
      );
    }
  },
);

// UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  "products/updateProduct",

  async (
    { id, productData },

    thunkAPI,
  ) => {
    try {
      const response = await api.put(`/products/${id}`, productData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update product",
      );
    }
  },
);

// DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",

  async (id, thunkAPI) => {
    try {
      await api.delete(`/products/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete product",
      );
    }
  },
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    product: null,
    paginationResult: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET PRODUCTS
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.paginationResult = action.payload.paginationResult;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ONE PRODUCT
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE PRODUCT
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.data);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PRODUCT
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload.data;

        const index = state.products.findIndex(
          (product) => product._id === updatedProduct._id,
        );

        if (index !== -1) {
          state.products[index] = updatedProduct;
        }

        state.product = updatedProduct;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE PRODUCT
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products = state.products.filter(
          (product) => product._id !== action.payload,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
