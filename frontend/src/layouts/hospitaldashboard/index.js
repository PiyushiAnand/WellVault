import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useEffect } from "react";
import { apiUrl } from "../../config/config.js";

// Navigation
import { useNavigate } from "react-router-dom";

// Styled component
const MedicalCard = styled(ComplexStatisticsCard)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '1.5rem',
    fontWeight: 600,
    textAlign: 'center',
    marginTop: '1rem'
  },
  minHeight: '200px',
  cursor: 'pointer',
  transition: 'transform 0.3s',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6]
  }
}));

// Helper function for colors
const getColor = (index) => {
  const colors = ["info", "primary", "success", "warning", "dark", "secondary"];
  return colors[index % colors.length];
};

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${apiUrl}/hospital/isLoggedIn`, {
          method: "GET",
          credentials: "include",
        });
        
        if (res.status === 401) {
          navigate("/");
        }
      } catch (err) {
        console.error("Error verifying auth", err);
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

  const medicalCards = [
    { title: "Empty Slots", icon: "medication", path: "/empty_slots" },
    { title: "Patient Details", icon: "healing", path: "/patient_details" },
    { title: "Doctors", icon: "assignment", path: "/doctors" },
    { title: "BloodBank", icon: "vaccines", path: "/blood" },
    { title: "Ambulance", icon: "history", path: "/ambulance" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
          Medical Dashboard
        </Typography>
        <Grid container spacing={3}>
          {medicalCards.map((card, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <MDBox mb={3} onClick={() => navigate(card.path)}>
                
                <MedicalCard
                  color={getColor(index)}
                  icon={card.icon}
                  title={<Typography variant="h4">{card.title}</Typography>}
                />
              </MDBox>
            </Grid>
          ))}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;