import axiosInstance from "./axios";

const prefix = "/api/wish";

// 관심 목록 추가
export const addWish = (itemId) => {
  return axiosInstance.post(prefix, { itemId: itemId });
};

// 관심 목록 삭제
export const deleteWish = (itemId) => {
  return axiosInstance.delete(`${prefix}/${itemId}`);
};

// 관심 목록 조회
export const getWish = () => {
  return axiosInstance.get(prefix);
};
