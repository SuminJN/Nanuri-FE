import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import Grid from "@mui/material/Grid";
import { Image } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

function SharingItemCard({ itemId, image, title, createdTime, category, description, route }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      shadow="sm"
      p={2}
      mb={1}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Image
            width="100%"
            height="200px"
            src={image}
            style={{ borderRadius: "8px" }}
            alt="image"
          />
        </Grid>
        <Grid item xs={12} style={{ height: "200px" }}>
          <MDBox width="100%" display="flex" flexDirection="column">
            <MDBox mt={1} mb={2}>
              <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize" color="info">
                {title}
              </MDTypography>
            </MDBox>
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" fontWeight="regular" color="text">
                게시일:&nbsp;&nbsp;&nbsp;
                <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                  {createdTime}
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" fontWeight="regular" color="text">
                테그:&nbsp;&nbsp;&nbsp;
                <MDTypography variant="caption" fontWeight="medium">
                  {category}
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDTypography variant="caption" fontWeight="regular" color="text">
              내용:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {description}
              </MDTypography>
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          style={{ marginTop: "auto" }}
        >
          <MDButton
            component={Link}
            to={route}
            variant="text"
            color="info"
            style={{ whiteSpace: "nowrap" }}
          >
            <Icon>edit</Icon>&nbsp;자세히 보기
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}

SharingItemCard.defaultProps = {
  noGutter: false,
};

SharingItemCard.propTypes = {
  itemId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  createdTime: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default SharingItemCard;
