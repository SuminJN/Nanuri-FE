import {Navigate, Outlet} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {LoginState} from "../recoil/LoginState";
import {useEffect} from "react";

function PrivateRoute() {
    const isLoggedIn = useRecoilValue(LoginState);

    const isActive = () => {
        if (isLoggedIn) {
            return true;
        } else {
            alert("로그인 후 이용 가능합니다.");
            return false;
        }
    };

    // 네비게이션바에 under line이 남아있는 버그로 화면 리로드를 넣어줌
    useEffect(() => {
        if (window.location.pathname === "/") {
            return () => {
                window.location.reload()
            };
        }
    }, []);

    return isActive() ? <Outlet/> : <Navigate to={"/"}/>;
}

export default PrivateRoute;