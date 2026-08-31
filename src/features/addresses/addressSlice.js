import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

//GET Addresses
export const getAddresses = createAsyncThunk(
  "addresses/getAddresses",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/addresses");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get addresses",
      );
    }
  },
);

//ADD Addresses
export const addAddress = createAsyncThunk(
  "addresses/addAddress",

  async (addressData, thunkAPI) => {
    try {
      const response = await api.post("/addresses", addressData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add address",
      );
    }
  },
);

//UPDATE Addresses
export const updateAddress = createAsyncThunk(
  "addresses/updateAddress",

  async ({ addressId, addressData }, thunkAPI) => {
    try {
      const response = await api.put(`/addresses/${addressId}`, addressData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update address",
      );
    }
  },
);

//DELELTE Addresses
export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",

  async (addressId, thunkAPI) => {
    try {
      const response = await api.delete(`/addresses/${addressId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete address",
      );
    }
  },
);

const initialState = {
  addresses: [],
  loading: false,
  error: null,
  addSuccess: false,
  updateSuccess: false,
};

const addressSlice = createSlice({
  name: "addresses",

  initialState,

  reducers: {
    resetAddressStatus: (state) => {
      state.addSuccess = false;
      state.updateSuccess = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET Addresses
      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.data;
      })

      .addCase(getAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD Addresses
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.addSuccess = false;
      })

      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.data;
        state.addSuccess = true;
      })

      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.addSuccess = false;
      })

      // UPDATE Addresses
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })

      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.data;
        state.updateSuccess = true;
      })

      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.updateSuccess = false;
      })

      // DELETE Addresses
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.data;
      })

      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAddressStatus } = addressSlice.actions;

export default addressSlice.reducer;
