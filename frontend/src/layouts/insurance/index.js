import React, { useState } from "react";
import {
  Card,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { apiUrl } from "../../config/config";

function formatDate(value) {
  const date = new Date(value);
  if (!isNaN(date)) {
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  }
  return value;
}
function isDate(value) {
  // Checks if the value is a valid ISO date string
  return typeof value === 'string' && value.includes('T') && !isNaN(new Date(value).getTime());
}

function VerifyInsurance() {
  const [form, setForm] = useState({
    policy_number: "",
    provider_name: "",
    username: "",
  });
  const [data, setData] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "info" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setData(null);
    const { policy_number, provider_name} = form;

    if (!policy_number || !provider_name) {
      showSnackbar("Please fill in all fields", "warning");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/verify-policy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ policy_number, provider_name }),
      });

      const result = await response.json();

      if (!response.ok) {
        showSnackbar(result.message || "Verification failed", "error");
        return;
      }

      setData(result.data);
      showSnackbar("Policy verified successfully", "success");
    } catch (error) {
      console.error("Verification error:", error);
      showSnackbar("Server error occurred", "error");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Card sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Verify Insurance Policy
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Policy Number"
                name="policy_number"
                fullWidth
                value={form.policy_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Provider Name"
                name="provider_name"
                fullWidth
                value={form.provider_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Verify
              </Button>
            </Grid>
          </Grid>
        </Card>

        {data && (
          <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Insurance Policy Details
          </Typography>
          {Object.entries(data).map(([key, value]) => (
            <Typography key={key}>
              <strong>{key.replace(/_/g, " ")}:</strong>{" "}
              {isDate(value) ? formatDate(value) : String(value)}
            </Typography>
          ))}
        </Card>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} onClose={handleCloseSnackbar} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </MDBox>
    </DashboardLayout>
  );
}

export default VerifyInsurance;
