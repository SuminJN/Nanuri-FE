import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import MDTypography from "../../components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "../../components/MDButton";
import { Select, MenuItem, Chip } from "@mui/material";
import { Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { addItem, uploadImages } from "../../apis/itemApi";
import { categoryList } from "../../assets/category/categoryList";

function AddItem() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    category: "",
    place: "",
    description: "",
    deadline: "",
    deadlineOffsetType: "TOMORROW",
  });
  const { title, place, deadline, category, description, deadlineOffsetType } = inputs;

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const onPreview = async (file) => {
    let src = file.url;
    if (!src && file.originFileObj) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setPreviewImage(src);
    setPreviewOpen(true);
  };
  const handleCancel = () => setPreviewOpen(false);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileList.length === 0) {
      alert("이미지를 등록해주세요.");
      return;
    }

    if (fileList.length > 5) {
      alert("이미지는 총 5장까지 추가 가능합니다.");
      return;
    }

    if (!category) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    const formData = new FormData();

    for (const file of fileList) {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    }

    try {
      const response = await addItem(inputs);
      if (response.status === 200) {
        const itemId = response.data;
        await uploadImages(itemId, formData);
        alert("물건이 등록되었습니다.");
        navigate("/items");
      } else {
        throw new Error("등록 실패");
      }
    } catch (error) {
      alert("등록 오류가 발생했습니다. 다시 시도해주세요.");
      window.location.reload();
    }
  };

  const handleDeadlineOffsetType = (type) => {
    setInputs((prev) => ({ ...prev, deadlineOffsetType: type }));

    const now = new Date();
    let newDeadline;

    switch (type) {
      case "TOMORROW":
        newDeadline = new Date(now.setDate(now.getDate() + 1));
        break;
      case "2DAYS":
        newDeadline = new Date(now.setDate(now.getDate() + 2));
        break;
      case "3DAYS":
        newDeadline = new Date(now.setDate(now.getDate() + 3));
        break;
      case "7DAYS":
        newDeadline = new Date(now.setDate(now.getDate() + 7));
        break;
      case "1MONTH":
        newDeadline = new Date(now.setMonth(now.getMonth() + 1));
        break;
      default:
        newDeadline = now;
    }

    const TIME_ZONE = 3240 * 10000;
    const date = new Date(newDeadline);
    const formDate = new Date(+date + TIME_ZONE)
      .toISOString()
      .replace("T", " ")
      .replace(/\..*/, "");

    setInputs((prev) => ({
      ...prev,
      deadline: formDate.substring(0, 10) + "T" + formDate.substring(11, 16), // YYYY-MM-DD HH:mm 형식으로 설정
    }));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={10} md={10} lg={6}>
            <MDBox sx={{ borderColor: "grey.300" }} borderRadius="lg" border={2} shadow="md">
              <MDBox
                mx={2}
                mb={3}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  나눠요
                </MDTypography>
              </MDBox>

              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                  <MDBox mx={3} display="flex" justifyContent="center">
                    <ImgCrop rotationSlider>
                      <Upload
                        action={null}
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        beforeUpload={(file) => {
                          const isValidType = ["image/jpeg", "image/png", "image/jpg"].includes(
                            file.type
                          );
                          if (!isValidType) {
                            alert("JPG, JPEG, PNG 형식의 이미지 파일만 업로드할 수 있습니다.");
                            return Upload.LIST_IGNORE;
                          }
                          return Promise.resolve(file); // 크롭 처리된 이미지 반영
                        }}
                      >
                        {fileList.length < 5 && "+ Upload"}
                      </Upload>
                    </ImgCrop>
                  </MDBox>

                  <MDBox component="form" role="form">
                    <MDBox m={3}>
                      <MDTypography variant="h6" fontWeight="bold" color="info">
                        제목을 입력해주세요
                      </MDTypography>
                      <TextField
                        id="title"
                        name="title"
                        value={title}
                        onChange={onInputChange}
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </MDBox>

                    <MDBox m={3}>
                      <MDTypography variant="h6" fontWeight="bold" color="info">
                        카테고리를 선택해주세요
                      </MDTypography>
                      <Select
                        id="category"
                        name="category"
                        value={category}
                        onChange={onInputChange}
                        variant="outlined"
                        displayEmpty
                        sx={{ height: "45px" }}
                        fullWidth
                        required
                      >
                        {categoryList.map((category) => (
                          <MenuItem key={category.englishName} value={category.englishName}>
                            {category.koreanName}
                          </MenuItem>
                        ))}
                      </Select>
                    </MDBox>

                    <MDBox m={3}>
                      <MDTypography variant="h6" fontWeight="bold" color="info">
                        나눔 마감 기한을 선택해주세요
                      </MDTypography>
                      <TextField
                        id="deadline"
                        name="deadline"
                        type="datetime-local"
                        fullWidth
                        required
                        value={deadline}
                        onChange={onInputChange}
                        inputProps={{ min: new Date().toISOString().slice(0, 16) }}
                      />

                      <MDBox my={1} display="flex" gap={1}>
                        <Chip
                          label="1일 뒤"
                          variant="outlined"
                          onClick={() => handleDeadlineOffsetType("TOMORROW")}
                        />
                        <Chip
                          label="2일 뒤"
                          variant="outlined"
                          onClick={() => handleDeadlineOffsetType("2DAYS")}
                        />
                        <Chip
                          label="3일 뒤"
                          variant="outlined"
                          onClick={() => handleDeadlineOffsetType("3DAYS")}
                        />
                        <Chip
                          label="일주일 뒤"
                          variant="outlined"
                          onClick={() => handleDeadlineOffsetType("7DAYS")}
                        />
                        <Chip
                          label="한달 뒤"
                          variant="outlined"
                          onClick={() => handleDeadlineOffsetType("1MONTH")}
                        />
                      </MDBox>
                    </MDBox>

                    <MDBox m={3}>
                      <MDTypography variant="h6" fontWeight="bold" color="info">
                        자세한 설명
                      </MDTypography>
                      <TextField
                        id="description"
                        name="description"
                        variant="outlined"
                        onChange={onInputChange}
                        value={description}
                        fullWidth
                        required
                        multiline
                        rows={8}
                      />
                    </MDBox>

                    <MDBox display="flex" justifyContent="center" mb={3}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        onClick={handleSubmit}
                        sx={{ width: "20%", whiteSpace: "nowrap" }}
                      >
                        등록하기
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
        <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
          <img alt="preview" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </MDBox>
    </DashboardLayout>
  );
}

export default AddItem;
