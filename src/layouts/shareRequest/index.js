import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import Footer from "../../examples/Footer";
import ReceiveDoneInformation from "./component/ReceiveDoneInformation";
import ReceivingInformation from "./component/ReceivingInformation";

function ShareRequest() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox position="relative">
        <Grid container>
          <Grid item xs={12} md={6} lg={4}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="대기 중"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      hourglass_full_two_tone_icon
                    </Icon>
                  }
                />
                <Tab
                  label="받은 물건"
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
      <MDBox my={3}>{tabValue === 0 ? <ReceivingInformation /> : <ReceiveDoneInformation />}</MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ShareRequest;
