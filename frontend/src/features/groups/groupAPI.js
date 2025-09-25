import axiosClient from "../../api/axiosClient";

export const fetchGroupsAPI = () => axiosClient.get("/groups");
export const createGroupAPI = (payload) => axiosClient.post("/groups", payload);
export const joinGroupAPI = (groupId) =>
  axiosClient.post(`/groups/${groupId}/join`);
export const leaveGroupAPI = (groupId) =>
  axiosClient.post(`/groups/${groupId}/leave`);
export const removeMemberAPI = (groupId, memberId) =>
  axiosClient.post(`/groups/${groupId}/remove`, { memberId });
export const fetchGroupByIdAPI = (id) => axiosClient.get(`/groups/${id}`);
