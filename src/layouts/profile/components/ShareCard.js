import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import useGetTime from "../../../hooks/useGetTime";
import MDAvatar from "../../../components/MDAvatar";
import { Image } from "antd";
import { Link } from "react-router-dom";

function ShareCard({ itemId, image, title, category, createdTime, viewCount }) {
  const { getCurrentTime } = useGetTime();

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={1}
    >
      <MDBox component="li" display="flex" alignItems="center" py={1} mb={1}>
        <MDBox mr={2}>
          <MDAvatar src={image} alt="something here" variant="rounded" shadow="md" size="lg" />
        </MDBox>
        <MDBox>
          <MDTypography display="block" variant="button" fontWeight="medium" color="info">
            {title}
          </MDTypography>
          <MDTypography variant="caption" fontWeight="regular" color="text">
            {category} · {getCurrentTime(createdTime)}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="center">
        <MDBox mr={2} display="flex" alignItems="center">
          <Icon fontSize="small" color="secondary">
            favorite_icon
          </Icon>
          <MDTypography variant="caption" fontWeight="medium" lineHeight={0}>
            &nbsp;0
          </MDTypography>
        </MDBox>
        <MDBox mr={2} display="flex" justifyContent="flex-end" alignItems="center">
          <Icon fontSize="small" color="secondary">
            remove_red_eye_icon
          </Icon>
          <MDTypography variant="caption" fontWeight="medium" lineHeight={0}>
            &nbsp;{viewCount}
          </MDTypography>
        </MDBox>
        <MDButton
          component={Link}
          to={`/profile/${itemId}`}
          variant="text"
          color="text"
          style={{ whiteSpace: "nowrap", padding: 5 }}
        >
          자세히 보기
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Invoice
ShareCard.defaultProps = {};

// Typechecking props for the Invoice
ShareCard.propTypes = {
  itemId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdTime: PropTypes.string.isRequired,
  viewCount: PropTypes.number.isRequired,
};

export default ShareCard;
