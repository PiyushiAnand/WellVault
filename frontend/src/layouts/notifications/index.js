import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { apiUrl } from "../../config/config";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Notifications() {
  const [appointments, setAppointments] = useState([]);
  const [upcomingAppointment, setUpcomingAppointment] = useState([]);

    const navigate = useNavigate();
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await fetch(`${apiUrl}/isLoggedIn`, {
            method: "GET",
            credentials: "include",
          });
          if (res.status === 401) navigate("/");
        } catch (err) {
          console.error("Error verifying auth", err);
          navigate("/");
        }
      };
  
      checkAuth();
    }, [navigate]);
  
  useEffect(() => {
    // Fetch appointments from the server (replace with your API URL)
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${apiUrl}/appointments`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        // Filter the appointments to show only future appointments
        const futureAppointments = data.data.filter((appointment) => {
          const appointmentDate = new Date(appointment.appointment_date);
          const currentDate = new Date();
          return appointmentDate > currentDate;
        });

        // If there are upcoming appointments, display the first one
        if (futureAppointments.length > 0) {
          setUpcomingAppointment(futureAppointments);
        }
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    };

    fetchAppointments();
  }, []);

  // Helper function to generate alert content with links
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
                <MDTypography variant="h5">Upcoming Bookings</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
                {upcomingAppointment.length > 0 ? (
                  upcomingAppointment.map((appointment, index) => (
                    <MDAlert key={index} color="warning" dismissible>
                      You have an upcoming appointment with{" "}
                      {appointment.doctor_name} at{" "}
                      {appointment.hospital_name} on{" "}
                      {new Date(appointment.appointment_date).toLocaleDateString()}
                    </MDAlert>
                  ))
                ) : (
                  <MDAlert color="info" dismissible>
                    No upcoming appointments at the moment.
                  </MDAlert>
                )}
              </MDBox>
                {/* Add the links you mentioned earlier */}

              <MDBox p={2}>
              <MDTypography variant="h5">Crafted Just For You</MDTypography>
              </MDBox>
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
    
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Notifications;
