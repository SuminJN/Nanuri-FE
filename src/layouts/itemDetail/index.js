import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/axios";
import { useNavigate, useParams } from "react-router-dom";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import { Image } from "antd";

function ItemDetail() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    id: "",
    title: "",
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
      <MDBox>
        <Grid container spacing={2} justifyContent="center">
          {item &&
            item.images.map((image, index) => (
              <Grid item key={index} xs={12} sm={4}>
                <Image
                  src={image}
                  alt="image"
                  loading="lazy"
                  width="100%"
                  height="300px"
                  style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                />
              </Grid>
            ))}
        </Grid>
      </MDBox>
      <MDBox mt={2} mb={3}>
        <Grid container spacing={3} mb={2} justifyContent="center">
          <Grid item xs={12}>
            <Card>
              <MDBox p={4}>
                <MDBox p={3}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={7}>
                      <MDBox mb={2}>
                        <MDTypography variant="h4" color="info">
                          {item.title}
                        </MDTypography>
                      </MDBox>
                      <MDBox mb={8}>
                        <MDTypography variant="h6" opacity="60%">
                          {item.category} · {item.createdTime}
                        </MDTypography>
                      </MDBox>
                      <MDBox mb={2}>
                        <MDTypography variant="h6">{item.description}</MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid sm={2}></Grid>
                    <Grid
                      item
                      xs={12}
                      sm={3}
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                    >
                      <MDBox>
                        <MDTypography variant="overline">
                          신청 0 · 관심 {item.wishCount ? item.wishCount : 0} · 조회{" "}
                          {item.viewCount}
                        </MDTypography>
                      </MDBox>
                      {item.isOwner ? (
                        <>
                          <MDBox mb={1}>
                            <MDButton
                              variant="outlined"
                              color="info"
                              fullWidth
                              onClick={() => navigate(`/updateItem/${item.id}`)}
                            >
                              <MDTypography variant="h6" color="info">
                                나눔정보 수정
                              </MDTypography>
                            </MDButton>
                          </MDBox>
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
                        </>
                      ) : (
                        <>
                          <MDBox mb={1}>
                            <MDButton
                              variant="outlined"
                              color="info"
                              fullWidth
                              onClick={handleItemApply}
                            >
                              <MDTypography variant="h6" color="info">
                                나눔받기 신청
                              </MDTypography>
                            </MDButton>
                          </MDBox>
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
                        </>
                      )}
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ItemDetail;
