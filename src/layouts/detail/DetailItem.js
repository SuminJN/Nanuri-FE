import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
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
import MDSnackbar from "../../components/MDSnackbar";
import { getItem } from "../../apis/itemApi";
import { applyItem } from "../../apis/historyApi";
import { addWish, deleteWish } from "../../apis/wishApi";

function DetailItem() {
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
    wishStatus: false,
    images: [],
    isOwner: null,
  });
  const [isWish, setIsWish] = useState(false);

  const [successSB, setSuccessSB] = useState(false);
  const closeSuccessSB = () => setSuccessSB(false);
  const renderSuccessSB = (
    <MDSnackbar
      color="info"
      icon="check"
      title="관심 목록에 추가되었습니다."
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const [deleteSB, setDeleteSB] = useState(false);
  const closeDeleteSB = () => setDeleteSB(false);
  const renderDeleteSB = (
    <MDSnackbar
      color="error"
      icon="check"
      title="관심 목록에서 삭제되었습니다."
      open={deleteSB}
      onClose={closeDeleteSB}
      close={closeDeleteSB}
      bgWhite
    />
  );

  const handleItemApply = () => {
    applyItem(itemId)
      .then((response) => {
        alert("신청이 완료되었습니다.");
        navigate("/chat");
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert(error.response.data.errors[0]);
        }
      });
  };

  const handleAddWish = () => {
    addWish(itemId).then((r) => {
      item.wishCount++;
      setIsWish(true);
      setSuccessSB(true);
    });
  };

  const handleDeleteWish = () => {
    deleteWish(itemId).then((r) => {
      item.wishCount--;
      setIsWish(false);
      setDeleteSB(true);
    });
  };

  useEffect(() => {
    getItem(itemId).then((response) => {
      if (response.status === 200) {
        setItem(response.data);
        setIsWish(response.data.wishStatus);
      }
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={10} lg={8}>
          <MDBox mb={3} borderRadius="lg" sx={{ borderColor: "grey.300" }} border={2} shadow="md">
            <MDBox px={2} pt={3}>
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
            <Grid container spacing={5} sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
              <Grid item xs={12} sm={12} md={6}>
                <MDBox>
                  <Carousel arrows infinite={true}>
                    {item &&
                      item.images.map((image, index) => (
                        <div key={index}>
                          <Image
                            src={image}
                            alt="image"
                            width="100%"
                            height="100%"
                            style={{
                              aspectRatio: "1 / 1",
                              borderRadius: "8px",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                              objectFit: "fill",
                            }}
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
                  <MDBox mb={0}>
                    <MDTypography variant="h4" color="info">
                      {item.title}
                    </MDTypography>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" opacity="60%">
                      {item.category} · {item.createdTime}
                    </MDTypography>
                  </MDBox>
                  <MDBox mb={5}>
                    <MDTypography variant="h6">{item.description}</MDTypography>
                  </MDBox>
                  <MDBox>
                    <MDTypography variant="h6" color="text" fontWeight="bold">
                      신청 0 · 관심 {item.wishCount ? item.wishCount : 0} · 조회 {item.viewCount}
                    </MDTypography>
                  </MDBox>
                  {item.isOwner ? (
                    <MDBox>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <MDBox>
                            <MDButton
                              variant="gradient"
                              color="info"
                              fullWidth
                              startIcon={<Icon>mode_edit_icon</Icon>}
                              onClick={() => navigate(`/home/edit-item/${item.id}`)}
                            >
                              <MDTypography variant="h6" color="white">
                                나눔정보 수정
                              </MDTypography>
                            </MDButton>
                          </MDBox>
                        </Grid>
                      </Grid>
                    </MDBox>
                  ) : (
                    <MDBox mx={1}>
                      <Grid container spacing={3}>
                        <Grid
                          item
                          xs={1}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ cursor: "pointer" }}
                        >
                          {isWish ? (
                            <MDBox onClick={handleDeleteWish}>
                              <Icon fontSize="medium" color="error">
                                favorite_icon
                              </Icon>
                              <MDTypography lineHeight={0} textAlign="center">
                                {item.wishCount}
                              </MDTypography>
                            </MDBox>
                          ) : (
                            <MDBox onClick={handleAddWish}>
                              <Icon fontSize="medium" color="dark">
                                favorite_border_icon
                              </Icon>
                              <MDTypography lineHeight={0} textAlign="center">
                                {item.wishCount}
                              </MDTypography>
                            </MDBox>
                          )}
                        </Grid>
                        <Grid item xs={11}>
                          <MDBox>
                            <MDButton
                              variant="gradient"
                              color="secondary"
                              fullWidth
                              onClick={handleItemApply}
                            >
                              <MDTypography variant="h6" color="white">
                                채팅하기
                              </MDTypography>
                            </MDButton>
                          </MDBox>
                        </Grid>
                      </Grid>
                    </MDBox>
                  )}
                  {renderSuccessSB}
                  {renderDeleteSB}
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default DetailItem;
