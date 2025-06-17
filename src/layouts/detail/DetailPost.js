import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/axios";
import { useNavigate, useParams } from "react-router-dom";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import IconButton from "@mui/material/IconButton";
import { navbarIconButton } from "../../examples/Navbars/DashboardNavbar/styles";
import Icon from "@mui/material/Icon";
import { applyWant, getWant } from "../../apis/wantApi";
import MDAvatar from "../../components/MDAvatar";
import defaultProfile from "../../assets/images/default_profile.png";
import Linkify from "react-linkify";
import useGetTime from "../../hooks/useGetTime";
import { LoginToast } from "../../components/LoginToast";
import { useRecoilValue } from "recoil";
import { LoginState } from "../../recoil/LoginState";
import { Spin } from "antd";

function DetailPost() {
  const { postId } = useParams();
  const { getCurrentTime } = useGetTime();
  const navigate = useNavigate();
  const isLogin = useRecoilValue(LoginState);

  const [post, setPost] = useState({
    id: "",
    receiverNickName: "",
    title: "",
    description: "",
    createdAt: "",
    isOwner: null,
  });

  const [loading, setLoading] = useState(true);

  const options = {
    target: "_blank",
    rel: "noopener noreferrer",
  };

  const handlePostApply = () => {
    if (!isLogin) return LoginToast();
    applyWant(postId)
      .then((response) => {
        if (response.status === 200) {
          alert("신청이 완료되었습니다.");
          navigate("/chat");
        } else {
          alert("신청 오류가 발생했습니다. 다시 시도해주세요.");
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          alert(error.response.data.errors[0]);
          navigate("/chat");
        }
      });
  };

  const handleGoToUserInfo = () => {
    isLogin ? navigate(`/user/${post.receiverNickName}`) : LoginToast();
  };

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await getWant(postId);
        if (response.status === 200) {
          setPost(response.data);
        } else {
          alert("글 조회에 실패했습니다.");
          navigate("/home");
        }
      } catch (e) {
        alert("오류가 발생했습니다.");
        navigate("/home");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={2} mb={3}>
        <Grid container spacing={3} mb={2} justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <MDBox
              bgColor="white"
              borderRadius="lg"
              border={2}
              shadow="md"
              sx={{ borderColor: "grey.300" }}
            >
              <MDBox p={2}>
                <IconButton
                  size="small"
                  disableRipple
                  sx={navbarIconButton}
                  onClick={() => navigate("/home")}
                >
                  <Icon>arrow_back_ios_icon</Icon>
                </IconButton>
              </MDBox>

              {loading ? (
                <MDBox display="flex" justifyContent="center" alignItems="center" height="200px">
                  <Spin tip="로딩 중..." size="large" />
                </MDBox>
              ) : (
                <MDBox p={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <MDBox mb={2}>
                        <MDTypography variant="h4" color="info">
                          {post.title}
                        </MDTypography>
                      </MDBox>
                      <MDBox mb={2}>
                        <MDTypography variant="h6" opacity="60%">
                          {post.createdTime ? getCurrentTime(post.createdTime) : ""}
                        </MDTypography>
                      </MDBox>
                      <MDBox mb={8} display="flex" alignItems="center">
                        <MDBox pr={1}>
                          <MDAvatar src={defaultProfile} alt="프로필" shadow="md" size="sm" />
                        </MDBox>
                        <MDTypography
                          variant="h6"
                          opacity="60%"
                          sx={{ cursor: "pointer" }}
                          onClick={handleGoToUserInfo}
                        >
                          {post.receiverNickName}
                        </MDTypography>
                      </MDBox>
                      <MDBox mb={2} height="200px">
                        <MDTypography variant="h6">
                          <Linkify options={options}>{post.description}</Linkify>
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid container justifyContent="end">
                      <Grid item xs={12}>
                        <MDBox m={1} display="flex" justifyContent="end">
                          <MDTypography variant="h6" color="text" fontWeight="bold">
                            신청 0 · 조회 {post.viewCount}
                          </MDTypography>
                        </MDBox>
                        {post.isOwner ? (
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <MDBox>
                                <MDButton
                                  variant="gradient"
                                  color="info"
                                  fullWidth
                                  startIcon={<Icon>mode_edit_icon</Icon>}
                                  onClick={() => navigate(`/home/edit-post/${post.id}`)}
                                >
                                  <MDTypography variant="h6" color="white">
                                    수정하기
                                  </MDTypography>
                                </MDButton>
                              </MDBox>
                            </Grid>
                          </Grid>
                        ) : (
                          <MDBox display="flex" justifyContent="center">
                            <MDButton
                              variant="gradient"
                              color="secondary"
                              fullWidth
                              onClick={handlePostApply}
                            >
                              <MDTypography variant="h6" color="white">
                                채팅하기
                              </MDTypography>
                            </MDButton>
                          </MDBox>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </MDBox>
              )}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailPost;
