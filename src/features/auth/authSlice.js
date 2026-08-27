import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../api/axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", loginData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to login",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (registerData, thunkAPI) => {
    try {
      const response = await api.post("/auth/signup", registerData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to register",
      );
    }
  },
);

export const getLoggedUser = createAsyncThunk(
  "auth/getLoggedUser",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/users/getMe");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get logged user",
      );
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (forgotPasswordData, thunkAPI) => {
    try {
      const response = await api.post(
        "/auth/forgotPassword",
        forgotPasswordData,
      );

      return {
        data: response.data,
        email: forgotPasswordData.email,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send reset code",
      );
    }
  },
);

export const verifyResetCode = createAsyncThunk(
  "auth/verifyResetCode",
  async (resetCodeData, thunkAPI) => {
    try {
      const response = await api.post("/auth/verifyResetCode", resetCodeData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Invalid reset code",
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetPasswordData, thunkAPI) => {
    try {
      const response = await api.put("/auth/resetPassword", resetPasswordData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to reset password",
      );
    }
  },
);

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  authChecked: false,

  resetEmail: "",
  resetCodeSent: false,
  resetCodeVerified: false,
  passwordResetSuccess: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;

      localStorage.removeItem("token");
    },

    finishAuthCheck: (state) => {
      state.authChecked = true;
    },

    resetPasswordFlow: (state) => {
      state.resetEmail = "";
      state.resetCodeSent = false;
      state.resetCodeVerified = false;
      state.passwordResetSuccess = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET LOGGED USER
      .addCase(getLoggedUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(getLoggedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.authChecked = true;
      })

      .addCase(getLoggedUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.authChecked = true;

        localStorage.removeItem("token");
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FORGOT PASSWORD
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetCodeSent = false;
      })

      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetCodeSent = true;
        state.resetEmail = action.payload.email;
      })

      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // VERIFY RESET CODE
      .addCase(verifyResetCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetCodeVerified = false;
      })

      .addCase(verifyResetCode.fulfilled, (state) => {
        state.loading = false;
        state.resetCodeVerified = true;
      })

      .addCase(verifyResetCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // RESET PASSWORD
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordResetSuccess = false;
      })

      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordResetSuccess = true;
      })

      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, finishAuthCheck, resetPasswordFlow } = authSlice.actions;

export default authSlice.reducer;
