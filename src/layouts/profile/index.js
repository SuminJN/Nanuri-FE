import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "./ProfileInfoCard";
import ChatRoomList from "../chat/ChatRoomList";
import Header from "layouts/profile/components/Header";
import profilesListData from "layouts/profile/data/profilesListData";
import axiosInstance from "../../apis/axios";
import React, { useEffect, useState } from "react";
import ShareCardList from "./components/ShareCardList";
import MDTypography from "../../components/MDTypography";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function Overview() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    uniqueId: "",
    name: "",
    department: "",
    nickname: "",
    mbti: "",
    interestCategory: [],
  });

  const handleClickEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChangeInfo = (e) => {
    user[e.target.name] = e.target.value;
    setUser({ ...user });
  };

  const handleSubmitEdit = async () => {
    const response = await axiosInstance.patch("/api/user", user);
    console.log(response.data);
    setUser(response.data);
    setIsEditing(false);
    window.location.reload();
  };

  const getUser = async () => {
    const response = await axiosInstance.get("/api/user");
    console.log(response.data);
    setUser(response.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Header nickname={user.nickname} />
      <MDBox mt={2} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4}>
            {isEditing ? (
              <MDBox borderRadius="lg" sx={{ borderColor: "grey.400" }} border={1} shadow="md">
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  pt={2}
                  px={2}
                >
                  <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    프로필 수정
                  </MDTypography>
                  <MDTypography
                    variant="body2"
                    color="secondary"
                    sx={{ cursor: "pointer" }}
                    onClick={handleSubmitEdit}
                  >
                    <Tooltip title="프로필 수정" placement="top">
                      <Icon>done_icon</Icon>
                    </Tooltip>
                  </MDTypography>
                </MDBox>
                <MDBox p={2}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" fontWeight="bold" color="info">
                      소개글
                    </MDTypography>
                    <TextField
                      name="introduction"
                      value={user.introduction}
                      onChange={handleChangeInfo}
                      multiline
                      rows={6}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" fontWeight="bold" color="info">
                      닉네임
                    </MDTypography>
                    <TextField
                      name="nickname"
                      value={user.nickname}
                      onChange={handleChangeInfo}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" fontWeight="bold" color="info">
                      MBTI
                    </MDTypography>
                    <TextField
                      name="mbti"
                      value={user.mbti}
                      onChange={handleChangeInfo}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={1}>
                    <MDTypography variant="h6" fontWeight="bold" color="info">
                      관심 목록
                    </MDTypography>
                    <Select
                      sx={{ height: "45px" }}
                      name="interestCategory"
                      value={user.interestCategory}
                      onChange={handleChangeInfo}
                      fullWidth
                    >
                      <MenuItem value="MAJOR_BOOK">전공 서적</MenuItem>
                      <MenuItem value="GENERAL_BOOK">일반 도서</MenuItem>
                      <MenuItem value="DIGITAL_DEVICE">디지털기기</MenuItem>
                      <MenuItem value="STATIONERY">문구류</MenuItem>
                      <MenuItem value="SPORTS">운동용품</MenuItem>
                    </Select>
                  </MDBox>
                </MDBox>
              </MDBox>
            ) : (
              <ProfileInfoCard
                title="프로필 정보"
                user={{
                  introduction: user.introduction,
                  nickname: user.nickname,
                  id: user.uniqueId,
                  fullName: user.name,
                  department: user.department,
                  mbti: user.mbti,
                  // interestCategory: user.interestCategory,
                  interestCategory: "전공 서적",
                }}
                handleClickEdit={handleClickEdit}
              />
            )}
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <ShareCardList />
          </Grid>
          <Grid item xs={12} xl={4}>
            <ChatRoomList title="conversations" profiles={profilesListData} shadow={false} />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
