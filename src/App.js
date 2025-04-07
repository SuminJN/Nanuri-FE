import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, Link, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { useRecoilValue } from "recoil";
import { LoginState } from "./recoil/LoginState";
import SignIn from "./layouts/authentication/sign-in";
import LoginIng from "./services/LoginIng";
import ItemDetail from "./layouts/itemDetail";
import AddItem from "./layouts/addItem";
import SignUp from "./layouts/authentication/sign-up";
import ShareHistory from "./layouts/shareHistory";
import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import Wish from "./layouts/wish/Wish";
import Chat from "./layouts/chat/Chat";
import ChatField from "./layouts/chat/ChatField";

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

  const floatingButton = () => (
    <>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ insetInlineEnd: 94 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
    </>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Nanuri"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {/*{configsButton}*/}
          <FloatButton.Group
            trigger="hover"
            type="primary"
            style={{ insetInlineEnd: 24 }}
            icon={<Icon sx={{ fontWeight: "bold" }}>add</Icon>}
          >
            <FloatButton
              description={<strong>나눔 하기</strong>}
              onClick={() => {
                navigate("/addItem");
              }}
            />
            <FloatButton description={<strong>나눔 받기</strong>} />
          </FloatButton.Group>
        </>
      )}
      {/*{layout === "vr" && <Configurator />}*/}
      <Routes>
        {loginState ? (
          <>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/home/:itemId" element={<ItemDetail />} />
            <Route path="/addItem" element={<AddItem />} />
            <Route path="/my-share" element={<ShareHistory />} />
            <Route path="/my-share/:itemId" element={<ItemDetail />} />
            <Route path="/wish" element={<Wish />} />
            <Route path="/wish/:itemId" element={<ItemDetail />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:roomId" element={<ChatField />} />
          </>
        ) : (
          <>
            <Route path="*" element={<SignIn />} />
            <Route path="/nanuri/callback" element={<LoginIng />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
}
