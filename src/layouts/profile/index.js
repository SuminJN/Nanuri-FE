import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "./ProfileInfoCard";
import Header from "layouts/profile/components/Header";
import profilesListData from "layouts/profile/data/profilesListData";
import React, { useEffect, useState } from "react";
import ShareCardList from "./components/ShareCardList";
import MDTypography from "../../components/MDTypography";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, OutlinedInput, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import { getUserInfo, updateUser } from "../../apis/userApi";
import { useNavigate } from "react-router-dom";
import ProfileChatRoomList from "./ProfileChatRoomList";
import { categoryList } from "../../assets/category/categoryList";
import { MBTIList } from "../../assets/mbti/mbtiList";
import ShareDoneCardList from "./components/ShareDoneCardList";

const initialUserInfo = {
  uniqueId: "",
  name: "",
  department: "",
  nickname: "",
  mbti: "",
  interestItemCategory: [],
};

function Overview() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initialUserInfo);
  const [userInterest, setUserInterest] = useState([]);

  const handleClickEdit = () => {
    setIsEditing(!isEditing);
    if (user.interestItemCategory.length > 0) {
      setUser((prev) => ({
        ...prev,
        interestItemCategory: userInterest.map(
          (category) =>
            categoryList.find((item) => item.koreanName === category)?.englishName || category
        ),
      }));
    }
  };

  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: name === "interestItemCategory" ? [...value] : value,
    }));
  };

  const handleSubmitEdit = () => {
    updateUser(user).then((response) => {
      if (response.status === 200) {
        alert("프로필 수정이 완료되었습니다.");
        window.location.reload();
      } else {
        alert("프로필 수정에 실패했습니다.");
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    getUserInfo().then((response) => {
      setUser(response.data);
      setUserInterest(response.data.interestItemCategory);
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox p={3}>
        <Header nickname={user.nickname} />
        <MDBox mt={2} mb={3}>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} lg={4}>
              {isEditing ? (
                <MDBox borderRadius="lg" sx={{ borderColor: "grey.300" }} border={2} shadow="md">
                  <MDBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    pt={2}
                    px={2}
                  >
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                      프로필 수정
                    </MDTypography>
                    <MDTypography
                      variant="body2"
                      color="secondary"
                      sx={{ cursor: "pointer" }}
                      onClick={handleSubmitEdit}
                    >
                      <Tooltip title="프로필 수정" placement="top">
                        <Icon>done_icon</Icon>
                      </Tooltip>
                    </MDTypography>
                  </MDBox>
                  <MDBox p={2}>
                    <MDBox mb={2}>
                      <MDTypography variant="h6" fontWeight="bold" color="info">
                        소개글
                      </MDTypography>
                      <TextField
                        name="introduction"
                        value={user.introduction}
                        onChange={handleChangeInfo}
                        multiline
                        rows={6}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDTypography variant="h6" fontWeight="bold" color="info">
                        닉네임
                      </MDTypography>
                      <TextField
                        name="nickname"
                        value={user.nickname}
                        onChange={handleChangeInfo}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <FormControl fullWidth variant="outlined">
                        <MDTypography variant="h6" fontWeight="bold" color="info">
                          MBTI
                        </MDTypography>
                        <Select
                          defaultValue=""
                          sx={{ height: "45px" }}
                          name="mbti"
                          fullWidth
                          value={user.mbti}
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
                    <MDBox mb={1}>
                      <FormControl fullWidth variant="outlined">
                        <MDTypography variant="h6" fontWeight="bold" color="info">
                          관심 목록
                        </MDTypography>
                        <Select
                          multiple
                          sx={{ height: "45px" }}
                          name="interestItemCategory"
                          value={user.interestItemCategory}
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
                </MDBox>
              ) : (
                <ProfileInfoCard
                  title="프로필 정보"
                  user={user}
                  handleClickEdit={handleClickEdit}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <ShareCardList />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <ShareDoneCardList />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Overview;
