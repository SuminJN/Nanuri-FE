import axiosInstance from "./axios";

const prefix = "/api/notification";

// 알림 목록 조회
export const getNotification = async () => {
  return await axiosInstance.get(prefix);
};

// 알림 읽음 처리
export const readNotification = async (notificationId) => {
  return await axiosInstance.patch(`${prefix}/${notificationId}`);
};
