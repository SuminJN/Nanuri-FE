import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import React, { useEffect, useRef, useState } from "react";
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
import { deleteItem, editItem, getItem, uploadImages } from "../../apis/itemApi";
import { categoryList } from "../../assets/category/categoryList";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, Select } from "@mui/material";

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
  deadline: "",
};

const EditItem = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [item, setItem] = useState({ ...initState });
  const uploadRef = useRef();

  const handleChangeItem = (e) => {
    item[e.target.name] = e.target.value;
    setItem({ ...item });
  };

  const deleteOldImages = (imageName) => {
    if (item.images.length === 1) {
      alert("이미지는 최소 한 장 이상 있어야 합니다.");
      return;
    }

    const resultFileNames = item.images.filter((fileName) => fileName !== imageName);

    item.images = resultFileNames;

    setItem({ ...item });
  };

  const handleClickEdit = async () => {
    const files = uploadRef.current.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    editItem(itemId, item).then((response) => {
      if (response.status === 200) {
        uploadImages(itemId, formData).then((res) => console.log(res));

        alert("수정되었습니다.");
        navigate(-1, { replace: true });
      } else {
        alert("등록 오류가 발생했습니다. 다시 시도해주세요.");
        window.location.reload();
      }
    });
  };

  const handleItemDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteItem(itemId).then((response) => {
        if (response.status === 200) {
          alert("삭제되었습니다.");
          navigate("/home", { replace: true });
        }
      });
    }
  };

  useEffect(() => {
    getItem(itemId).then((response) => {
      setItem({
        ...response.data,
        category:
          categoryList.find((cat) => cat.koreanName === response.data.category)?.englishName || "",
      });
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={10}>
          <MDBox
            my={3}
            borderRadius="lg"
            sx={{ borderColor: "grey.300", height: "100%" }}
            border={2}
            shadow="md"
          >
            <MDBox display="flex" justifyContent="center" alignItems="center" p={2}>
              <MDTypography variant="h3" mt={2}>
                나눔 글 수정하기
              </MDTypography>
            </MDBox>
            <Grid container spacing={2} sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
              <Grid item xs={12} sm={12} md={6}>
                <MDBox>
                  <MDTypography variant="h6" color="error" fontWeight="bold">
                    ⚠️ 이미지는 최소 한 장 이상 있어야 합니다!
                  </MDTypography>
                </MDBox>
                <MDBox>
                  <Carousel arrows infinite={true}>
                    {item &&
                      item.images.map((image, index) => (
                        <div key={index} style={{ position: "relative" }}>
                          <MDBox
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                              backgroundColor: "#ee5855",
                              cursor: "pointer",
                              borderRadius: "8px 8px 0 0", // 위쪽에 라운드 추가
                              padding: "8px", // 두께 추가
                            }}
                            onClick={() => deleteOldImages(image)}
                          >
                            <Icon fontSize="medium">close</Icon>
                          </MDBox>
                          <img
                            src={image}
                            alt="image"
                            width="100%"
                            height="100%"
                            style={{
                              aspectRatio: "1 / 1",
                              borderRadius: "0 0 8px 8px",
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
                  <MDBox display="flex" justifyContent="flex-end">
                    <input
                      accept="image/*"
                      id="upload-button"
                      multiple
                      type="file"
                      style={{ display: "none" }}
                      ref={uploadRef}
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        const newImages = files.map((file) => URL.createObjectURL(file));
                        setItem({ ...item, images: [...item.images, ...newImages] });
                      }}
                    />
                    <label htmlFor="upload-button">
                      <MDButton variant="outlined" color="info" component="span" fullWidth>
                        이미지 추가
                      </MDButton>
                    </label>
                  </MDBox>
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
                    <FormControl fullWidth variant="outlined">
                      <MDTypography variant="h6" fontWeight="bold" color="info">
                        카테고리
                      </MDTypography>
                      <Select
                        sx={{ height: "45px" }}
                        name="category"
                        value={item.category}
                        onChange={handleChangeItem}
                      >
                        {categoryList.map((category) => (
                          <MenuItem key={category.englishName} value={category.englishName}>
                            {category.koreanName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" fontWeight="bold" color="info">
                      나눔 마감 기한
                    </MDTypography>
                    <TextField
                      name="deadline"
                      type="datetime-local"
                      fullWidth
                      required
                      value={item.deadline}
                      onChange={handleChangeItem}
                      min={new Date().toISOString().slice(0, 16)}
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
                      <Grid item xs={8}>
                        <MDBox>
                          <MDButton
                            variant="gradient"
                            color="secondary"
                            fullWidth
                            startIcon={<Icon>close_icon</Icon>}
                            onClick={() => navigate(-1)}
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
                            onClick={handleItemDelete}
                          >
                            <MDTypography variant="h6" color="white" sx={{ whiteSpace: "nowrap" }}>
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
