import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchGroupsAPI,
  createGroupAPI,
  joinGroupAPI,
  leaveGroupAPI,
  removeMemberAPI,
  fetchGroupByIdAPI,
} from "./groupsAPI";

export const fetchGroups = createAsyncThunk(
  "groups/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchGroupsAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const createGroup = createAsyncThunk(
  "groups/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createGroupAPI(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const joinGroup = createAsyncThunk(
  "groups/join",
  async (groupId, { rejectWithValue }) => {
    try {
      const res = await joinGroupAPI(groupId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const leaveGroup = createAsyncThunk(
  "groups/leave",
  async (groupId, { rejectWithValue }) => {
    try {
      const res = await leaveGroupAPI(groupId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const removeMember = createAsyncThunk(
  "groups/removeMember",
  async ({ groupId, memberId }, { rejectWithValue }) => {
    try {
      const res = await removeMemberAPI(groupId, memberId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const fetchGroupById = createAsyncThunk(
  "groups/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetchGroupByIdAPI(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const groupsSlice = createSlice({
  name: "groups",
  initialState: { list: [], activeGroup: null, status: "idle", error: null },
  reducers: {
    setActiveGroup(state, action) {
      state.activeGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.fulfilled, (s, a) => {
        s.list = a.payload.groups || [];
        s.status = "succeeded";
      })
      .addCase(createGroup.fulfilled, (s, a) => {
        s.list.unshift(a.payload.group);
      })
      .addCase(joinGroup.fulfilled, (s, a) => {
        /* update group membership optimistically */
      })
      .addCase(leaveGroup.fulfilled, (s, a) => {
        /* remove user from group in list */
      })
      .addCase(fetchGroupById.fulfilled, (s, a) => {
        s.activeGroup = a.payload.group;
      });
  },
});

export const { setActiveGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
