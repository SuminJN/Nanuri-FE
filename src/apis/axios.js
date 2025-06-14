import axios from "axios";

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
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    if (error.response.status === 400) {
      alert("잘못된 요청입니다. 다시 시도해주세요.");
    } else if (error.response.status === 401) {
      alert("토큰 오류: 다시 로그인해주세요.");
      localStorage.clear();
      window.location.href = "/home";
    } else if (error.response.status === 403) {
      alert("권한이 없습니다. 관리자에게 문의해주세요.");
    } else if (error.response.status === 404) {
      alert("요청한 리소스를 찾을 수 없습니다.");
    } else if (error.response.status === 409) {
      alert("이미 존재하는 데이터입니다. 다른 값을 입력해주세요.");
    } else if (error.response.status === 500) {
      alert("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
    // 그 외의 오류는 그대로 전파
    return Promise.reject(error);
  }
);

export default axiosInstance;
