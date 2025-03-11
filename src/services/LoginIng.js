import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {getToken} from "./getToken";
import {LoginState} from "../recoil/LoginState";
import {UserState} from "../recoil/UserState";
import {jwtDecode} from "jwt-decode";

function LoginIng() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    const [userInfo, setUserInfo] = useRecoilState(UserState);

    const fetchData = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const credential = urlParams.get("token");

            if (credential) {
                const user = await getToken(credential);
                const userData = jwtDecode(user.token);
                console.log("userData: ", userData);

                setUserInfo({...userData, token: user.token});
                console.log("userInfo: ", userInfo);

                console.log("user.nickname", user.nickname);
                // 닉네임이 있다면 기존 유저
                if (!user.nickname) {
                    window.location.href = "/signup";
                }
                // 닉네임이 없다면 신규 유저
                else {
                    setIsLoggedIn(true);
                    window.location.href = "/";
                }
            } else {
                throw new Error("토큰이 존재하지 않습니다.");
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
