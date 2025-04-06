import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";

function Treatments() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <h1>Treatments</h1>
        {/* Add your content here */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Treatments;