import axiosInstance from "./axios";

const prefix = "/api/history";

// 아이템 거래 신청
export const applyItem = (itemId) => {
  return axiosInstance.post(prefix, { itemId: itemId });
};

// 내가 대기 중인 아이템 조회
export const getMyWaitingItems = () => {
  return axiosInstance.get(`${prefix}/receiving`);
};

// 내가 받은 아이템 조회
export const getMyReceivedItems = () => {
  return axiosInstance.get(`${prefix}/receive-done`);
};

// 아이템 거래 완료 상태 수정
export const completeItem = (historyId) => {
  return axiosInstance.patch(`${prefix}/${historyId}/complete`);
};

// 아이템 나눔 신청 취소
export const cancelItem = (historyId) => {
  return axiosInstance.delete(`${prefix}/${historyId}`);
};
