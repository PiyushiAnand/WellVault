import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import { useEffect, useState } from "react";
import { apiUrl } from "../../config/config.js";
import { useNavigate } from "react-router-dom";

// Styled component
const MedicalCard = styled(ComplexStatisticsCard)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '1.3rem',
    fontWeight: 600,
    textAlign: 'center',
  },
  minHeight: '180px',
  cursor: 'pointer',
  transition: 'transform 0.3s',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const getColor = (index) => {
  const colors = ["info", "primary", "success", "warning", "dark", "secondary"];
  return colors[index % colors.length];
};

function Dashboard() {
  const navigate = useNavigate();
  const [hospital_id, setHospitalid] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${apiUrl}/hospital/isLoggedIn`, {
          method: "GET",
          credentials: "include",
        });
        const ans = await res.json();
        if (res.status === 401) {
          navigate("/");
        } else {
          setHospitalid(ans.hosp_id);
        }
      } catch (err) {
        console.error("Error verifying auth", err);
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

  const medicalCards = [
    { title: "Empty Slots", icon: "event_available", path: "/empty_slots" },
    { title: "Patient Details", icon: "groups", path: "/patient_details" },
    { title: "Doctors", icon: "medical_services", path: "/doctors" },
    { title: "BloodBank", icon: "bloodtype", path: "/blood" },
    { title: "Ambulance", icon: "local_shipping", path: "/ambulance" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={4} px={2}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to your Dashboard
        </Typography>

        <MDBox mb={4} p={3} borderRadius="lg" sx={{ backgroundColor: "#f5f5f5" }}>
        <Typography variant="h5" fontWeight="medium" color="text" display="flex" alignItems="center">
  Hospital ID:&nbsp;
  <strong>{hospital_id || "Loading..."}</strong>
  <Tooltip
    title={
      <Typography variant="body2" sx={{ color: "red" }}>
        Please use this ID for future sign in
      </Typography>
    }
    arrow
    placement="top"
  >
    <IconButton size="small" sx={{ ml: 1 }}>
      <StarIcon fontSize="small" color="warning" />
    </IconButton>
  </Tooltip>
</Typography>
          <Typography variant="body2" mt={1}>
            Manage your hospital's operations efficiently and effortlessly
          </Typography>
        </MDBox>

        <Grid container spacing={3}>
          {medicalCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MDBox onClick={() => navigate(card.path)}>
                <MedicalCard
                  color={getColor(index)}
                  icon={card.icon}
                  title={<Typography variant="h5">{card.title}</Typography>}
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
