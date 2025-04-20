import axiosInstance from "./axios";

const prefix = "/api/user";

// 자신의 마이페이지 조회
export const getMyPage = () => {
  return axiosInstance.get(prefix);
};

// 자신의 유저 정보 수정
export const updateUser = (data) => {
  return axiosInstance.put(prefix, data);
};

// 유저 탈퇴
export const deleteUser = () => {
  return axiosInstance.delete(prefix);
};

// 다른 유저의 마이페이지 보기
export const getOtherPage = (nickname) => {
  return axiosInstance.get(`${prefix}/${nickname}`);
};

// 유저 닉네임 중복 체크
export const checkNickname = (nickname) => {
  return axiosInstance.get(`${prefix}/checkNickname`, { params: { nickname } });
};
