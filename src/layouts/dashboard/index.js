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
import {
  navbarDesktopMenu,
  navbarIconButton,
  navbarMobileMenu,
  navbarRow,
} from "../../examples/Navbars/DashboardNavbar/styles";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import MDButton from "../../components/MDButton";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import {
  Chip,
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
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import WishItems from "../wish/WishItems";
import AppsIcon from "@mui/icons-material/Apps";
import { useRecoilState } from "recoil";
import { TabValue } from "../../recoil/TabValueState";
import { categoryList } from "../../assets/category/categoryList";
import MenuItem from "@mui/material/MenuItem";
import MDTypography from "../../components/MDTypography";
import Box from "@mui/material/Box";

function Dashboard() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useRecoilState(TabValue);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const handleWishListOpen = () => {
    navigate("/wish");
  };
  const [search, setSearch] = useState("");

  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [searchMode, setSearchMode] = useState("제목");

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      setRefresh(!refresh);
    }
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    setRefresh(!refresh);
  };

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const handleChipDelete = () => {
    setCategory("");
    setRefresh(!refresh);
  };

  return (
    <DashboardLayout pValue={miniSidenav ? 0 : 3}>
      <DashboardNavbar />
      <MDBox position="relative" px={2}>
        <Grid container spacing={3} display="flex" alignItems="center">
          <Grid item xs={12} sm={6}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label={<MDTypography variant={tabValue === 0 ? "h6" : ""}>나눠요</MDTypography>}
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      volunteer_activism
                    </Icon>
                  }
                />
                <Tab
                  label={<MDTypography variant={tabValue === 1 ? "h6" : ""}>필요해요</MDTypography>}
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      handshake_icon
                    </Icon>
                  }
                />
                <Tab
                  label={<MDTypography variant={tabValue === 2 ? "h6" : ""}>관심</MDTypography>}
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      favorite_icon
                    </Icon>
                  }
                />
              </Tabs>
            </AppBar>
          </Grid>
          {tabValue === 0 ? (
            <>
              <Grid item xs={8} sm={3}>
                <MDBox display="flex" alignItems="center">
                  <MDBox mr={1} display="flex" alignItems="center">
                    <FormControl
                      variant="outlined"
                      size="medium"
                      sx={{ minWidth: 100, height: "100%" }}
                    >
                      <Select
                        style={{ height: 42 }}
                        value={searchMode}
                        onChange={(e) => setSearchMode(e.target.value)}
                        displayEmpty
                        inputProps={{ "aria-label": "검색 모드 선택" }}
                      >
                        <MenuItem value="제목">제목</MenuItem>
                        <MenuItem value="내용">내용</MenuItem>
                        <MenuItem value="제목+내용">제목+내용</MenuItem>
                        <MenuItem value="닉네임">닉네임</MenuItem>
                      </Select>
                    </FormControl>
                  </MDBox>
                  <form onSubmit={handleSubmitSearch}>
                    <OutlinedInput
                      placeholder="검색"
                      fullWidth
                      value={search}
                      onChange={handleSearch}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton type="submit">
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </form>
                </MDBox>
              </Grid>
              <Grid item xs={4} sm={3} display="flex" justifyContent="end">
                <MDBox>
                  {category ? (
                    <Chip
                      label={
                        categoryList.find((cat) => cat.englishName === category)?.koreanName ||
                        category
                      }
                      variant="outlined"
                      onDelete={handleChipDelete}
                    />
                  ) : (
                    <></>
                  )}
                  <IconButton
                    size="midium"
                    color="secondary"
                    sx={navbarIconButton}
                    onClick={handleModalOpen}
                  >
                    <AppsIcon />
                  </IconButton>
                </MDBox>
              </Grid>
            </>
          ) : (
            <></>
          )}
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
        <DialogTitle>{"필터"}</DialogTitle>
        <DialogContent sx={{ m: 2 }}>
          <MDBox mb={3}>
            <FormControl>
              <FormLabel>분류</FormLabel>
              <RadioGroup defaultValue="최신순" name="radio-buttons-group" row>
                <FormControlLabel value="최신순" control={<Radio />} label="최신순" />
                <FormControlLabel value="오래된순" control={<Radio />} label="오래된순" />
                <FormControlLabel value="나눔완료" control={<Radio />} label="나눔완료" />
                <FormControlLabel value="관심순" control={<Radio />} label="관심순" />
                <FormControlLabel value="조회순" control={<Radio />} label="조회순" />
              </RadioGroup>
            </FormControl>
          </MDBox>
          <MDBox>
            <FormControl>
              <FormLabel>카테고리</FormLabel>
              <RadioGroup
                defaultValue=""
                name="radio-buttons-group"
                row
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <FormControlLabel value="" control={<Radio />} label="전체"></FormControlLabel>
                {categoryList.map((category) => (
                  <FormControlLabel
                    key={category.englishName}
                    value={category.englishName}
                    control={<Radio />}
                    label={category.koreanName}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </MDBox>
          {/*<DialogContentText id="alert-dialog-description">*/}
          {/*  Let Google help apps determine location. This means sending anonymous location data to*/}
          {/*  Google, even when no apps are running.*/}
          {/*</DialogContentText>*/}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleModalClose}>
            닫기
          </Button>
          <Button
            onClick={() => {
              setRefresh(!refresh);
              handleModalClose();
            }}
          >
            적용
          </Button>
        </DialogActions>
      </Dialog>
      <MDBox mt={1} mb={3}>
        {tabValue === 0 && <SharingItems category={category} search={search} refresh={refresh} />}
        {tabValue === 1 && <ReceivingItems />}
        {tabValue === 2 && <WishItems />}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
