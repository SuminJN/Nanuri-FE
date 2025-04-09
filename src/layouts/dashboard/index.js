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
import SharingItems from "./SharingItems";
import ReceivingItems from "./ReceivingItems";

function Dashboard() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox position="relative">
        <Grid container>
          <Grid item xs={12} md={6} lg={4}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="나눠요"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      volunteer_activism
                    </Icon>
                  }
                />
                <Tab
                  label="받아요"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      handshake_icon
                    </Icon>
                  }
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2} mb={3}>
        {tabValue === 0 && <SharingItems />}
        {tabValue === 1 && <ReceivingItems />}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
