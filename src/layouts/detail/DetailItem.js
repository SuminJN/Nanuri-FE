import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import { Carousel, Image, Modal, Progress, Spin } from "antd";
import IconButton from "@mui/material/IconButton";
import { navbarIconButton } from "../../examples/Navbars/DashboardNavbar/styles";
import Icon from "@mui/material/Icon";
import useGetTime from "../../hooks/useGetTime";
import MDAvatar from "../../components/MDAvatar";
import defaultProfile from "../../assets/images/default_profile.png";
import MDSnackbar from "../../components/MDSnackbar";
import { getItem } from "../../apis/itemApi";
import { applyItem } from "../../apis/historyApi";
import { addWish, deleteWish } from "../../apis/wishApi";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import Linkify from "react-linkify";
import { LoginState } from "../../recoil/LoginState";
import { useRecoilValue } from "recoil";
import { LoginToast } from "../../components/LoginToast";
import MuiImageCarousel from "./MuiImageCarousel";

function DetailItem() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { getCurrentTime } = useGetTime();
  const isLogin = useRecoilValue(LoginState);

  const [item, setItem] = useState(null);
  const [isWish, setIsWish] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setVisible(true);
  };

  const options = {
    target: "_blank",
    rel: "noopener noreferrer",
  };

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

  const [deadlineAlert, setDeadlineAlert] = useState(false);
  const closeDeadlineAlert = () => setDeadlineAlert(false);
  const renderDeadlineAlert = (
    <MDSnackbar
      color="error"
      icon="check"
      title="나눔 기한이 지났습니다. 나눔 마감 기한을 수정해주세요."
      open={deadlineAlert}
      onClose={closeDeadlineAlert}
      close={closeDeadlineAlert}
      bgWhite
    />
  );

  const handleItemApply = () => {
    if (!isLogin) return LoginToast();

    applyItem(itemId)
      .then(() => {
        alert("신청이 완료되었습니다.");
        navigate("/chat");
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          alert("이미 신청한 게시물입니다.");
          navigate("/chat");
        }
      });
  };

  const handleAddWish = async () => {
    if (!isLogin) return LoginToast();
    await addWish(itemId);
    setIsWish(true);
    setItem((prev) => ({ ...prev, wishCount: prev.wishCount + 1 }));
    setSuccessSB(true);
  };

  const handleDeleteWish = async () => {
    await deleteWish(itemId);
    setIsWish(false);
    setItem((prev) => ({ ...prev, wishCount: prev.wishCount - 1 }));
    setDeleteSB(true);
  };

  const handleGoToUserInfo = () => {
    if (isLogin) navigate(`/user/${item.nickname}`);
    else LoginToast();
  };

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await getItem(itemId);
        if (response.status === 200) {
          setItem(response.data);
          setIsWish(response.data.wishStatus);
          if (
            response.data.isOwner &&
            response.data.deadline &&
            new Date(response.data.deadline) < new Date()
          ) {
            setDeadlineAlert(true);
          }
        }
      } catch (e) {
        alert("아이템 정보를 불러오지 못했습니다.");
        navigate("/home");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={10}>
          <MDBox
            mb={3}
            borderRadius="lg"
            sx={{ borderColor: "grey.300", height: "100%" }}
            border={2}
            shadow="md"
          >
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

            {loading ? (
              <MDBox display="flex" justifyContent="center" alignItems="center" height="200px">
                <Spin tip="로딩 중..." size="large" />
              </MDBox>
            ) : (
              <Grid container spacing={5} sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
                <Grid item xs={12} sm={12} md={6}>
                  <MDBox>
                    <MuiImageCarousel
                      images={item.images.map((image) => image.fileUrl)}
                      onImageClick={handleImageClick}
                    />

                    <Modal
                      open={visible}
                      footer={null}
                      closable={false}
                      onCancel={() => setVisible(false)}
                      centered
                      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                      bodyStyle={{
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {selectedImage && (
                        <div
                          style={{
                            width: "70vmin",
                            aspectRatio: "1 / 1",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={selectedImage}
                            alt="preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      )}
                    </Modal>
                  </MDBox>
                  <MDBox display="flex" alignItems="center" justifyContent="space-between">
                    <MDBox p={1} display="flex" alignItems="center">
                      <MDBox pr={1}>
                        <MDAvatar src={defaultProfile} alt="something here" shadow="md" size="md" />
                      </MDBox>
                      <MDTypography
                        variant="h6"
                        opacity="60%"
                        sx={{ cursor: "pointer" }}
                        onClick={handleGoToUserInfo}
                      >
                        {item.nickname}
                      </MDTypography>
                    </MDBox>
                    <Tooltip title="나눔온도">
                      <MDBox
                        sx={{ width: "20%" }}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <MDTypography lineHeight={0} color="info" variant="h6" opacity="60%">
                          38.0°C
                        </MDTypography>
                        <Progress
                          percent={38}
                          size="small"
                          showInfo={false}
                          strokeColor={{ from: "#90bd92", to: "#22dc2a" }}
                        />
                      </MDBox>
                    </Tooltip>
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
                        {item.category} · {item.createdTime ? getCurrentTime(item.createdTime) : ""}
                      </MDTypography>
                    </MDBox>
                    <MDBox mb={5}>
                      <MDTypography variant="h6">
                        <Linkify options={options}>{item.description}</Linkify>
                      </MDTypography>
                    </MDBox>
                    <MDBox m={1} display="flex" justifyContent="end">
                      <MDTypography variant="h6" color="text" fontWeight="bold">
                        채팅 0 · 관심 {item.wishCount ? item.wishCount : 0} · 조회 {item.viewCount}
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
                              {item.shareStatus === "COMPLETED" ? (
                                <MDButton variant="gradient" color="dark" fullWidth disabled>
                                  <MDTypography variant="h6" color="white">
                                    나눔 완료
                                  </MDTypography>
                                </MDButton>
                              ) : new Date(item.deadline) > new Date() || !item.deadline ? (
                                <MDButton
                                  variant="gradient"
                                  color="secondary"
                                  fullWidth
                                  startIcon={<Icon>forum_icon</Icon>}
                                  onClick={handleItemApply}
                                >
                                  <MDTypography variant="h6" color="white">
                                    채팅하기
                                  </MDTypography>
                                </MDButton>
                              ) : (
                                <MDButton variant="gradient" color="error" fullWidth disabled>
                                  <MDTypography variant="h6" color="white">
                                    마감된 나눔입니다
                                  </MDTypography>
                                </MDButton>
                              )}
                            </MDBox>
                          </Grid>
                        </Grid>
                      </MDBox>
                    )}
                    {renderSuccessSB}
                    {renderDeleteSB}
                    {renderDeadlineAlert}
                  </MDBox>
                </Grid>
              </Grid>
            )}
          </MDBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default DetailItem;
