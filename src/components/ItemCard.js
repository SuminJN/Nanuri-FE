import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import Grid from "@mui/material/Grid";
import { Image } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ItemCard({
  itemId,
  image,
  title,
  createdTime,
  category,
  description,
  viewCount,
  wishCount,
  isWished,
  route,
}) {
  const navigate = useNavigate();
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
      sx={{ borderColor: "grey.300" }}
      border={2}
      shadow="md"
      p={2}
      mb={1}
    >
      <Grid container>
        <Grid item xs={12} style={{ cursor: "pointer" }} onClick={() => navigate(route)}>
          <img
            width="100%"
            height="180px"
            src={image}
            style={{ borderRadius: "8px" }}
            alt="image"
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ height: "140px", cursor: "pointer" }}
          onClick={() => navigate(route)}
        >
          <MDBox width="100%" display="flex" flexDirection="column">
            <MDBox mt={1} mb={0.5} lineHeight={0} display="flex" justifyContent="center">
              <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize" color="info">
                {title}
              </MDTypography>
            </MDBox>
            <MDBox mb={1} lineHeight={0} display="flex" justifyContent="center">
              <MDTypography variant="caption" fontWeight="regular" color="text">
                {category} · {createdTime}
              </MDTypography>
            </MDBox>
            <MDBox display="flex" justifyContent="center">
              <MDTypography
                variant="caption"
                fontWeight="medium"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 4, // 원하는 줄 수로 변경
                  WebkitBoxOrient: "vertical",
                }}
              >
                {description}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          style={{ marginTop: "auto" }}
        >
          <MDBox mr={2} display="flex" justifyContent="flex-end" alignItems="center">
            {isWished ? (
              <Icon fontSize="medium" color="error">
                favorite_icon
              </Icon>
            ) : (
              <Icon fontSize="medium" color="dark">
                favorite_border_icon
              </Icon>
            )}
            <MDTypography variant="caption" fontWeight="medium" lineHeight={0}>
              &nbsp;{wishCount}
            </MDTypography>
          </MDBox>
          <MDBox mr={2} display="flex" justifyContent="flex-end" alignItems="center">
            <Icon fontSize="small" color="dark">
              chat_icon
            </Icon>
            <MDTypography variant="caption" fontWeight="medium" lineHeight={0}>
              &nbsp;0
            </MDTypography>
          </MDBox>
          <MDBox mr={2} display="flex" justifyContent="flex-end" alignItems="center">
            <Icon fontSize="small" color="dark">
              remove_red_eye_icon
            </Icon>
            <MDTypography variant="caption" fontWeight="medium" lineHeight={0}>
              &nbsp;{viewCount}
            </MDTypography>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

ItemCard.defaultProps = {
  noGutter: false,
  isWished: false,
};

ItemCard.propTypes = {
  itemId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  createdTime: PropTypes.string.isRequired,
  viewCount: PropTypes.number.isRequired,
  wishCount: PropTypes.number.isRequired,
  isWished: PropTypes.bool,
  route: PropTypes.string.isRequired,
};

export default ItemCard;
