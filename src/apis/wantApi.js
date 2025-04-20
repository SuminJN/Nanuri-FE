import axiosInstance from "./axios";

const prefix = "/api/want";

// 원트 글 등록
export const addWant = async (post) => {
  return await axiosInstance.post(prefix, post);
};

// 나눔자가 원드 글에 나눔 신청
export const applyWant = async (postId) => {
  return await axiosInstance.post(`${prefix}/${postId}/select`);
};

// 원트 단건 조회
export const getWant = async (postId) => {
  return await axiosInstance.get(`${prefix}/${postId}`);
};

// 원트 글 전체 조회
export const getWantList = async () => {
  return await axiosInstance.get(`${prefix}/posts`);
};

// 원트 글 수정
export const editWant = async (postId, post) => {
  return await axiosInstance.patch(`${prefix}/${postId}`, post);
};

// 원트 완료 상태 수정
export const completeWant = async (postId) => {
  return await axiosInstance.patch(`${prefix}/${postId}/done`, { params: { isFinished: true } });
};

// 원트 글 삭제
export const deleteWant = async (postId) => {
  return await axiosInstance.delete(`${prefix}/${postId}`);
};
