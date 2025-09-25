import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import groupsReducer from "../features/groups/groupsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    groups: groupsReducer,
  },
});

export default store;
