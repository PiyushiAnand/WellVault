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
  '& .MuiTypography-h4': {
    fontSize: '2rem',
    fontWeight: 600,
  },
  '& .MuiTypography-h6': {
    fontSize: '1.25rem',
    fontWeight: 700,
  },
  minHeight: '200px',
  cursor: 'pointer',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)'
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
        const res = await fetch(`${apiUrl}/isLoggedIn`, {
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
    { title: "Prescriptions", icon: "medication", count: 12, path: "/prescriptions" },
    { title: "Ongoing Treatment", icon: "healing", count: 3, path: "/treatment" },
    { title: "Lab Reports", icon: "assignment", count: 5, path: "/lab-reports" },
    { title: "Vaccines", icon: "vaccines", count: 4, path: "/vaccines" },
    { title: "Medical History", icon: "history", count: "Complete", path: "/medical-history" },
    { title: "Insurance Details", icon: "security", count: "Active", path: "/insurance" }
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {medicalCards.map((card, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <MDBox mb={3} onClick={() => navigate(card.path)}>
                <MedicalCard
                  color={getColor(index)}
                  icon={card.icon}
                  title={<Typography variant="h6">{card.title}</Typography>}
                  count={card.count}
                />
              </MDBox>
            </Grid>
          ))}
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;