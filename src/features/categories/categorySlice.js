import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// GET ALL CATEGORIES WITH PAGINATION
export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (page = 1, thunkAPI) => {
    try {
      const response = await api.get(`/categories?page=${page}&limit=10`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories",
      );
    }
  },
);

// GET ALL CATEGORIES WITHOUT PAGINATION
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/categories?page=1&limit=1000");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch all categories",
      );
    }
  },
);

// CREATE CATEGORY
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData, thunkAPI) => {
    try {
      const response = await api.post("/categories", categoryData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create category",
      );
    }
  },
);

export const getCategory = createAsyncThunk(
  "categories/getCategory",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/categories/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch category",
      );
    }
  },
);

// UPDATE CATEGORY
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, categoryData }, thunkAPI) => {
    try {
      const response = await api.put(`/categories/${id}`, categoryData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update category",
      );
    }
  },
);

// DELETE CATEGORY
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/categories/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete category",
      );
    }
  },
);

const categorySlice = createSlice({
  name: "categories",

  initialState: {
    categories: [],
    allCategories: [],
    paginationResult: null,
    loading: false,
    error: null,
    category: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET CATEGORIES WITH PAGINATION
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
        state.paginationResult = action.payload.paginationResult;
      })

      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL CATEGORIES
      .addCase(getAllCategories.pending, (state) => {
        state.error = null;
      })

      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.allCategories = action.payload.data;
      })

      .addCase(getAllCategories.rejected, (state, action) => {
        state.error = action.payload;
      })

      // CREATE CATEGORY
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload.data);
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE CATEGORY
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCategory = action.payload.data;

        const index = state.categories.findIndex(
          (category) => category._id === updatedCategory._id,
        );

        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE CATEGORY
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = state.categories.filter(
          (category) => category._id !== action.payload,
        );
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ONE CATEGORY
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.data;
      })

      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;