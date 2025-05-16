import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import { useNavigate } from "react-router-dom";
import OtherUserShareCard from "./OtherUserShareCard";
import PropTypes from "prop-types";

function OtherUserShareCardList({ itemList }) {
  const navigate = useNavigate();

  return (
    <MDBox
      borderRadius="lg"
      sx={{ borderColor: "grey.300", height: "100%" }}
      border={2}
      shadow="md"
    >
      <MDBox pt={2} px={2} mb={1} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          진행중인 나눔
        </MDTypography>
      </MDBox>
      <MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          px={1}
          m={0}
          sx={{ overflowY: "auto", maxHeight: "400px" }} // 스크롤 가능하도록 스타일 추가
        >
          {itemList === null
            ? null
            : itemList.map((item) => (
                <MDBox key={item.itemId}>
                  <OtherUserShareCard
                    itemId={item.itemId}
                    image={item.image}
                    title={item.title}
                    category={item.category}
                    createdTime={item.createdTime}
                    viewCount={item.viewCount}
                    wishCount={item.wishCount}
                    chatCount={item.chatCount}
                    route={`/my-share/${item.itemId}`}
                  />
                </MDBox>
              ))}
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

OtherUserShareCardList.propTypes = {
  itemList: PropTypes.array,
};

export default OtherUserShareCardList;
