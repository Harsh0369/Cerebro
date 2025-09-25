import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, signupAPI, refreshProfileAPI, logoutAPI } from "./authAPI";

// initial token from localStorage if present
const tokenFromStorage = localStorage.getItem("token");

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginAPI(payload);
      return res.data; // { user, token }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await signupAPI(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await refreshProfileAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const doLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutAPI();
      return {};
    } catch (err) {
      // even if logout fails, we clear client state
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenFromStorage || null,
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(login.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.token = a.payload.token;
        s.user = a.payload.user;
        localStorage.setItem("token", a.payload.token);
      })
      .addCase(login.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload?.message || "Login failed";
      })

      .addCase(signup.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(signup.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.token = a.payload.token;
        s.user = a.payload.user;
        localStorage.setItem("token", a.payload.token);
      })
      .addCase(signup.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload?.message || "Signup failed";
      })

      .addCase(fetchProfile.fulfilled, (s, a) => {
        s.user = a.payload.user;
        s.status = "succeeded";
      })
      .addCase(doLogout.fulfilled, (s) => {
        s.token = null;
        s.user = null;
        localStorage.removeItem("token");
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
