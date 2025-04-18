import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDAvatar from "../../components/MDAvatar";
import MDButton from "../../components/MDButton";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/axios";
import Icon from "@mui/material/Icon";

function ChatRoomList() {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);

  const getChatRooms = async () => {
    const response = await axiosInstance("/api/chat/rooms");
    if (response.status === 200) {
      console.log(response.data);
      setChatRooms(response.data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    getChatRooms();
  }, []);

  const renderProfiles = chatRooms.map(({ roomId, itemImage, title, opponentNickname }) => (
    <MDBox key={roomId} component="li" display="flex" alignItems="center" px={2} py={1} mb={1}>
      <MDBox mr={2}>
        <MDAvatar src={itemImage} alt="something here" variant="rounded" shadow="md" size="xl" />
      </MDBox>
      <MDBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
        <MDTypography variant="button" fontWeight="medium">
          {opponentNickname}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox ml="auto">
        <MDButton
          variant="text"
          color="info"
          startIcon={<Icon>chat_icon</Icon>}
          onClick={() => {
            navigate(`/chat/${roomId}`);
          }}
        >
          대화하기
        </MDButton>
      </MDBox>
    </MDBox>
  ));

  return (
    <MDBox
      borderRadius="lg"
      sx={{ borderColor: "grey.400", height: "100%" }}
      border={1}
      shadow="md"
    >
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          채팅
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default props for the ProfilesList
ChatRoomList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
ChatRoomList.propTypes = {};

export default ChatRoomList;
