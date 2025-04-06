import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";

function Prescriptions() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <h1>Prescriptions</h1>
        {/* Add your content here */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Prescriptions;