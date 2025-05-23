import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { LoginState } from "../recoil/LoginState";

export default function PrivateRoutes() {
  const isLogin = useRecoilValue(LoginState);
  const notify = () => {
    toast.error("로그인이 필요합니다.", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  if (!isLogin) {
    notify();
    return <Navigate to="/home" />;
  }
  return <Outlet />;
}
