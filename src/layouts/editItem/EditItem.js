import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../apis/axios";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import { navbarIconButton } from "../../examples/Navbars/DashboardNavbar/styles";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import { Carousel, Image } from "antd";
import MDAvatar from "../../components/MDAvatar";
import image from "../../assets/images/team-2.jpg";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import TextField from "@mui/material/TextField";
import { deleteItem, editItem } from "../../apis/itemApi";

const initState = {
  id: 0,
  nickname: "",
  title: "",
  description: "",
  viewCount: 0,
  category: "",
  shareStatus: "",
  createTime: "",
  wishCount: 0,
  images: [],
  isOwner: null,
};

const EditItem = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [item, setItem] = useState({ ...initState });

  const getItem = async () => {
    getItem().then((response) => {
      if (response.status === 200) {
        setItem(response.data);
      }
    });
  };

  const handleChangeItem = (e) => {
    item[e.target.name] = e.target.value;
    setItem({ ...item });
  };

  const handleClickEdit = async () => {
    editItem(itemId, item).then((response) => {
      if (response.status === 200) {
        alert("수정되었습니다.");
        navigate(`/home/${itemId}`);
      }
    });
  };

  const handleItemDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteItem(itemId).then((response) => {
        if (response.status === 200) {
          alert("삭제되었습니다.");
          navigate("/home");
        }
      });
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={10} lg={8}>
          <MDBox my={3} borderRadius="lg" sx={{ borderColor: "grey.300" }} border={2} shadow="md">
            <Grid container spacing={2} sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
              <Grid item xs={12} sm={12} md={6}>
                <MDBox>
                  <Carousel arrows infinite={false}>
                    {item &&
                      item.images.map((image, index) => (
                        <div key={index}>
                          <img
                            src={image}
                            alt="image"
                            width="100%"
                            height="100%"
                            style={{
                              aspectRatio: "1 / 1",
                              borderRadius: "8px",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      ))}
                  </Carousel>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" fontWeight="bold" color="info">
                      제목
                    </MDTypography>
                    <TextField
                      name="title"
                      value={item.title}
                      onChange={handleChangeItem}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" fontWeight="bold" color="info">
                      카테고리
                    </MDTypography>
                    <TextField
                      name="category"
                      value={item.category}
                      onChange={handleChangeItem}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" fontWeight="bold" color="info">
                      자세한 설명
                    </MDTypography>
                    <TextField
                      name="description"
                      value={item.description}
                      onChange={handleChangeItem}
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
                            startIcon={<Icon>mode_edit_icon</Icon>}
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
                            startIcon={<Icon>delete_icon</Icon>}
                            onClick={handleItemDelete}
                          >
                            <MDTypography variant="h6" color="error">
                              나눔 삭제
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
                            startIcon={<Icon>close_icon</Icon>}
                            onClick={() => navigate(`/home/${item.id}`)}
                          >
                            <MDTypography variant="h6" color="secondary">
                              취소
                            </MDTypography>
                          </MDButton>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </MDBox>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default EditItem;
