import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateProfileAPI, uploadAvatarAPI } from "./userAPI";

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updateProfileAPI(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await uploadAvatarAPI(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { profile: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(updateProfile.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.profile = a.payload.user;
      })
      .addCase(updateProfile.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload?.message || "Update failed";
      })

      .addCase(uploadAvatar.fulfilled, (s, a) => {
        if (s.profile) s.profile.avatar = a.payload.avatar;
      });
  },
});

export default userSlice.reducer;
