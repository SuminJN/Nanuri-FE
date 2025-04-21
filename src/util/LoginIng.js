import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { LoginState } from "../recoil/LoginState";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/authApi";
import { NicknameState } from "../recoil/NicknameState";
import { handleAllowNotification } from "./notification";

function LoginIng() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [nickname, setNickname] = useRecoilState(NicknameState);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const credential = urlParams.get("token");
      console.log(credential);

      if (credential) {
        const nickname = await login(credential);
        setNickname(nickname);

        // 로그인 성공 시 상태 업데이트
        setIsLoggedIn(true);

        // FCM 알림 권한 요청
        await handleAllowNotification();

        // 닉네임이 없다면 신규 유저
        if (!nickname) {
          window.location.href = "/signup";
        }
        // 닉네임이 있다면 기존 유저
        else {
          navigate("/");
        }
      } else {
        throw new Error("히즈넷 토큰이 존재하지 않습니다.");
      }
    } catch (error) {
      alert("로그인 실패!");
      console.log("Login API 오류:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // 빈 배열을 전달하여 페이지가 로드될 때 한 번만 실행되도록 함

  return null; // 이 컴포넌트는 아무것도 렌더링하지 않음
}

export default LoginIng;
