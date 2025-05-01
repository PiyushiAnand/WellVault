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
import TextField from "@mui/material/TextField";
import { DashboardCustomizeSharp } from "@mui/icons-material";
function Doctors() {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [doctorFilter, setDoctorFilter] = useState("");
  const [specFilter, setspecFilter] = useState("");


  useEffect(() => {
    fetchDoctorDetails();
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

  const fetchDoctorDetails = async () => {
    try {
      const res = await fetch(`${apiUrl}/doc_details`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const result = await res.json();
        console.log(result);
      setResult(result);
    } catch (error) {
      console.error("Failed to fetch doctor details", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search by Doctor"
              fullWidth
              value={doctorFilter}
              onChange={(e) => setDoctorFilter(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search by Speciality"
              fullWidth
              value={specFilter}
              onChange={(e) => setspecFilter(e.target.value)}
            />
          </Grid>
        </Grid>
      <Typography variant="h4" gutterBottom m={2}>
        Doctor Details
      </Typography>
      <Grid container spacing={3} padding={2}>
      {result
        .filter((item) => {
          const doctorMatch = item.doc_name.toLowerCase().includes(doctorFilter.toLowerCase());
          const specMatch = item.speciality.toLowerCase().includes(specFilter.toLowerCase());
          return specMatch && doctorMatch;
        })
        .map((item, index) => (
          //log each item
          console.log(item),
         
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ minHeight: 200, padding: 2 }}>
              <CardContent>
                <Typography variant="body1"><strong>{item.doc_name}</strong></Typography>
                <Typography variant="body2"><strong>Speciality: </strong>{item.speciality}
                    </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {result.length === 0 && (
          <Typography variant="body1" m={2}>
            No doctors found
          </Typography>
        )}
      </Grid>
    </DashboardLayout>
  );
}

export default Doctors; 
