import axios from "axios";
import store from "../app/store";
import { logout } from "../features/auth/authSlice";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// attach token
axiosClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// handle auth errors
axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // token invalid or expired => logout
      store.dispatch(logout());
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
