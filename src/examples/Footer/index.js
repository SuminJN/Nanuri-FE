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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import typography from "assets/theme/base/typography";
import { useNavigate } from "react-router-dom";

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;
  const navigate = useNavigate();

  // const renderLinks = () =>
  //   links.map((link) => (
  //     <MDBox key={link.name} component="li" px={2} lineHeight={1}>
  //       <Link
  //         href="#"
  //         onClick={(e) => {
  //           e.preventDefault();
  //           navigate(link.href);
  //         }}
  //       >
  //         <MDTypography variant="button" fontWeight="regular" color="text">
  //           {link.name}
  //         </MDTypography>
  //       </Link>
  //     </MDBox>
  //   ));

  const renderLinks = () => {
    return (
      <>
        <MDBox component="li" px={2} lineHeight={1}>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/policy/service");
            }}
          >
            <MDTypography variant="button" fontWeight="regular" color="text">
              이용약관
            </MDTypography>
          </Link>
        </MDBox>
        <MDBox component="li" px={2} lineHeight={1}>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/policy/privacy");
            }}
          >
            <MDTypography variant="button" fontWeight="regular" color="text">
              개인정보처리방침
            </MDTypography>
          </Link>
        </MDBox>
      </>
    );
  };

  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={3}
      mt={5}
      mb={3}
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()} HGU · 한줌
      </MDBox>
      <MDBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
        {renderLinks()}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "https://github.com/HGU-WALAB", name: "한줌" },
  links: [
    { href: "https://github.com/HGU-WALAB", name: "팀소개" },
    { href: "/policy/service", name: "이용약관" },
    { href: "/policy/privacy", name: "개인정보처리방침" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
