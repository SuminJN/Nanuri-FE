import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import ChatRoomList from "./ChatRoomList";

function Chat() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox position="relative" mb={3}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={10} md={6}>
            <ChatRoomList />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Chat;
