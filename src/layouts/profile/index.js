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

function Overview() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    uniqueId: "",
    name: "",
    department: "",
    nickname: "",
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
      <Header nickname={user.nickname} />
      <MDBox mt={2} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4}>
            {isEditing ? (
              <Card sx={{ height: "100%" }}>
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
                    <MDTypography variant="h6">소개글</MDTypography>
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
                    <MDTypography variant="h6" fontWeight="bold">
                      닉네임
                    </MDTypography>
                    <TextField name="nickname" value={user.nickname} onChange={handleChangeInfo} />
                  </MDBox>
                </MDBox>
              </Card>
            ) : (
              <ProfileInfoCard
                title="프로필 정보"
                user={{
                  introduction: user.introduction,
                  nickname: user.nickname,
                  id: user.uniqueId,
                  fullName: user.name,
                  department: user.department,
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
