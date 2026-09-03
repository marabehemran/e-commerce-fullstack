import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// GET SUBCATEGORIES WITH PAGINATION
export const getSubCategories = createAsyncThunk(
  "subCategories/getSubCategories",

  async ({ page = 1, keyword = "" } = {}, thunkAPI) => {
    try {
      const response = await api.get(
        `/subcategories?page=${page}&limit=10&keyword=${encodeURIComponent(keyword)}`,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch subcategories",
      );
    }
  },
);

// GET SUBCATEGORIES BY CATEGORY
export const getSubCategoriesByCategory =
  createAsyncThunk(
    "subCategories/getSubCategoriesByCategory",
    async (categoryId, thunkAPI) => {
      try {
        const response = await api.get(
          `/categories/${categoryId}/subcategories?limit=1000`,
        );

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch category subcategories",
        );
      }
    },
  );

// CREATE SUBCATEGORY
export const createSubCategory = createAsyncThunk(
  "subCategories/createSubCategory",
  async (subCategoryData, thunkAPI) => {
    try {
      const response = await api.post(
        "/subcategories",
        subCategoryData,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create subcategory",
      );
    }
  },
);

// GET ONE SUBCATEGORY
export const getSubCategory = createAsyncThunk(
  "subCategories/getSubCategory",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(
        `/subcategories/${id}`,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch subcategory",
      );
    }
  },
);

// UPDATE SUBCATEGORY
export const updateSubCategory = createAsyncThunk(
  "subCategories/updateSubCategory",
  async ({ id, subCategoryData }, thunkAPI) => {
    try {
      const response = await api.put(
        `/subcategories/${id}`,
        subCategoryData,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update subcategory",
      );
    }
  },
);

// DELETE SUBCATEGORY
export const deleteSubCategory = createAsyncThunk(
  "subCategories/deleteSubCategory",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/subcategories/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete subcategory",
      );
    }
  },
);

const subCategorySlice = createSlice({
  name: "subCategories",

  initialState: {
    subCategories: [],

    categorySubCategories: [],

    paginationResult: null,

    loading: false,

    error: null,

    subCategory: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET SUBCATEGORIES
      .addCase(getSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.loading = false;

        state.subCategories = action.payload.data;

        state.paginationResult =
          action.payload.paginationResult;
      })

      .addCase(getSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET SUBCATEGORIES BY CATEGORY
      .addCase(
        getSubCategoriesByCategory.pending,
        (state) => {
          state.error = null;

          state.categorySubCategories = [];
        },
      )

      .addCase(
        getSubCategoriesByCategory.fulfilled,
        (state, action) => {
          state.categorySubCategories =
            action.payload.data;
        },
      )

      .addCase(
        getSubCategoriesByCategory.rejected,
        (state, action) => {
          state.error = action.payload;

          state.categorySubCategories = [];
        },
      )

      // CREATE SUBCATEGORY
      .addCase(createSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.subCategories.push(action.payload.data);
      })

      .addCase(createSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ONE SUBCATEGORY
      .addCase(getSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSubCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.subCategory = action.payload.data;
      })

      .addCase(getSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE SUBCATEGORY
      .addCase(updateSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.loading = false;

        const updatedSubCategory =
          action.payload.data;

        const index = state.subCategories.findIndex(
          (subCategory) =>
            subCategory._id === updatedSubCategory._id,
        );

        if (index !== -1) {
          state.subCategories[index] =
            updatedSubCategory;
        }

        state.subCategory = updatedSubCategory;
      })

      .addCase(updateSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE SUBCATEGORY
      .addCase(deleteSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.subCategories =
          state.subCategories.filter(
            (subCategory) =>
              subCategory._id !== action.payload,
          );
      })

      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default subCategorySlice.reducer;