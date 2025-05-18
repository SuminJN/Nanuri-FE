import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import useGetTime from "../../hooks/useGetTime";
import MDAvatar from "../../components/MDAvatar";
import { Image } from "antd";
import { Link } from "react-router-dom";

function ShareCard({
  itemId,
  image,
  title,
  category,
  createdTime,
  viewCount,
  wishCount,
  chatCount,
}) {
  const { getCurrentTime } = useGetTime();

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={1}
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
            &nbsp;{wishCount}
          </MDTypography>
        </MDBox>
        <MDBox mr={2} display="flex" alignItems="center">
          <Icon fontSize="small" color="secondary">
            chat_icon
          </Icon>
          <MDTypography variant="caption" fontWeight="medium" lineHeight={0}>
            &nbsp;{chatCount}
          </MDTypography>
        </MDBox>
        <MDButton
          component={Link}
          to={`/profile/${itemId}`}
          variant="text"
          color="info"
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
  wishCount: PropTypes.number.isRequired,
  chatCount: PropTypes.number.isRequired,
};

export default ShareCard;
