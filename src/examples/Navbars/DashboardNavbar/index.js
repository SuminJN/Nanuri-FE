/**
 =========================================================
 * Material Dashboard 2 React - v2.2.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link, useNavigate, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
  navbarDesktopMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoginState } from "../../../recoil/LoginState";
import { logout } from "../../../apis/authApi";
import sidenavLogoLabel from "../../Sidenav/styles/sidenav";
import MDTypography from "../../../components/MDTypography";
import brand from "assets/logo.png";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = decodeURIComponent(useLocation().pathname).split("/").slice(1);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  const handleLogout = () => {
    if (window.confirm("정말로 로그아웃 하시겠습니까?")) {
      logout().then((r) => {
        setIsLoggedIn(false);
        handleCloseMenu();
      });
    }
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /**
     The event listener that's calling the handleTransparentNavbar function when
     scrolling the window.
     */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => navigate("/wish");
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const brandName = "한줌";

  const isLogin = useRecoilValue(LoginState);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <>
        <NotificationItem icon={<Icon>person_icon</Icon>} title="프로필" onClick={goToProfile} />
        <NotificationItem icon={<Icon>logout_icon</Icon>} title="로그아웃" onClick={handleLogout} />
      </>
    </Menu>
  );
  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox sx={navbarDesktopMenu} px={3}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        <MDBox sx={navbarMobileMenu}>
          <MDBox component={NavLink} to="/" display="flex" alignItems="center">
            {brand && <MDBox component="img" src={brand} alt="Brand" width="2rem" />}
            <MDBox sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}>
              <MDTypography variant="h4" fontWeight="bold" color="dark" opacity="0.8">
                &nbsp;{brandName}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox>
          {isLogin ? (
            <>
              <Link to="/notifications">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>notifications</Icon>
                </IconButton>
              </Link>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>account_circle</Icon>
              </IconButton>
            </>
          ) : (
            <>
              <Button size="large" onClick={() => navigate("/login")}>
                Login
              </Button>
            </>
          )}
          <IconButton
            size="small"
            disableRipple
            color="inherit"
            sx={navbarMobileMenu}
            onClick={handleMiniSidenav}
          >
            <Icon sx={iconsStyle} fontSize="medium">
              {miniSidenav ? "menu" : "menu_open"}
            </Icon>
          </IconButton>
          {renderMenu()}
        </MDBox>
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
