import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../apis/axios";
import MDBox from "../../components/MDBox";
import IconButton from "@mui/material/IconButton";
import { navbarIconButton } from "../../examples/Navbars/DashboardNavbar/styles";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDTypography from "../../components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "../../components/MDButton";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

const initState = {
  id: "",
  receiverNickName: "",
  title: "",
  description: "",
  createdAt: "",
  isOwner: null,
};

const EditPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState({ ...initState });

  const getPost = async () => {
    const response = await axiosInstance.get(`/api/want/${postId}`);
    console.log(response.data);
    setPost(response.data);
  };

  const handleChangePost = (e) => {
    post[e.target.name] = e.target.value;
    setPost({ ...post });
  };

  const handleClickEdit = async () => {
    const response = await axiosInstance.patch(`/api/want/${postId}`, post);
    navigate(`/home/post/${postId}`);
  };

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

  useEffect(() => {
    getPost();
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
                    navigate(-1);
                  }}
                >
                  <Icon>arrow_back_ios_icon</Icon>
                </IconButton>
              </MDBox>
              <MDBox p={4}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <MDBox mb={2}>
                      <MDTypography variant="h6" fontWeight="bold">
                        제목
                      </MDTypography>
                      <TextField
                        name="title"
                        value={post.title}
                        onChange={handleChangePost}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDTypography variant="h6">자세한 설명</MDTypography>
                      <TextField
                        name="description"
                        value={post.description}
                        onChange={handleChangePost}
                        multiline
                        rows={6}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <MDBox>
                            <MDButton
                              variant="outlined"
                              color="info"
                              fullWidth
                              onClick={handleClickEdit}
                            >
                              <MDTypography variant="h6" color="info">
                                수정완료
                              </MDTypography>
                            </MDButton>
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <MDBox>
                            <MDButton
                              variant="outlined"
                              color="error"
                              fullWidth
                              onClick={handlePostDelete}
                            >
                              <MDTypography variant="h6" color="error">
                                삭제하기
                              </MDTypography>
                            </MDButton>
                          </MDBox>
                        </Grid>
                        <Grid item xs={12}>
                          <MDBox>
                            <MDButton
                              variant="outlined"
                              color="secondary"
                              fullWidth
                              onClick={() => navigate(`/home/post/${post.id}`)}
                            >
                              <MDTypography variant="h6" color="secondary">
                                취소
                              </MDTypography>
                            </MDButton>
                          </MDBox>
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default EditPost;
