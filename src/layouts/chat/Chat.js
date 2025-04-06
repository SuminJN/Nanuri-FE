import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import profilesListData from "../profile/data/profilesListData";
import ProfilesList from "../../examples/Lists/ProfilesList";
import Footer from "../../examples/Footer";

function Chat() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox position="relative">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <ProfilesList title="채팅" profiles={profilesListData} shadow={true} />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Chat;
