import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation, Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import theme from "assets/theme";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import logo from "assets/logo.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LoginState } from "./recoil/LoginState";
import { ConfigProvider, FloatButton } from "antd";
import { ToastContainer } from "react-toastify";
import { setNavigate } from "./util/navigationService";
import { setLoginStateSetter } from "./util/authService";

// Lazy load routes
const SignIn = lazy(() => import("./layouts/authentication/sign-in"));
const LoginIng = lazy(() => import("./util/LoginIng"));
const DetailItem = lazy(() => import("./layouts/detail/DetailItem"));
const AddItem = lazy(() => import("./layouts/add/AddItem"));
const SignUp = lazy(() => import("./layouts/authentication/sign-up"));
const ShareHistory = lazy(() => import("./layouts/shareHistory"));
const Wish = lazy(() => import("./layouts/wish/Wish"));
const Chat = lazy(() => import("./layouts/chat/Chat"));
const AddPost = lazy(() => import("./layouts/add/AddPost"));
const DetailPost = lazy(() => import("./layouts/detail/DetailPost"));
const Notifications = lazy(() => import("./layouts/notifications"));
const EditItem = lazy(() => import("./layouts/edit/EditItem"));
const ChatRoom = lazy(() => import("./layouts/chat/ChatRoom"));
const EditPost = lazy(() => import("./layouts/edit/EditPost"));
const User = lazy(() => import("./layouts/user"));
const PrivateRoutes = lazy(() => import("./components/privateRoutes"));
const Dashboard = lazy(() => import("./layouts/dashboard"));
const Profile = lazy(() => import("./layouts/profile"));
const TermsOfService = lazy(() => import("./layouts/policy/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./layouts/policy/PrivacyPolicy"));

if (process.env.NODE_ENV === "production") {
  ["log", "warn", "error"].forEach((method) => {
    console[method] = () => {};
  });
}

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const loginState = useRecoilValue(LoginState);
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(LoginState);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // useEffect(() => {
  //   const ua = navigator.userAgent.toLowerCase();
  //   const isIOSKakao = /iphone|ipad|ipod/.test(ua) || ua.includes("kakao");
  //
  //   if (isIOSKakao) {
  //     alert("카카오톡에서 열 수 없는 페이지입니다. 사파리 또는 외부 브라우저에서 열어주세요.");
  //     window.location.href = "https://walab.info/handful"; // 외부 브라우저용 링크
  //   }
  // }, []);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
    setNavigate(navigate);
    setLoginStateSetter(setLoginState);
  }, [direction, navigate, setLoginState]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    // 👉 /home 진입 시 amp 쿠키 삭제
    if (pathname === "/handful") {
      const cookies = document.cookie.split(";").map((c) => c.trim());
      const hasAmp = cookies.some((c) => c.startsWith("amp="));

      if (hasAmp) {
        document.cookie = "amp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        console.log("✅ amp 쿠키 삭제됨");
      }
    }
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      component={Link}
      to="/addItem"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="info"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="white"
      sx={{ cursor: "pointer" }}
    >
      <Icon sx={{ fontWeight: "bold" }}>add</Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgb(91,161,94)",
            colorPrimaryHover: "rgba(26,108,29,0.53)",
          },
        }}
      >
        <CssBaseline />
        <ToastContainer />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={logo}
              brandName="한줌"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />

            {!pathname.startsWith("/chat") && (
              <FloatButton.Group
                shape="square"
                trigger="hover"
                type="primary"
                style={{ insetInlineEnd: 24 }}
                icon={<Icon sx={{ fontWeight: "bold" }}>add</Icon>}
              >
                <FloatButton
                  shape="square"
                  description={<strong>나눔 하기</strong>}
                  onClick={() => {
                    navigate("/home/addItem");
                  }}
                />
                <FloatButton
                  shape="square"
                  description={<strong>나눔 받기</strong>}
                  onClick={() => {
                    navigate("/home/addPost");
                  }}
                />
              </FloatButton.Group>
            )}
          </>
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {loginState ? (
              <>
                <Route path="*" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/home/:itemId" element={<DetailItem />} />
                <Route path="/home/post/:postId" element={<DetailPost />} />
                <Route path="/home/addItem" element={<AddItem />} />
                <Route path="/home/addPost" element={<AddPost />} />
                <Route path="/home/edit-item/:itemId" element={<EditItem />} />
                <Route path="/home/edit-post/:postId" element={<EditPost />} />
                <Route path="/my-share" element={<ShareHistory />} />
                <Route path="/my-share/:itemId" element={<DetailItem />} />
                <Route path="/user/:nickname" element={<User />} />
                <Route path="/wish" element={<Wish />} />
                <Route path="/wish/:itemId" element={<DetailItem />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:itemId" element={<DetailItem />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/chat/:roomId" element={<ChatRoom />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/policy/service" element={<TermsOfService />} />
                <Route path="/policy/privacy" element={<PrivacyPolicy />} />
              </>
            ) : (
              <>
                <Route path="*" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/home/:itemId" element={<DetailItem />} />
                <Route path="/home/post/:postId" element={<DetailPost />} />
                <Route path="/login" element={<SignIn />} />
                <Route path={`${process.env.REACT_APP_CALLBACK_URL}`} element={<LoginIng />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/policy/service" element={<TermsOfService />} />
                <Route path="/policy/privacy" element={<PrivacyPolicy />} />
                <Route element={<PrivateRoutes />}>
                  <Route path="/home/post/:postId" element={<DetailPost />} />
                  <Route path="/home/addItem" element={<AddItem />} />
                  <Route path="/home/addPost" element={<AddPost />} />
                  <Route path="/home/edit-item/:itemId" element={<EditItem />} />
                  <Route path="/home/edit-post/:postId" element={<EditPost />} />
                  <Route path="/my-share" element={<ShareHistory />} />
                  <Route path="/my-share/:itemId" element={<DetailItem />} />
                  <Route path="/user/:nickname" element={<User />} />
                  <Route path="/wish" element={<Wish />} />
                  <Route path="/wish/:itemId" element={<DetailItem />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:itemId" element={<DetailItem />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/chat/:roomId" element={<ChatRoom />} />
                  <Route path="/notifications" element={<Notifications />} />
                </Route>
              </>
            )}
          </Routes>
        </Suspense>
      </ConfigProvider>
    </ThemeProvider>
  );
}
