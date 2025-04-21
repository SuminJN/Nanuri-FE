import { getToken } from "firebase/messaging";
import { messaging } from "util/settingFCM";
import axiosInstance from "../apis/axios"; // Firebase 설정 파일

// 사용자의 푸시 알림 권한 요청
export async function handleAllowNotification() {
  await Notification.requestPermission();
  registerServiceWorker();
  try {
    await getDeviceToken();
  } catch (error) {
    console.error(error);
  } finally {
  }
}

// 서비스 워커 실행 함수
function registerServiceWorker() {
  navigator.serviceWorker
    .register("firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Service Worker 등록 성공:", registration);
    })
    .catch(function (error) {
      console.log("Service Worker 등록 실패:", error);
    });
}

async function getDeviceToken() {
  // 권한이 허용된 후에 토큰을 가져옴
  const token = await getToken(messaging, {
    vapidKey: process.env.VAPIDKEY,
  });
  console.log("토큰: ", token);

  // const response = axiosInstance.post("/api/fcm/token", { token: token });
  //
  // console.log("토큰 전송 성공: ", response);
}
