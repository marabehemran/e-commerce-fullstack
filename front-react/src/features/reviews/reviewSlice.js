import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

// GET ALL REVIEWS
export const getReviews = createAsyncThunk(
  "reviews/getReviews",

  async ({ page = 1, limit = 10, keyword = "" } = {}, thunkAPI) => {
    try {
      const response = await api.get(
        `/reviews?page=${page}&limit=${limit}&keyword=${encodeURIComponent(keyword)}`,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews",
      );
    }
  },
);

// GET PRODUCT REVIEWS
export const getProductReviews = createAsyncThunk(
  "reviews/getProductReviews",
  async ({ productId, page = 1, limit = 5 }, thunkAPI) => {
    try {
      const response = await api.get(
        `/products/${productId}/reviews?page=${page}&limit=${limit}`,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product reviews",
      );
    }
  },
);

// GET LOGGED USER REVIEWS
export const getUserReviews = createAsyncThunk(
  "reviews/getUserReviews",

  async ({ userId, page = 1, limit = 10, keyword = "" }, thunkAPI) => {
    try {
      const response = await api.get(
        `/reviews?user=${userId}&page=${page}&limit=${limit}&keyword=${encodeURIComponent(
          keyword,
        )}`,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch user reviews",
      );
    }
  },
);

// GET ONE REVIEW
export const getReview = createAsyncThunk(
  "reviews/getReview",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/reviews/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch review",
      );
    }
  },
);

// CREATE REVIEW
export const createReview = createAsyncThunk(
  "reviews/createReview",
  async ({ productId, reviewData }, thunkAPI) => {
    try {
      const response = await api.post(
        `/products/${productId}/reviews`,
        reviewData,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create review",
      );
    }
  },
);

// UPDATE REVIEW
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, reviewData }, thunkAPI) => {
    try {
      const response = await api.put(`/reviews/${id}`, reviewData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update review",
      );
    }
  },
);

// DELETE REVIEW
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/reviews/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete review",
      );
    }
  },
);

const reviewSlice = createSlice({
  name: "reviews",

  initialState: {
    reviews: [],
    review: null,
    paginationResult: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET ALL REVIEWS
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.data;
        state.paginationResult = action.payload.paginationResult;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET PRODUCT REVIEWS
      .addCase(getProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.data;
        state.paginationResult = action.payload.paginationResult;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET USER REVIEWS
      .addCase(getUserReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.data;
        state.paginationResult = action.payload.paginationResult;
      })
      .addCase(getUserReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ONE REVIEW
      .addCase(getReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload.data;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE REVIEW
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.unshift(action.payload.data);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE REVIEW
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;

        const updatedReview = action.payload.data;

        state.review = updatedReview;

        const index = state.reviews.findIndex(
          (review) => review._id === updatedReview._id,
        );

        if (index !== -1) {
          state.reviews[index] = updatedReview;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE REVIEW
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;

        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload,
        );

        if (state.review?._id === action.payload) {
          state.review = null;
        }
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
