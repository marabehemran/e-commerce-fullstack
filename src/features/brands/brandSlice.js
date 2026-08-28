import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// GET ALL BRANDS
export const getBrands = createAsyncThunk(
  "brands/getBrands",
  async (page = 1, thunkAPI) => {
    try {
      const response = await api.get(`/brands?page=${page}&limit=10`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch brands",
      );
    }
  },
);

// CREATE BRAND
export const createBrand = createAsyncThunk(
  "brands/createBrand",
  async (brandData, thunkAPI) => {
    try {
      const response = await api.post("/brands", brandData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create brand",
      );
    }
  },
);

// GET ONE BRAND
export const getBrand = createAsyncThunk(
  "brands/getBrand",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/brands/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch brand",
      );
    }
  },
);

// UPDATE BRAND
export const updateBrand = createAsyncThunk(
  "brands/updateBrand",
  async ({ id, brandData }, thunkAPI) => {
    try {
      const response = await api.put(`/brands/${id}`, brandData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update brand",
      );
    }
  },
);

// DELETE BRAND
export const deleteBrand = createAsyncThunk(
  "brands/deleteBrand",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/brands/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete brand",
      );
    }
  },
);

const brandSlice = createSlice({
  name: "brands",

  initialState: {
    brands: [],
    paginationResult: null,
    loading: false,
    error: null,
    brand: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET BRANDS
      .addCase(getBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload.data;
        state.paginationResult = action.payload.paginationResult;
      })

      .addCase(getBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE BRAND
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands.push(action.payload.data);
      })

      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE BRAND
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;

        const updatedBrand = action.payload.data;

        const index = state.brands.findIndex(
          (brand) => brand._id === updatedBrand._id,
        );

        if (index !== -1) {
          state.brands[index] = updatedBrand;
        }
      })

      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE BRAND
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;

        state.brands = state.brands.filter(
          (brand) => brand._id !== action.payload,
        );
      })

      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ONE BRAND
      .addCase(getBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brand = action.payload.data;
      })

      .addCase(getBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default brandSlice.reducer;
