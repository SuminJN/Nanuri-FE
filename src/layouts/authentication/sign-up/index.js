import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/hgu.png";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { LoginState } from "../../../recoil/LoginState";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { NicknameState } from "../../../recoil/NicknameState";
import { checkNickname, getUserInfo } from "../../../apis/userApi";
import { register } from "../../../apis/authApi";
import { FormControl, InputLabel, OutlinedInput, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { categoryList } from "../../../assets/category/categoryList";
import { MBTIList } from "../../../assets/mbti/mbtiList";
import { useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

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
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    uniqueId: null,
    userInfo: null,
    name: null,
    department: null,
  });

  const [additionalInfo, setAdditionalInfo] = useState(initialUserInfo);

  const [nicknameCheckResult, setNicknameCheckResult] = useState(null);

  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setAdditionalInfo((prev) => ({
      ...prev,
      [name]: name === "interestItemCategory" ? [...value] : value,
    }));

    if (name === "nickname") {
      setNicknameCheckResult(null); // 닉네임 바뀌면 체크 결과 초기화
    }
  };

  // 폼 제출 함수
  const onSubmit = (event) => {
    event.preventDefault();

    if (nicknameCheckResult !== "valid") {
      alert("닉네임 중복 확인을 완료해주세요.");
      return;
    }

    register(additionalInfo).then((response) => {
      setIsLoggedIn(true);
      setNicknameState(additionalInfo.nickname);
      navigate("/home", { replace: true });
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
    <MDBox mb={5}>
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
              <MDBox pt={4} px={3} mx={5}>
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
                <MDBox display="flex" alignItems="center">
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
                    sx={{ flex: 1, marginRight: "8px" }}
                  />
                  <Tooltip title="닉네임 중복 확인" placement="top">
                    <Icon
                      sx={{
                        cursor: "pointer",
                        color:
                          nicknameCheckResult === "valid"
                            ? "success.main"
                            : nicknameCheckResult === "duplicate"
                            ? "error.main"
                            : "action.disabled",
                      }}
                      onClick={async () => {
                        try {
                          if (!additionalInfo.nickname.trim()) {
                            alert("닉네임을 입력해주세요.");
                            return;
                          }

                          const isDuplicate = await checkNickname(additionalInfo.nickname);

                          if (isDuplicate.data) {
                            setNicknameCheckResult("duplicate");
                            alert("이미 사용 중인 닉네임입니다.");
                          } else {
                            setNicknameCheckResult("valid");
                            alert("사용 가능한 닉네임입니다.");
                          }
                        } catch (error) {
                          alert("닉네임 중복 확인 중 오류가 발생했습니다.");
                          console.error(error);
                        }
                      }}
                    >
                      {nicknameCheckResult === "valid"
                        ? "check_circle"
                        : nicknameCheckResult === "duplicate"
                        ? "cancel"
                        : "check_circle_outline"}
                    </Icon>
                  </Tooltip>
                </MDBox>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDBox pt={4} px={3} mx={5}>
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
                    <MDTypography variant="h6" fontWeight="bold" color="info">
                      관심 목록
                    </MDTypography>
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
          <MDBox mt={4} mb={1} p={3}>
            <MDButton variant="gradient" color="info" fullWidth onClick={onSubmit}>
              회원가입
            </MDButton>
          </MDBox>
        </Card>
      </CoverLayout>
    </MDBox>
  );
}

export default Cover;
