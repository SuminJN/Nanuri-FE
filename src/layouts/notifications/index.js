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

import { useState } from "react";

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

function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      A simple {name} alert with{" "}
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </MDTypography>
      . Give it a click if you like.
    </MDTypography>
  );

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <DashboardLayout>
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
                <MDAlert color="light" dismissible>
                  <MDTypography variant="body2" color="black">
                    <MDTypography
                      component="a"
                      href="#"
                      variant="body2"
                      fontWeight="medium"
                      color="black"
                    >
                      고질라님에게 온 채팅{" "}
                      <MDTypography variant="body2" color="black">
                        나눔 받고싶어 채팅 드립니다.
                      </MDTypography>
                    </MDTypography>
                  </MDTypography>
                </MDAlert>
                <MDAlert color="light" dismissible>
                  <MDTypography variant="body2" color="black">
                    <MDTypography
                      component="a"
                      href="#"
                      variant="body2"
                      fontWeight="medium"
                      color="black"
                    >
                      고질라님에게 온 채팅{" "}
                      <MDTypography variant="body2" color="black">
                        안녕하세요!
                      </MDTypography>
                    </MDTypography>
                  </MDTypography>
                </MDAlert>
                <MDAlert color="light" dismissible>
                  <MDTypography variant="body2" color="black">
                    <MDTypography
                      component="a"
                      href="#"
                      variant="body2"
                      fontWeight="medium"
                      color="black"
                    >
                      예루살렘님에게 온 채팅{" "}
                      <MDTypography variant="body2" color="black">
                        나눔 감사합니다~~!
                      </MDTypography>
                    </MDTypography>
                  </MDTypography>
                </MDAlert>
                <MDAlert color="light" dismissible>
                  <MDTypography variant="body2" color="black">
                    <MDTypography
                      component="a"
                      href="#"
                      variant="body2"
                      fontWeight="medium"
                      color="black"
                    >
                      초상화님에게 온 채팅{" "}
                      <MDTypography variant="body2" color="black">
                        잘 쓰겠습니다~!
                      </MDTypography>
                    </MDTypography>
                  </MDTypography>
                </MDAlert>
                {/*<MDAlert color="success" dismissible>*/}
                {/*  {alertContent("success")}*/}
                {/*</MDAlert>*/}
                {/*<MDAlert color="error" dismissible>*/}
                {/*  {alertContent("error")}*/}
                {/*</MDAlert>*/}
                {/*<MDAlert color="warning" dismissible>*/}
                {/*  {alertContent("warning")}*/}
                {/*</MDAlert>*/}
                {/*<MDAlert color="info" dismissible>*/}
                {/*  {alertContent("info")}*/}
                {/*</MDAlert>*/}
                {/*<MDAlert color="light" dismissible>*/}
                {/*  {alertContent("light")}*/}
                {/*</MDAlert>*/}
                {/*<MDAlert color="dark" dismissible>*/}
                {/*  {alertContent("dark")}*/}
                {/*</MDAlert>*/}
              </MDBox>
            </Card>
          </Grid>

          {/*<Grid item xs={12} lg={8}>*/}
          {/*  <Card>*/}
          {/*    <MDBox p={2} lineHeight={0}>*/}
          {/*      <MDTypography variant="h5">Notifications</MDTypography>*/}
          {/*      <MDTypography variant="button" color="text" fontWeight="regular">*/}
          {/*        Notifications on this page use Toasts from Bootstrap. Read more details here.*/}
          {/*      </MDTypography>*/}
          {/*    </MDBox>*/}
          {/*    <MDBox p={2}>*/}
          {/*      <Grid container spacing={3}>*/}
          {/*        <Grid item xs={12} sm={6} lg={3}>*/}
          {/*          <MDButton variant="gradient" color="success" onClick={openSuccessSB} fullWidth>*/}
          {/*            success notification*/}
          {/*          </MDButton>*/}
          {/*          {renderSuccessSB}*/}
          {/*        </Grid>*/}
          {/*        <Grid item xs={12} sm={6} lg={3}>*/}
          {/*          <MDButton variant="gradient" color="info" onClick={openInfoSB} fullWidth>*/}
          {/*            info notification*/}
          {/*          </MDButton>*/}
          {/*          {renderInfoSB}*/}
          {/*        </Grid>*/}
          {/*        <Grid item xs={12} sm={6} lg={3}>*/}
          {/*          <MDButton variant="gradient" color="warning" onClick={openWarningSB} fullWidth>*/}
          {/*            warning notification*/}
          {/*          </MDButton>*/}
          {/*          {renderWarningSB}*/}
          {/*        </Grid>*/}
          {/*        <Grid item xs={12} sm={6} lg={3}>*/}
          {/*          <MDButton variant="gradient" color="error" onClick={openErrorSB} fullWidth>*/}
          {/*            error notification*/}
          {/*          </MDButton>*/}
          {/*          {renderErrorSB}*/}
          {/*        </Grid>*/}
          {/*      </Grid>*/}
          {/*    </MDBox>*/}
          {/*  </Card>*/}
          {/*</Grid>*/}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
