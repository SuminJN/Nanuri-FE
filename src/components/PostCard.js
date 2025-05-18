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
import useGetTime from "../hooks/useGetTime";

function PostCard({ itemId, title, createdTime, description, viewCount, route }) {
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
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          style={{ height: "200px", cursor: "pointer" }}
          onClick={() => navigate(route)}
        >
          <MDBox width="100%" display="flex" flexDirection="column">
            <MDBox mt={1} mb={0.5} lineHeight={0}>
              <MDTypography variant="h5" fontWeight="bold" textTransform="capitalize" color="info">
                {title}
              </MDTypography>
            </MDBox>
            <MDBox mb={3} lineHeight={0}>
              <MDTypography variant="caption" fontWeight="regular" color="text">
                {createdTime}
              </MDTypography>
            </MDBox>
            <MDBox>
              <MDBox display="flex" justifyContent="start">
                <MDTypography variant="caption" fontWeight="medium">
                  {description}
                </MDTypography>
              </MDBox>
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
          {/*<MDBox mr={2} display="flex" justifyContent="flex-end" alignItems="center">*/}
          {/*  <Icon fontSize="small">emoji_objects_icon</Icon>*/}
          {/*  <MDTypography variant="caption" fontWeight="medium" lineHeight={0}>*/}
          {/*    &nbsp;0*/}
          {/*  </MDTypography>*/}
          {/*</MDBox>*/}
          <MDBox mr={2} display="flex" justifyContent="flex-end" alignItems="center">
            <Icon fontSize="small">remove_red_eye_icon</Icon>
            <MDTypography variant="caption" fontWeight="medium" lineHeight={0}>
              &nbsp;{viewCount}
            </MDTypography>
          </MDBox>
          {/*<MDButton*/}
          {/*  component={Link}*/}
          {/*  to={route}*/}
          {/*  variant="text"*/}
          {/*  color="info"*/}
          {/*  style={{ whiteSpace: "nowrap", padding: 10 }}*/}
          {/*>*/}
          {/*  <Icon>edit</Icon>&nbsp;자세히 보기*/}
          {/*</MDButton>*/}
        </Grid>
      </Grid>
    </MDBox>
  );
}

PostCard.defaultProps = {
  noGutter: false,
};

PostCard.propTypes = {
  itemId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdTime: PropTypes.string.isRequired,
  viewCount: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired,
};

export default PostCard;
