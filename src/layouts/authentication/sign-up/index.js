import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import axiosInstance from "../../../apis/axios";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { LoginState } from "../../../recoil/LoginState";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import SelectInput from "@mui/material/Select/SelectInput";
import { NicknameState } from "../../../recoil/NicknameState";
import { getUserInfo } from "../../../apis/userApi";

function Cover() {
  const [nicknameState, setNicknameState] = useRecoilState(NicknameState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [userInfo, setUserInfo] = useState({
    userInfo: null,
    name: null,
    department: null,
  });
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [mbti, setMbti] = useState("");
  const [hobby, setHobby] = useState("");
  const [tag, setTag] = useState("");

  // 폼 제출 함수
  const onSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post("/api/nanuri/auth/signup", {
        uniqueId: userInfo.uniqueId,
        nickname: nickname,
        introduction: introduction,
        mbti: mbti,
        hobby: hobby,
        tag: tag,
      })
      .then((res) => {
        setIsLoggedIn(true);
        setNicknameState(nickname);
        window.location.href = "/";
      });
  };

  useEffect(() => {
    getUserInfo().then((response) => {
      if (response.status === 200) {
        setUserInfo(response.data);
      }
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

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
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
              <MDBox mt={3} mb={1}>
                <TextField
                  id="nickname"
                  label="닉네임"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                  value={nickname}
                  onChange={(event) => {
                    setNickname(event.target.value);
                  }}
                />
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={0} sm={0.1}>
            <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid>
          <Grid item xs={12} sm={5.6}>
            <MDBox pt={3} px={6} textAlign="center">
              <MDTypography variant="h6" gutterBottom>
                자신을 소개해 보세요!
              </MDTypography>
              <MDBox mt={4} mb={3}>
                <TextField
                  id="introduction"
                  label="소개말"
                  variant="outlined"
                  fullWidth
                  value={introduction}
                  onChange={(event) => {
                    setIntroduction(event.target.value);
                  }}
                />
              </MDBox>
              <MDBox mb={3}>
                <TextField
                  id="mbti"
                  label="MBTI"
                  variant="outlined"
                  fullWidth
                  value={mbti}
                  onChange={(event) => {
                    setMbti(event.target.value);
                  }}
                />
              </MDBox>
              <MDBox mb={3}>
                <TextField
                  id="hobby"
                  label="취미"
                  variant="outlined"
                  fullWidth
                  value={hobby}
                  onChange={(event) => {
                    setHobby(event.target.value);
                  }}
                />
              </MDBox>
              <MDBox mb={3}>
                <TextField
                  id="tag"
                  label="관심 태그"
                  variant="outlined"
                  fullWidth
                  value={tag}
                  onChange={(event) => {
                    setTag(event.target.value);
                  }}
                />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" color="info" fullWidth onClick={onSubmit}>
            회원가입
          </MDButton>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
