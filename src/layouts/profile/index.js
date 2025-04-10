/**
 =========================================================
 * Material Dashboard 2 React - v2.2.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ChatRoomList from "../chat/ChatRoomList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import DefaultItemCard from "../../examples/Cards/ItemCards/DefaultItemCard";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/axios";
import ShareCardList from "./components/ShareCardList";

function Overview() {
  const [user, setUser] = useState({
    uniqueId: "",
    name: "",
    department: "",
    nickname: "",
  });

  const getUser = async () => {
    const response = await axiosInstance.get("/api/user");
    setUser(response.data);
  };

  useEffect(() => {
    axiosInstance.get("/api/user").then((response) => {
      setUser(response.data);
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header nickname={user.nickname} />
      <MDBox mt={2} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="프로필 정보"
              description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                id: user.uniqueId,
                fullName: user.name,
                nickname: user.nickname,
                department: user.department,
              }}
              action={{ route: "", tooltip: "Edit Profile" }}
              shadow={false}
            />
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
