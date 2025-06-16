import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { LoginState } from "../recoil/LoginState";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/authApi";
import { NicknameState } from "../recoil/NicknameState";

// import { handleAllowNotification } from "./notification";

function LoginIng() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [nickname, setNickname] = useRecoilState(NicknameState);
  const navigate = useNavigate();

  const isKakaoInApp = /KAKAOTALK/i.test(navigator.userAgent);

  const fetchData = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const credential = urlParams.get("token");
      console.log("받은 token:", credential);

      if (credential) {
        const userNickname = await login(credential);
        console.log("받은 nickname:", userNickname);

        setNickname(userNickname);

        // FCM 알림 권한 요청 (옵션)
        // await handleAllowNotification();

        if (!userNickname) {
          // 신규 유저
          if (isKakaoInApp) {
            setTimeout(() => {
              window.location.href = "/handful/signup";
            }, 100);
          } else {
            navigate("/signup", { replace: true });
          }
        } else {
          // 기존 유저
          setIsLoggedIn(true);
          if (isKakaoInApp) {
            setTimeout(() => {
              window.location.href = "/handful/";
            }, 100);
          } else {
            navigate("/", { replace: true });
          }
        }
      } else {
        throw new Error("히즈넷 토큰이 존재하지 않습니다.");
      }
    } catch (error) {
      alert(error.stack);
      console.error("Login API 오류:", error);
      if (isKakaoInApp) {
        setTimeout(() => {
          window.location.href = "/handful/home";
        }, 100);
      } else {
        navigate("/home");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return null; // 이 컴포넌트는 아무것도 렌더링하지 않음
}

export default LoginIng;
