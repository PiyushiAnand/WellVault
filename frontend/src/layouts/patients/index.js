import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { apiUrl } from "../../config/config";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function PatientDetails() {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`${apiUrl}/hospital/isLoggedIn`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) navigate("/");
      } catch (err) {
        console.log(err);
      }
    };
    checkStatus();
  }, [navigate]);

  const fetchPatientDetails = async () => {
    try {
      const res = await fetch(`${apiUrl}/patient_details`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const result = await res.json();
      setResult(result);
    } catch (error) {
      console.error("Failed to fetch patient details", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Typography variant="h4" gutterBottom m={2}>
        Patient Details
      </Typography>
      <Grid container spacing={3} padding={2}>
        {result.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ minHeight: 200, padding: 2 }}>
              <CardContent>
                <Typography variant="h4">Name: {item.name}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1">Doctor: {item.doctor_name}</Typography>
                <Typography variant="body2">
                    Date: {new Date(item.appointment_date).toLocaleDateString("en-GB")}
                    </Typography>
                <Typography variant="body2">Time: {item.timings}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {result.length === 0 && (
          <Typography variant="body1" m={2}>
            No appointments scheduled till now
          </Typography>
        )}
      </Grid>
    </DashboardLayout>
  );
}

export default PatientDetails;
