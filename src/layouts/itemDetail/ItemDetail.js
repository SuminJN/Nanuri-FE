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
import { Carousel, Image } from "antd";
import IconButton from "@mui/material/IconButton";
import { navbarIconButton } from "../../examples/Navbars/DashboardNavbar/styles";
import Icon from "@mui/material/Icon";
import useGetTime from "../../hooks/useGetTime";
import MDAvatar from "../../components/MDAvatar";
import image from "../../assets/images/team-2.jpg";

function ItemDetail() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { getCurrentTime } = useGetTime();
  const [item, setItem] = useState({
    id: "",
    title: "",
    nickname: "",
    description: "",
    viewCount: 0,
    category: "",
    createdAt: "",
    wishCount: 0,
    images: [],
    isOwner: null,
  });

  const handleItemDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const response = await axiosInstance.delete(`/api/item/${itemId}`);
        console.log("아이템 삭제 성공: ", response);
        alert("물건이 삭제되었습니다.");
        navigate("/items");
      } catch (e) {
        console.log("아이템 삭제 실패: ", e);
      }
    }
  };

  const handleItemApply = () => {
    axiosInstance.post("/api/history", { itemId: itemId }).then((r) => {
      alert("신청되었습니다.");
      window.location.reload();
    });
  };

  const handleAddWish = () => {
    axiosInstance.post("/api/wish", { itemId: itemId }).then((r) => {
      alert("위시 리시트에 등록되었습니다.");
    });
  };

  useEffect(() => {
    console.log(itemId);
    axiosInstance.get(`/api/item/${itemId}`).then((res) => {
      setItem(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={2} mb={3}>
        <Card>
          <MDBox px={2} pt={3}>
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
          <Grid container spacing={2} sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
            <Grid item xs={12} sm={12} md={6}>
              <MDBox>
                <Carousel arrows infinite={false}>
                  {item &&
                    item.images.map((image, index) => (
                      <div key={index}>
                        <Image
                          src={image}
                          alt="image"
                          width="100%"
                          height="400px"
                          style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                        />
                      </div>
                    ))}
                </Carousel>
              </MDBox>
              <MDBox mb={3} display="flex" alignItems="center">
                <MDBox p={1}>
                  <MDAvatar src={image} alt="something here" shadow="md" size="md" />
                </MDBox>
                <MDTypography variant="h6" opacity="60%">
                  {item.nickname}
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <MDBox>
                <MDBox mb={1}>
                  <MDTypography variant="h4" color="info">
                    {item.title}
                  </MDTypography>
                </MDBox>
                <MDBox mb={5}>
                  <MDTypography variant="h6" opacity="60%">
                    {item.category} · {item.createdTime}
                  </MDTypography>
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="h6">{item.description}</MDTypography>
                </MDBox>
                <MDBox>
                  <MDTypography variant="overline">
                    신청 0 · 관심 {item.wishCount ? item.wishCount : 0} · 조회 {item.viewCount}
                  </MDTypography>
                </MDBox>
                <MDBox>
                  {item.isOwner ? (
                    <>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <MDBox>
                            <MDButton
                              variant="outlined"
                              color="info"
                              fullWidth
                              onClick={() => navigate(`/home/${item.id}/edit`)}
                            >
                              <MDTypography variant="h6" color="info">
                                나눔정보 수정
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
                              onClick={handleItemDelete}
                            >
                              <MDTypography variant="h6" color="error">
                                나눔 삭제
                              </MDTypography>
                            </MDButton>
                          </MDBox>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <MDBox>
                            <MDButton
                              variant="outlined"
                              color="info"
                              fullWidth
                              onClick={handleItemApply}
                            >
                              <MDTypography variant="h6" color="info">
                                채팅하기
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
                              onClick={handleAddWish}
                            >
                              <MDTypography variant="h6" color="secondary">
                                위시리스트 추가
                              </MDTypography>
                            </MDButton>
                          </MDBox>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default ItemDetail;
