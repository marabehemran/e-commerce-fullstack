import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// GET ALL USERS
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (page = 1, thunkAPI) => {
    try {
      const response = await api.get(`/users?page=${page}&limit=10`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

// CREATE USER
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/users", userData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create user",
      );
    }
  },
);

// GET ONE USER
export const getUser = createAsyncThunk(
  "users/getUser",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/users/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch user",
      );
    }
  },
);

// UPDATE USER
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, userData }, thunkAPI) => {
    try {
      const response = await api.put(`/users/${id}`, userData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update user",
      );
    }
  },
);

// CHANGE USER PASSWORD
export const changeUserPassword = createAsyncThunk(
  "users/changeUserPassword",
  async ({ id, password }, thunkAPI) => {
    try {
      const response = await api.put(`/users/changePassword/${id}`, {
        password,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to change user password",
      );
    }
  },
);

// DELETE USER
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/users/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete user",
      );
    }
  },
);

const userSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    paginationResult: null,
    loading: false,
    error: null,
    user: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET USERS
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.paginationResult = action.payload.paginationResult;
      })

      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE USER
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.data);
      })

      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ONE USER
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })

      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;

        const updatedUser = action.payload.data;

        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id,
        );

        if (index !== -1) {
          state.users[index] = updatedUser;
        }

        state.user = updatedUser;
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CHANGE USER PASSWORD
      .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.loading = false;

        const updatedUser = action.payload.data;

        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id,
        );

        if (index !== -1) {
          state.users[index] = updatedUser;
        }

        state.user = updatedUser;
      })

      .addCase(changeUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE USER
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        state.users = state.users.filter(
          (user) => user._id !== action.payload,
        );
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;