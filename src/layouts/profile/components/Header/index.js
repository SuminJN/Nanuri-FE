import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import breakpoints from "assets/theme/base/breakpoints";
import defaultProfile from "assets/images/default_profile.png";

function Header({ nickname }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);

    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <MDBox position="relative">
      {/*<MDBox*/}
      {/*  display="flex"*/}
      {/*  alignItems="center"*/}
      {/*  position="relative"*/}
      {/*  minHeight="8rem"*/}
      {/*  borderRadius="xl"*/}
      {/*  sx={{*/}
      {/*    backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>*/}
      {/*      `${linearGradient(*/}
      {/*        rgba(gradients.info.main, 0.6),*/}
      {/*        rgba(gradients.info.state, 0.6)*/}
      {/*      )}, url(${backgroundImage})`,*/}
      {/*    backgroundSize: "cover",*/}
      {/*    backgroundPosition: "50%",*/}
      {/*    overflow: "hidden",*/}
      {/*  }}*/}
      {/*/>*/}
      <Card
        sx={{
          p: 2,
          backgroundColor: "rgba(217,236,217,0.9)", // 원하는 RGB 값에 투명도 추가
        }}
        // sx={{
        //   backdropFilter: `saturate(200%) blur(30px)`,
        //   // backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
        //   backgroundColor: "secondary.main",
        //   // boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
        //   position: "relative",
        //   // mt: -8,
        //   // mx: 3,
        //   py: 2,
        //   px: 2,
        // }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar
              src={defaultProfile}
              alt="profile-image"
              variant="rounded"
              size="xl"
              // shadow="sm"
            />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {nickname}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  nickname: PropTypes.string.isRequired,
};

export default Header;
