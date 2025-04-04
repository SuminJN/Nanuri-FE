import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "../../components/MDButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apis/axios";
import { Image } from "antd";
import Footer from "../../examples/Footer";

function AddItem() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    category: "",
    place: "",
    description: "",
  });
  const { title, place, category, description } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const addImageFile = (e) => {
    const images = e.target.files;

    if (images) {
      setImageFiles(images);
      setPreviews([]);

      for (let i = 0; i < images.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(images[i]);
        reader.onloadend = () => {
          if (reader.result) {
            setPreviews((prev) => [...prev, reader.result]);
          }
        };
      }
    }
  };

  const removeImageFile = (idx) => {
    setImageFiles(previews.filter((e, i) => i !== idx));
    setPreviews(previews.filter((e, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
      alert("이미지를 등록해주세요.");
      return;
    }
    if (!category) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    Array.from(imageFiles).forEach((file) => {
      formData.append("files", file);
    });

    axiosInstance.post("/api/item", inputs).then((response) => {
      if (response.status === 200) {
        const itemId = response.data;

        axiosInstance
          .post(`/api/image/${itemId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => console.log(res));

        alert("물건이 등록되었습니다.");
        navigate("/items");
      } else {
        alert("등록 오류가 발생했습니다. 다시 시도해주세요.");
        window.location.reload();
      }
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Card>
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
                  나눔 등록
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} justifyContent="center">
                {previews.map((src, index) => (
                  <Grid item xs={10} sm={3} key={index}>
                    <Image
                      width="100%"
                      height="150px"
                      src={src}
                      style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <MDBox mx={3} display="flex" justifyContent="flex-end">
                    <input
                      accept="image/*"
                      id="upload-button"
                      multiple
                      type="file"
                      style={{ display: "none" }}
                      onChange={addImageFile}
                    />
                    <label htmlFor="upload-button">
                      <MDButton variant="outlined" color="info" component="span" fullWidth>
                        이미지 업로드
                      </MDButton>
                    </label>
                  </MDBox>
                  <MDBox component="form" role="form">
                    <MDBox m={3}>
                      <TextField
                        id="title"
                        label="제목"
                        name="title"
                        value={title}
                        onChange={onChange}
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </MDBox>
                    <MDBox m={3}>
                      <TextField
                        id="place"
                        label="장소"
                        name="place"
                        value={place}
                        onChange={onChange}
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </MDBox>
                    <MDBox m={3}>
                      <TextField
                        id="category"
                        label="카테고리"
                        name="category"
                        value={category}
                        onChange={onChange}
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </MDBox>
                    <MDBox m={3}>
                      <TextField
                        id="description"
                        label="설명"
                        name="description"
                        variant="outlined"
                        onChange={onChange}
                        value={description}
                        fullWidth
                        required
                        multiline
                        rows={4}
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
                        나눔 등록
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddItem;
