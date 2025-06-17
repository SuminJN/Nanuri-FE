import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDAvatar from "../../components/MDAvatar";
import MDButton from "../../components/MDButton";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/axios";
import Icon from "@mui/material/Icon";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useRecoilState } from "recoil";
import { ChatTabValue } from "../../recoil/ChatTapValue";

function ChatRoomList() {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useRecoilState(ChatTabValue);
  const handleSetTabValue = async (event, newValue) => {
    setTabValue(newValue);

    if (newValue === 0) {
      getChatRooms(); // 전체
    } else if (newValue === 1) {
      getChatRooms("ITEM"); // 나눠요
    } else if (newValue === 2) {
      getChatRooms("POST"); // 필요해요
    }
  };

  const getChatRooms = async (roomType = null) => {
    try {
      const url = roomType ? `/api/chat/rooms/type?roomType=${roomType}` : `/api/chat/rooms`;
      const response = await axiosInstance.get(url);
      if (response.status === 200) {
        setChatRooms(response.data);
      } else {
        console.error("채팅방 불러오기 실패");
      }
    } catch (err) {
      console.error("에러:", err);
    }
  };

  const handleExitRoom = async () => {
    await axiosInstance.delete(`/api/chat/room/${roomId}`); // 실제 나가기 API
    navigate("/chat");
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
        <MDTypography
          variant="button"
          fontWeight="medium"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1, // 원하는 줄 수로 변경
            WebkitBoxOrient: "vertical",
            minHeight: "1em", // 3줄의 높이를 고정
          }}
        >
          {title}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {opponentNickname} 님과의 대화
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
      sx={{ borderColor: "grey.300", height: "100%" }}
      border={2}
      shadow="md"
    >
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          채팅
        </MDTypography>
      </MDBox>
      <MDBox pt={2} px={2}>
        <Grid item xs={12} sm={6}>
          <AppBar position="static">
            <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
              <Tab label={<MDTypography variant={tabValue === 0 ? "h6" : ""}>전체</MDTypography>} />
              <Tab
                label={<MDTypography variant={tabValue === 1 ? "h6" : ""}>나눠요</MDTypography>}
              />
              <Tab
                label={<MDTypography variant={tabValue === 2 ? "h6" : ""}>필요해요</MDTypography>}
              />
            </Tabs>
          </AppBar>
        </Grid>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {chatRooms.length === 0 ? (
            <MDTypography variant="caption" color="text">
              해당 탭에 채팅방이 없습니다.
            </MDTypography>
          ) : (
            renderProfiles
          )}
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
