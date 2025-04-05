import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import Footer from "../../examples/Footer";
import WishItems from "./WishItems";

function Wish() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox mt={2} mb={3}>
        <WishItems />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Wish;
