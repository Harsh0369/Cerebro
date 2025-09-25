import axiosClient from "../../api/axiosClient";

export const loginAPI = (data) => axiosClient.post("/auth/login", data);
export const signupAPI = (data) => axiosClient.post("/auth/register", data);
export const logoutAPI = () => axiosClient.post("/auth/logout");
export const refreshProfileAPI = () => axiosClient.get("/auth/me");
