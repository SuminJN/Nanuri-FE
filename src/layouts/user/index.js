import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getOtherPage } from "../../apis/userApi";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Header from "../profile/components/Header";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import MDTypography from "../../components/MDTypography";
import Footer from "../../examples/Footer";
import Divider from "@mui/material/Divider";
import OtherUserShareCardList from "./OtherUserShareCardList";
import IconButton from "@mui/material/IconButton";
import { navbarIconButton } from "../../examples/Navbars/DashboardNavbar/styles";
import Icon from "@mui/material/Icon";

function User() {
  const navigate = useNavigate();
  const { nickname } = useParams();
  const [user, setUser] = useState({
    introduction: "",
    mbti: "",
    nickname: "",
    interestCategory: [],
    sharingItemList: [],
    completedItemList: [],
  });

  const userFields = [
    { label: "닉네임", value: user.nickname },
    { label: "MBTI", value: user.mbti },
    {
      label: "관심 목록",
      value: Array.isArray(user.interestItemCategory) ? user.interestItemCategory.join(", ") : " ",
    },
  ];

  const userInfo = userFields.map(({ label, value }) => (
    <MDBox key={label} display="flex" flexDirection="row" alignItems="center" justifyContent="left">
      <MDTypography variant="h6" fontWeight="bold" color="info" gutterBottom>
        {label}
      </MDTypography>
      <MDTypography variant="button" color="text" fontWeight="bold" gutterBottom>
        &nbsp;&nbsp;{value}
      </MDTypography>
    </MDBox>
  ));

  useEffect(() => {
    getOtherPage(nickname).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        setUser(res.data);
      } else {
        alert("유저 정보를 가져오는 데 실패했습니다.");
      }
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8}>
          <MDBox mb={2}>
            <IconButton
              size="small"
              disableRipple
              sx={navbarIconButton}
              variant="contained"
              onClick={() => {
                navigate(-1);
              }}
            >
              <Icon>arrow_back_ios_icon</Icon>
            </IconButton>
          </MDBox>
          <Header nickname={user.nickname} />
          <MDBox mt={2} mb={3}>
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={12} md={6}>
                <MDBox
                  borderRadius="lg"
                  sx={{ borderColor: "grey.300", height: "100%" }}
                  border={2}
                  shadow="md"
                >
                  <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    pt={2}
                    px={2}
                  >
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                      프로필 정보
                    </MDTypography>
                  </MDBox>

                  <MDBox p={2}>
                    <MDBox mb={2} lineHeight={1}>
                      <MDTypography variant="button" color="text" fontWeight="bold">
                        {user.introduction}
                      </MDTypography>
                    </MDBox>
                    <MDBox opacity={0.3}>
                      <Divider />
                    </MDBox>
                    {userInfo}
                  </MDBox>
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <OtherUserShareCardList itemList={user.sharingItemList} />
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default User;
