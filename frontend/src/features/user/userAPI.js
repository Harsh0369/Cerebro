import axiosClient from "../../api/axiosClient";

export const updateProfileAPI = (payload) =>
  axiosClient.put("/users/me", payload);
export const uploadAvatarAPI = (formData) =>
  axiosClient.post("/users/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const fetchUserByIdAPI = (id) => axiosClient.get(`/users/${id}`);
