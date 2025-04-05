import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultItemCard from "../../examples/Cards/ItemCards/DefaultItemCard";
import axiosInstance from "../../apis/axios";
import { useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import SharingInformation from "../shareHistory/component/SharingInformation";
import ShareDoneInformation from "../shareHistory/component/ShareDoneInformation";
import TotalItems from "./TotalItems";
import SharingItems from "./SharingItems";
import CompletedItems from "./CompletedItems";

function Dashboard() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox position="relative">
        <Grid container>
          <Grid item xs={12} md={6} lg={6}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="전체"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      dashboard
                    </Icon>
                  }
                />
                <Tab
                  label="나눔 중"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      volunteer_activism
                    </Icon>
                  }
                />
                <Tab
                  label="나눔 완료"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      download_done_icon
                    </Icon>
                  }
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2} mb={3}>
        {tabValue === 0 ? <TotalItems /> : tabValue === 1 ? <SharingItems /> : <CompletedItems />}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
