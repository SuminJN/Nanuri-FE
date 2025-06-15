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
    const status = error.response?.status;

    if (status === 401) {
      window.alert("인증이 필요합니다. 다시 로그인 해주세요.");
      updateLoginState(false);
      navigateTo("/home");
      return Promise.reject(error); // 또는 return Promise.resolve(null);
    } else if (status === 404) {
      window.alert("요청한 리소스를 찾을 수 없습니다.");
      return Promise.reject(error);
    } else if (status === 500) {
      window.alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
