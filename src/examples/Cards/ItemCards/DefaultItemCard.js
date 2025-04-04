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

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";

function DefaultItemCard({ image, label, title, description, action, createdTime }) {
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        // boxShadow: "none",
        overflow: "visible",
      }}
    >
      <MDBox position="relative" width="100%" shadow="md" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            width: "100%",
            height: "200px",
            objectFit: "cover",
            margin: 0,
            // boxShadow: ({ boxShadows: { md } }) => md,
            objectPosition: "center",
          }}
        />
      </MDBox>
      <MDBox mt={1} mx={2}>
        <MDTypography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
          {label}
        </MDTypography>
        <MDBox mb={1}>
          <MDTypography component={Link} to={action.route} variant="h5" textTransform="capitalize">
            {title}
          </MDTypography>
        </MDBox>
        <MDBox mb={3} lineHeight={0}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            {truncate(description, 22)}
          </MDTypography>
        </MDBox>
        <MDBox mb={2} display="flex" justifyContent="flex-end" alignItems="center">
          <MDButton
            component={Link}
            to={action.route}
            variant="outlined"
            size="small"
            color={action.color}
          >
            {action.label}
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultItemCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultItemCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  createdTime: PropTypes.string.isRequired,
};

export default DefaultItemCard;
