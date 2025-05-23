import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { getNotification } from "../../apis/notificationApi";

function Notifications() {
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    getNotification().then((res) => {
      console.log(res.data);
      setNotificationList(res.data);
    });
  }, []);

  return (
    <DashboardLayout>
      <MDBox p={3}>
        <DashboardNavbar />
        <MDBox mt={6} mb={3}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} lg={8}>
              <Card>
                <MDBox p={2}>
                  <MDTypography variant="h4" fontWeight="bold" color="info">
                    알림 목록
                  </MDTypography>
                </MDBox>
                <MDBox pt={2} px={2}>
                  {notificationList.map((notification, index) => (
                    <MDAlert key={index} notificationId={notification.id} color="light" dismissible>
                      <MDTypography variant="body2" color="black">
                        <MDTypography
                          component="a"
                          href="#"
                          variant="body2"
                          fontWeight="medium"
                          color="black"
                        >
                          {notification.title}
                          <MDTypography variant="body2" color="black">
                            {notification.body}
                          </MDTypography>
                        </MDTypography>
                      </MDTypography>
                    </MDAlert>
                  ))}
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Notifications;
