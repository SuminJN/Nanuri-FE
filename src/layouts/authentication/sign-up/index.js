import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { LoginState } from "../../../recoil/LoginState";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { NicknameState } from "../../../recoil/NicknameState";
import { getUserInfo } from "../../../apis/userApi";
import { register } from "../../../apis/authApi";
import {
  FormControl,
  FormLabel,
  InputLabel,
  OutlinedInput,
  RadioGroup,
  Select,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { categoryList } from "../../../assets/category/categoryList";
import { MBTIList } from "../../../assets/mbti/mbtiList";

const initialUserInfo = {
  uniqueId: "",
  nickname: "",
  mbti: "",
  interestItemCategory: [],
  introduction: "",
};

function Cover() {
  const [nicknameState, setNicknameState] = useRecoilState(NicknameState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [userInfo, setUserInfo] = useState({
    uniqueId: null,
    userInfo: null,
    name: null,
    department: null,
  });

  const [additionalInfo, setAdditionalInfo] = useState(initialUserInfo);

  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setAdditionalInfo((prev) => ({
      ...prev,
      [name]: name === "interestItemCategory" ? [...value] : value,
    }));
  };

  // 폼 제출 함수
  const onSubmit = (event) => {
    event.preventDefault();

    register(additionalInfo).then((response) => {
      setIsLoggedIn(true);
      setNicknameState(additionalInfo.nickname);
      window.location.href = "/";
    });
  };

  useEffect(() => {
    getUserInfo().then((response) => {
      if (response.status === 200) {
        setUserInfo(response.data);
        setAdditionalInfo((prev) => ({
          ...prev,
          uniqueId: response.data.uniqueId,
        }));
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
                  name="nickname"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                  value={additionalInfo.nickname}
                  onChange={handleChangeInfo}
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
                  name="introduction"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={5}
                  value={additionalInfo.introduction}
                  onChange={handleChangeInfo}
                />
              </MDBox>
              <MDBox mb={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>MBTI</InputLabel>
                  <Select
                    defaultValue=""
                    sx={{ height: "45px" }}
                    name="mbti"
                    fullWidth
                    value={additionalInfo.mbti}
                    onChange={handleChangeInfo}
                  >
                    {MBTIList.map((mbti, index) => (
                      <MenuItem key={index} value={mbti.value}>
                        {mbti.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>관심 목록</InputLabel>
                  <Select
                    multiple
                    sx={{ height: "45px" }}
                    input={<OutlinedInput label="Name" />}
                    name="interestItemCategory"
                    value={additionalInfo.interestItemCategory}
                    onChange={handleChangeInfo}
                  >
                    {categoryList.map((category) => (
                      <MenuItem key={category.englishName} value={category.englishName}>
                        {category.koreanName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
