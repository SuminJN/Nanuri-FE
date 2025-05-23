import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation, Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import theme from "assets/theme";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import logo from "assets/logo.png";
import { useRecoilValue } from "recoil";
import { LoginState } from "./recoil/LoginState";
import SignIn from "./layouts/authentication/sign-in";
import LoginIng from "./util/LoginIng";
import DetailItem from "./layouts/detail/DetailItem";
import AddItem from "./layouts/add/AddItem";
import SignUp from "./layouts/authentication/sign-up";
import ShareHistory from "./layouts/shareHistory";
import { FloatButton } from "antd";
import Wish from "./layouts/wish/Wish";
import Chat from "./layouts/chat/Chat";
import AddPost from "./layouts/add/AddPost";
import DetailPost from "./layouts/detail/DetailPost";
import Notifications from "./layouts/notifications";
import EditItem from "./layouts/edit/EditItem";
import ChatRoom from "./layouts/chat/ChatRoom";
import EditPost from "./layouts/edit/EditPost";
import User from "./layouts/user";
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./components/privateRoutes";
import Dashboard from "./layouts/dashboard";
import Profile from "./layouts/profile";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const loginState = useRecoilValue(LoginState);
  const navigate = useNavigate();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
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
    // <ThemeProvider theme={darkMode ? themeDark : theme}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brand={logo}
            brandName="한줌"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />

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
        </>
      )}
      <Routes>
        {loginState ? (
          <>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/home" />} />
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
            <Route path="/profile/:itemId" element={<DetailItem />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:roomId" element={<ChatRoom />} />
            <Route path="/notifications" element={<Notifications />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Dashboard />} />

            <Route path="/home/:itemId" element={<DetailItem />} />
            <Route path="/home/post/:postId" element={<DetailPost />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/callback" element={<LoginIng />} />
            <Route path="/signup" element={<SignUp />} />

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
    </ThemeProvider>
  );
}
