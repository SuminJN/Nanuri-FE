import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import axiosInstance from "../../../apis/axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { LoginState } from "../../../recoil/LoginState";
import TextField from "@mui/material/TextField";

function Cover() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [userInfo, setUserInfo] = useState({
    userInfo: null,
    name: null,
    department: null,
  });
  const [nickname, setNickname] = useState(null);

  // 폼 제출 함수
  const onSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post("/api/nanuri/auth/signup", {
        uniqueId: userInfo.uniqueId,
        nickname: nickname,
      })
      .then((res) => {
        setIsLoggedIn(true);
        window.location.href = "/";
      });
  };

  useEffect(() => {
    axiosInstance.get("/api/user").then((res) => {
      setUserInfo(res.data);
    });
  }, []);

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign Up
          </MDTypography>
          <MDTypography display="block" variant="h6" color="white" my={1}>
            서비스를 이용하기 위해서는 가입이 필요합니다.
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3} mx={5}>
          <MDBox mb={2}>
            <MDTypography variant="h6" gutterBottom>
              학번
            </MDTypography>
            <MDTypography variant="subtitle2" gutterBottom fontWeight="regular">
              {userInfo.uniqueId}
            </MDTypography>
          </MDBox>
          <MDBox mb={2}>
            <MDTypography variant="h6" gutterBottom>
              이름
            </MDTypography>
            <MDTypography variant="subtitle2" gutterBottom fontWeight="regular">
              {userInfo.name}
            </MDTypography>
          </MDBox>
          <MDBox mb={2}>
            <MDTypography variant="h6" gutterBottom>
              학부
            </MDTypography>
            <MDTypography variant="subtitle2" gutterBottom fontWeight="regular">
              {userInfo.department}
            </MDTypography>
          </MDBox>
          <MDBox component="form" role="form">
            <MDBox mt={3} mb={1}>
              <TextField
                id="nickname"
                label="닉네임"
                variant="outlined"
                fullWidth
                required
                value={nickname}
                onChange={(event) => {
                  setNickname(event.target.value);
                }}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={onSubmit}>
                회원가입
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
