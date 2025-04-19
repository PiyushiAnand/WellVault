import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Notifications() {
 

  const alertContent = (name, link) => (
    <MDTypography variant="body2" color="white">
      One stop access to {name} with{" "}
      <MDTypography
        component="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        variant="body2"
        fontWeight="medium"
        color="white"
      >
        {name} link
      </MDTypography>
      . Give it a click if you like.
    </MDTypography>
  );

  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Crafted just for you</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
                <MDAlert color="primary" dismissible>
                  {alertContent("Healthy Recipes", "https://www.bbcgoodfood.com/recipes/collection/healthy-recipes")}
                </MDAlert>
                <MDAlert color="secondary" dismissible>
                  {alertContent("Health News", "https://www.healthline.com/health-news")}
                </MDAlert>
                <MDAlert color="success" dismissible>
                  {alertContent("Medications", "https://pharmeasy.in/")}
                </MDAlert>
                <MDAlert color="error" dismissible>
                  {alertContent("Health check", "https://www.open.edu/openlearn/health-sports-psychology/health/how-healthy-are-you")}
                </MDAlert>
              </MDBox>
            </Card>
          </Grid>    
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Notifications;
