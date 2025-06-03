import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import Icon from "@mui/material/Icon";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import SharingItems from "./SharingItems";
import ReceivingItems from "./ReceivingItems";
import { useMaterialUIController } from "../../context";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Button,
  InputAdornment,
} from "@mui/material";
import WishItems from "../wish/WishItems";
import CategoryIcon from "@mui/icons-material/Category";
import { useRecoilState } from "recoil";
import { TabValue } from "../../recoil/TabValueState";
import { categoryList } from "../../assets/category/categoryList";
import MDTypography from "../../components/MDTypography";

function Dashboard() {
  const [controller] = useMaterialUIController();
  const { miniSidenav } = controller;
  const navigate = useNavigate();

  // 필터 상태들
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [sortOrder, setSortOrder] = useState("");
  const [selectedSortOrder, setSelectedSortOrder] = useState("");

  const [tabValue, setTabValue] = useRecoilState(TabValue);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

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

  const handleModalOpen = () => setModal(true);
  const handleModalClose = () => setModal(false);

  const handleApplyFilters = () => {
    setCategory(selectedCategory);
    setSortOrder(selectedSortOrder);
    setRefresh(!refresh);
    handleModalClose();
  };

  const handleChipDelete = (type) => {
    if (type === "category") {
      setCategory("");
      setSelectedCategory("");
    } else if (type === "sort") {
      setSortOrder("");
      setSelectedSortOrder("");
    }
    setRefresh(!refresh);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox p={3}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} lg={6}>
            <AppBar position="static">
              <Tabs orientation="horizontal" value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label={<MDTypography variant={tabValue === 0 ? "h6" : ""}>나눠요</MDTypography>}
                  icon={<Icon fontSize="small">volunteer_activism</Icon>}
                />
                <Tab
                  label={<MDTypography variant={tabValue === 1 ? "h6" : ""}>필요해요</MDTypography>}
                  icon={<Icon fontSize="small">handshake_icon</Icon>}
                />
                <Tab
                  label={<MDTypography variant={tabValue === 2 ? "h6" : ""}>관심</MDTypography>}
                  icon={<Icon fontSize="small">favorite_icon</Icon>}
                />
              </Tabs>
            </AppBar>
          </Grid>

          {tabValue === 0 && (
            <>
              <Grid item xs={12} lg={3} display="flex" justifyContent="end" alignItems="center">
                <MDBox display="flex" gap={1}>
                  {category && (
                    <Chip
                      label={
                        categoryList.find((cat) => cat.englishName === category)?.koreanName ||
                        category
                      }
                      variant="outlined"
                      onDelete={() => handleChipDelete("category")}
                    />
                  )}
                  {sortOrder && (
                    <Chip
                      label={sortOrder}
                      variant="outlined"
                      onDelete={() => handleChipDelete("sort")}
                    />
                  )}
                  <IconButton size="medium" color="secondary" onClick={handleModalOpen}>
                    <CategoryIcon />
                  </IconButton>
                </MDBox>
              </Grid>

              <Grid item xs={12} lg={3}>
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
              </Grid>
            </>
          )}
        </Grid>
      </MDBox>

      {/* 필터 다이얼로그 */}
      <Dialog fullWidth maxWidth="sm" scroll="paper" open={modal} onClose={handleModalClose}>
        <DialogTitle>필터</DialogTitle>
        <DialogContent dividers>
          <MDBox mb={3} mx={2}>
            <FormControl fullWidth>
              <FormLabel sx={{ mb: 1 }}>정렬</FormLabel>
              <RadioGroup
                row
                name="sort"
                value={selectedSortOrder}
                onChange={(e) => setSelectedSortOrder(e.target.value)}
              >
                <FormControlLabel value="" control={<Radio />} label="최신순" />
                {["오래된순", "나눔완료", "관심순", "조회순"].map((label) => (
                  <FormControlLabel key={label} value={label} control={<Radio />} label={label} />
                ))}
              </RadioGroup>
            </FormControl>
          </MDBox>

          <MDBox mx={2}>
            <FormControl fullWidth>
              <FormLabel sx={{ mb: 1 }}>카테고리</FormLabel>
              <RadioGroup
                row
                name="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <FormControlLabel value="" control={<Radio />} label="전체" />
                {categoryList.map((cat) => (
                  <FormControlLabel
                    key={cat.englishName}
                    value={cat.englishName}
                    control={<Radio />}
                    label={cat.koreanName}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </MDBox>
        </DialogContent>

        <DialogActions>
          <Button color="secondary" onClick={handleModalClose}>
            닫기
          </Button>
          <Button color="primary" onClick={handleApplyFilters}>
            적용
          </Button>
        </DialogActions>
      </Dialog>

      <MDBox mt={1} mb={3} sx={{ px: { lg: 2 } }}>
        {tabValue === 0 && (
          <SharingItems
            category={category}
            search={search}
            refresh={refresh}
            sortOrder={sortOrder} // 추후 API 연결용
          />
        )}
        {tabValue === 1 && <ReceivingItems />}
        {tabValue === 2 && <WishItems />}
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
