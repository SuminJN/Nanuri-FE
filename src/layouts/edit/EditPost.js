import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MDBox from "../../components/MDBox";
import IconButton from "@mui/material/IconButton";
import { navbarIconButton } from "../../examples/Navbars/DashboardNavbar/styles";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDTypography from "../../components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "../../components/MDButton";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import { deleteWant, editWant, getWant } from "../../apis/wantApi";

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
    getWant(postId).then((response) => {
      if (response.status === 200) {
        setPost(response.data);
      } else {
        alert("글을 불러오는 데 실패했습니다.");
        navigate("/home");
      }
    });
  };

  const handleChangePost = (e) => {
    post[e.target.name] = e.target.value;
    setPost({ ...post });
  };

  const handleClickEdit = async () => {
    editWant(postId, post).then((response) => {
      if (response.status === 200) {
        alert("글이 수정되었습니다.");
        navigate(`/home/post/${postId}`);
      } else {
        alert("수정 오류가 발생했습니다. 다시 시도해주세요.");
        window.location.reload();
      }
    });
  };

  const handlePostDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteWant(postId).then((response) => {
        if (response.status === 200) {
          alert("글이 삭제되었습니다.");
          navigate("/home");
        } else {
          alert("삭제 오류가 발생했습니다. 다시 시도해주세요.");
          window.location.reload();
        }
      });
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
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <MDBox borderRadius="lg" sx={{ borderColor: "grey.300" }} border={2} shadow="md">
              <MDBox display="flex" justifyContent="center" alignItems="center" p={2}>
                <MDTypography variant="h3">나눔 글 수정하기</MDTypography>
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
                        <Grid item xs={8}>
                          <MDBox>
                            <MDButton
                              variant="gradient"
                              color="secondary"
                              fullWidth
                              startIcon={<Icon>close_icon</Icon>}
                              onClick={() => navigate(`/home/post/${post.id}`, { replace: true })}
                            >
                              <MDTypography variant="h6" color="white">
                                취소
                              </MDTypography>
                            </MDButton>
                          </MDBox>
                        </Grid>
                        <Grid item xs={4}>
                          <MDBox>
                            <MDButton
                              variant="gradient"
                              color="error"
                              fullWidth
                              startIcon={<Icon>delete_icon</Icon>}
                              onClick={handlePostDelete}
                            >
                              <MDTypography
                                variant="h6"
                                color="white"
                                sx={{ whiteSpace: "nowrap" }}
                              >
                                삭제하기
                              </MDTypography>
                            </MDButton>
                          </MDBox>
                        </Grid>

                        <Grid item xs={12}>
                          <MDBox>
                            <MDButton
                              variant="gradient"
                              color="info"
                              fullWidth
                              startIcon={<Icon>mode_edit_icon</Icon>}
                              onClick={handleClickEdit}
                            >
                              <MDTypography variant="h6" color="white">
                                수정완료
                              </MDTypography>
                            </MDButton>
                          </MDBox>
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default EditPost;
