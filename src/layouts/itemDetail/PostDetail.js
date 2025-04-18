import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/axios";
import { useNavigate, useParams } from "react-router-dom";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import IconButton from "@mui/material/IconButton";
import { navbarIconButton } from "../../examples/Navbars/DashboardNavbar/styles";
import Icon from "@mui/material/Icon";

function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    id: "",
    receiverNickName: "",
    title: "",
    description: "",
    createdAt: "",
    isOwner: null,
  });

  const handlePostDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const response = await axiosInstance.delete(`/api/want/${postId}`);
        console.log("받아요 글 삭제 성공: ", response);
        alert("글이 삭제되었습니다.");
        navigate("/home");
      } catch (e) {
        console.log("받아요 글 삭제 실패: ", e);
      }
    }
  };

  const handlePostApply = () => {
    axiosInstance.post(`/api/wand/${postId}/select`).then((r) => {
      alert("신청되었습니다.");
      window.location.reload();
    });
  };

  useEffect(() => {
    console.log(postId);
    axiosInstance.get(`/api/want/${postId}`).then((res) => {
      setPost(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={2} mb={3}>
        <Grid container spacing={3} mb={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card>
              <MDBox p={2}>
                <IconButton
                  size="small"
                  disableRipple
                  sx={navbarIconButton}
                  variant="contained"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  <Icon>arrow_back_ios_icon</Icon>
                </IconButton>
              </MDBox>
              <MDBox p={4}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <MDBox mb={2}>
                      <MDTypography variant="h4" color="info">
                        {post.title}
                      </MDTypography>
                    </MDBox>
                    <MDBox mb={8}>
                      <MDTypography variant="h6" opacity="60%">
                        {post.createdTime}
                      </MDTypography>
                    </MDBox>
                    <MDBox mb={2} height="200px">
                      <MDTypography variant="h6">{post.description}</MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid container display="flex" justifyContent="end">
                    <Grid item xs={12}>
                      <MDBox>
                        <MDTypography variant="overline">신청 0 · 조회 0</MDTypography>
                      </MDBox>
                      {post.isOwner ? (
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={6}>
                            <MDBox>
                              <MDButton
                                variant="outlined"
                                color="info"
                                fullWidth
                                onClick={() => navigate(`/home/edit-post/${post.id}`)}
                              >
                                <MDTypography variant="h6" color="info">
                                  수정하기
                                </MDTypography>
                              </MDButton>
                            </MDBox>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <MDBox>
                              <MDButton
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                onClick={handlePostDelete}
                              >
                                <MDTypography variant="h6" color="error">
                                  삭제하기
                                </MDTypography>
                              </MDButton>
                            </MDBox>
                          </Grid>
                        </Grid>
                      ) : (
                        <MDBox mb={1}>
                          <MDButton
                            variant="outlined"
                            color="info"
                            fullWidth
                            onClick={handlePostApply}
                          >
                            <MDTypography variant="h6" color="info">
                              채팅하기
                            </MDTypography>
                          </MDButton>
                        </MDBox>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default PostDetail;
