import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import { Select, MenuItem, FormControl } from "@mui/material";
import { Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { editItem, getItem, deleteItem, uploadImages, deleteImage } from "../../apis/itemApi";
import { categoryList } from "../../assets/category/categoryList";

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
  const [fileList, setFileList] = useState([]);

  // 삭제된 이미지 ID 목록
  const [deletedImageIds, setDeletedImageIds] = useState([]);

  useEffect(() => {
    getItem(itemId).then((response) => {
      const filesFromServer = response.data.images.map((img, idx) => ({
        uid: `-${img.imageId || idx}`,
        name: `image-${img.imageId || idx}`,
        status: "done",
        url: img.fileUrl,
      }));

      setFileList(filesFromServer);
      setItem({
        ...response.data,
        category:
          categoryList.find((cat) => cat.koreanName === response.data.category)?.englishName || "",
      });
    });
  }, [itemId]);

  const handleChangeItem = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    // 삭제된 파일 체크
    const removedFiles = fileList.filter(
      (file) => !newFileList.some((newFile) => newFile.uid === file.uid)
    );

    const removedImageIds = removedFiles
      .filter((file) => file.uid.startsWith("-")) // 서버에서 온 이미지
      .map((file) => parseInt(file.uid.slice(1), 10));

    setDeletedImageIds((prev) => [...prev, ...removedImageIds]);

    if (newFileList.length === 0) {
      alert("이미지는 최소 한 장 이상 있어야 합니다.");
      return;
    }

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

  const handleClickEdit = async () => {
    if (fileList.length === 0) {
      alert("이미지를 한 장 이상 등록해야 합니다.");
      return;
    }

    const formData = new FormData();
    for (const file of fileList) {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    }

    try {
      const response = await editItem(itemId, item); //{1}
      if (response.status === 200) {
        if (deletedImageIds.length > 0) {
          await deleteImage(itemId, deletedImageIds);
        }

        if (formData.has("files")) {
          await uploadImages(itemId, formData);
        }

        alert("수정되었습니다.");
        navigate(-1, { replace: true });
      } else {
        throw new Error("수정 실패");
      }
    } catch (error) {
      console.error("수정 오류:", error);
      alert("수정 오류가 발생했습니다. 다시 시도해주세요.");
      window.location.reload();
    }
  };

  const handleItemDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const response = await deleteItem(itemId);
      if (response.status === 200) {
        alert("삭제되었습니다.");
        navigate("/home", { replace: true });
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={10}>
          <MDBox my={3} borderRadius="lg" sx={{ borderColor: "grey.300" }} border={2} shadow="md">
            <MDBox display="flex" justifyContent="center" alignItems="center" p={2}>
              <MDTypography variant="h3" mt={2}>
                나눔 글 수정하기
              </MDTypography>
            </MDBox>
            <Grid container spacing={2} sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
              <Grid item xs={12} sm={12} md={6}>
                <MDBox mx={2}>
                  <MDTypography variant="h6" color="error" fontWeight="bold" mb={1}>
                    ⚠️ 이미지는 최소 한 장 이상 있어야 합니다!
                  </MDTypography>
                  <ImgCrop rotationSlider>
                    <Upload
                      action={null}
                      listType="picture-card"
                      fileList={fileList}
                      onChange={handleImageChange}
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
                      inputProps={{ min: new Date().toISOString().slice(0, 16) }}
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

                  <Grid container spacing={1}>
                    <Grid item xs={8}>
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
                    </Grid>
                    <Grid item xs={4}>
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
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </DashboardLayout>
  );
};

export default EditItem;
