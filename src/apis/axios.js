import axios from "axios";
import { navigateTo } from "../util/navigationService";
import { updateLoginState } from "../util/authService";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

// 요청 인터셉터 추가하기
axiosInstance.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      window.alert("인증이 필요합니다. 다시 로그인 해주세요.");
      updateLoginState(false);
      navigateTo("/");
      return;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
