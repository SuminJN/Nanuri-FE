import axiosInstance from "./axios";

export const fetchMessages = (roomId, cursor = null) =>
  axiosInstance.get(`/api/chat/room/${roomId}/messages`, {
    params: { cursor },
  });

export const fetchRoomInfo = (roomId) => axiosInstance.get(`/api/chat/room/${roomId}`);

export const exitRoom = (roomId) => axiosInstance.delete(`/api/chat/room/${roomId}`);
