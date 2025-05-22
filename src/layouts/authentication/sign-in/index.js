import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/hgu.png";
import { useNavigate } from "react-router-dom";

function Basic() {
  const navigate = useNavigate();
  const handleSignInClick = () => {
    window.location.href = process.env.REACT_APP_HISNET_LOGIN_URL;
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white">
            Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={1}>
              <MDBox mb={2}>
                <MDButton variant="outlined" color="info" fullWidth onClick={handleSignInClick}>
                  히즈넷 로그인
                </MDButton>
              </MDBox>
              <MDBox>
                <MDButton
                  variant="outlined"
                  color="dark"
                  fullWidth
                  onClick={() => navigate("/home")}
                >
                  홈으로 이동
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
