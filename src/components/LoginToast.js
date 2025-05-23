import { toast } from "react-toastify";

export const LoginToast = () => {
  toast.error("로그인이 필요합니다.", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  console.log("toast");
};
