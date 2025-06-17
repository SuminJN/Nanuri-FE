import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import MDTypography from "../../components/MDTypography";
import TextField from "@mui/material/TextField";
import MDButton from "../../components/MDButton";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../examples/Footer";
import { addWant } from "../../apis/wantApi";

function AddPost() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });
  const { title, description } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!description.trim()) {
      alert("설명을 입력해주세요.");
      return;
    }

    addWant(inputs).then((response) => {
      if (response.status === 200) {
        alert("글이 등록되었습니다.");
        navigate("/home");
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
            <MDBox
              bgColor="white"
              sx={{ borderColor: "grey.300" }}
              borderRadius="lg"
              border={2}
              shadow="md"
            >
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
                  필요해요
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                  <MDBox component="form" role="form">
                    <MDBox m={3}>
                      <MDTypography variant="h6" fontWeight="bold" color="info">
                        제목을 입력해주세요
                      </MDTypography>
                      <TextField
                        id="title"
                        name="title"
                        value={title}
                        onChange={onChange}
                        variant="outlined"
                        fullWidth
                        required
                        placeholder="예) 남는 연필 있으신 분 있나요?"
                        inputProps={{ maxLength: 30 }}
                      />
                      <MDBox justifyContent="flex-end" display="flex" mt={1}>
                        <MDTypography variant="caption" color="text">
                          {title.length} / 30자
                        </MDTypography>
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
                        onChange={onChange}
                        value={description}
                        fullWidth
                        required
                        multiline
                        rows={8}
                        inputProps={{ maxLength: 500 }}
                        placeholder="예) 연필이 필요한데, 혹시 남는 연필 있으신 분 계신가요? 제가 직접 가지러 갈게요!"
                      />
                      <MDBox justifyContent="flex-end" display="flex" mt={1}>
                        <MDTypography variant="caption" color="text">
                          {description.length} / 500자
                        </MDTypography>
                      </MDBox>
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
      </MDBox>
    </DashboardLayout>
  );
}

export default AddPost;
