import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState } from "react";
import Icon from "@mui/material/Icon";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import SharingItems from "./SharingItems";
import ReceivingItems from "./ReceivingItems";
import { useMaterialUIController } from "../../context";
import { navbarIconButton } from "../../examples/Navbars/DashboardNavbar/styles";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import MDButton from "../../components/MDButton";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import WishItems from "../wish/WishItems";

function Dashboard() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const navigate = useNavigate();

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const handleWishListOpen = () => {
    navigate("/wish");
  };

  const [modal, setModal] = useState(false);

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox position="relative" px={2}>
        <Grid
          container
          spacing={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={10} sm={8} md={8} lg={6}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="나눠요"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      volunteer_activism
                    </Icon>
                  }
                />
                <Tab
                  label="필요해요"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      handshake_icon
                    </Icon>
                  }
                />
                <Tab
                  label="관심"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      grade_icon
                    </Icon>
                  }
                />
              </Tabs>
            </AppBar>
          </Grid>
          <Grid item xs={2} sm={4} md={4} lg={3} display="flex" justifyContent="flex-end">
            {miniSidenav ? (
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                variant="contained"
                onClick={handleModalOpen}
              >
                <SearchIcon />
              </IconButton>
            ) : (
              <MDButton
                variant="outlined"
                color="secondary"
                endIcon={<SearchIcon />}
                onClick={handleModalOpen}
                fullWidth
              >
                찾아보기
              </MDButton>
            )}
          </Grid>
        </Grid>
      </MDBox>
      <Dialog
        fullWidth
        maxWidth={"sm"}
        scroll={"paper"}
        open={modal}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"검색 필터"}</DialogTitle>
        <DialogContent sx={{ m: 2 }}>
          <MDBox mb={3}>
            <Input
              placeholder="검색어를 입력하세요"
              fullWidth
              autoFocus
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </MDBox>
          <MDBox mb={3}>
            <FormControl>
              <FormLabel>분류</FormLabel>
              <RadioGroup defaultValue="최신순" name="radio-buttons-group" row>
                <FormControlLabel value="최신순" control={<Radio />} label="최신순" />
                <FormControlLabel value="오래된순" control={<Radio />} label="오래된순" />
                <FormControlLabel value="나눔완료" control={<Radio />} label="나눔완료" />
              </RadioGroup>
            </FormControl>
          </MDBox>
          <MDBox>
            <FormControl>
              <FormLabel>카테고리</FormLabel>
              <RadioGroup defaultValue="female" name="radio-buttons-group" row>
                <FormControlLabel value="전공 서적" control={<Radio />} label="전공 서적" />
                <FormControlLabel value="일반 도서" control={<Radio />} label="일반 도서" />
                <FormControlLabel value="디지털기기" control={<Radio />} label="디지털기기" />
                <FormControlLabel value="문구류" control={<Radio />} label="문구류" />
                <FormControlLabel value="운동용품" control={<Radio />} label="운동용품" />
                <FormControlLabel value="생활용품" control={<Radio />} label="생활용품" />
                <FormControlLabel value="식료품" control={<Radio />} label="식료품" />
                <FormControlLabel value="남성 의류" control={<Radio />} label="남성 의류" />
                <FormControlLabel value="여성 의류" control={<Radio />} label="여성 의류" />
                <FormControlLabel value="화장품" control={<Radio />} label="화장품" />
                <FormControlLabel value="티켓, 쿠폰류" control={<Radio />} label="티켓, 쿠폰류" />
                <FormControlLabel
                  value="반려 동물 용품"
                  control={<Radio />}
                  label="반려 동물 용품"
                />
                <FormControlLabel value="취미 관련" control={<Radio />} label="취미 관련" />
                <FormControlLabel value="가구" control={<Radio />} label="가구" />
              </RadioGroup>
            </FormControl>
          </MDBox>
          {/*<DialogContentText id="alert-dialog-description">*/}
          {/*  Let Google help apps determine location. This means sending anonymous location data to*/}
          {/*  Google, even when no apps are running.*/}
          {/*</DialogContentText>*/}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
      <MDBox mt={1} mb={3}>
        {tabValue === 0 && <SharingItems />}
        {tabValue === 1 && <ReceivingItems />}
        {tabValue === 2 && <WishItems />}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
