import { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import MDBox from "components/MDBox";
import { apiUrl } from "../../config/config";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Insurance() {
  const [insuranceList, setInsuranceList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [newInsurance, setNewInsurance] = useState({
    policy_number: "",
    provider_name: "",
    coverage_details: "",
    valid_from: new Date().toISOString().split("T")[0],
    valid_until: new Date().toISOString().split("T")[0],
    claim_limit: "",
  });

  useEffect(() => {
    const fetchInsuranceList = async () => {
      try {
        const response = await fetch(`${apiUrl}/insurance`, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        if (response.status !== 200) {
          console.error("Error fetching insurance list:", result);
        }
        setInsuranceList(Array.isArray(result.insurance) ? result.insurance : []);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchInsuranceList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInsurance((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddInsurance = () => {
    setNewInsurance({
      policy_number: "",
      provider_name: "",
      coverage_details: "",
      valid_from: new Date().toISOString().split("T")[0],
      valid_until: new Date().toISOString().split("T")[0],
      claim_limit: "",
    });
    setOpenDialog(true);
  };

  const handleSaveInsurance = async () => {
    const response = await fetch(`${apiUrl}/add-insurance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newInsurance),
    });
    const result = await response.json();
    if (response.status !== 200) {
      console.error("Error adding insurance:", result);
      setErrorMsg("Failed to add insurance");
      return;
    }
    setInsuranceList([...insuranceList, result.insurance]);
    setOpenDialog(false);
  };

  const handleDeleteInsurance = async (index) => {
    const response = await fetch(`${apiUrl}/delete-insurance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ policy_number: insuranceList[index].policy_number }),
    });

    if (response.status !== 200) {
      console.error("Error deleting insurance");
      return;
    }
    const updated = insuranceList.filter((_, i) => i !== index);
    setInsuranceList(updated);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar isMini />
      <MDBox py={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h2">Insurance</Typography>
        </MDBox>

        <Grid container spacing={3}>
          {insuranceList.map((insurance, index) => (
            <Grid item xs={12} sm={6} md={4} key={insurance.policy_number}>
              <Card sx={{ p: 2 }}>
                <MDBox display="flex" justifyContent="space-between">
                  <Typography variant="h4">{insurance.policy_number}</Typography>
                  <IconButton onClick={() => handleDeleteInsurance(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </MDBox>
                <MDBox mt={2}>
                  <Typography><strong>Provider:</strong> {insurance.provider_name}</Typography>
                  <Typography><strong>Coverage:</strong> {insurance.coverage_details}</Typography>
                  <Typography><strong>Valid From:</strong> {insurance.valid_from}</Typography>
                  <Typography><strong>Valid Until:</strong> {insurance.valid_until}</Typography>
                  <Typography><strong>Claim Limit:</strong> ₹{insurance.claim_limit}</Typography>
                </MDBox>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              onClick={handleAddInsurance}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                minHeight: "200px",
                border: "2px dashed",
                borderColor: "text.secondary",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
              <AddIcon sx={{ fontSize: 48, color: "text.secondary" }} />
              <Typography variant="h6" color="text.secondary">
                Add New Insurance
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Insurance</DialogTitle>
          <DialogContent>
            <MDBox component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Policy Number"
                    name="policy_number"
                    fullWidth
                    value={newInsurance.policy_number}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Provider Name"
                    name="provider_name"
                    fullWidth
                    value={newInsurance.provider_name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Coverage Details"
                    name="coverage_details"
                    fullWidth
                    multiline
                    rows={3}
                    value={newInsurance.coverage_details}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Valid From"
                    name="valid_from"
                    type="date"
                    fullWidth
                    value={newInsurance.valid_from}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Valid Until"
                    name="valid_until"
                    type="date"
                    fullWidth
                    value={newInsurance.valid_until}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Claim Limit (₹)"
                    name="claim_limit"
                    fullWidth
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={newInsurance.claim_limit}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
              </Grid>
            </MDBox>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} startIcon={<CancelIcon />}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveInsurance}
              startIcon={<SaveIcon />}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </MDBox>
    </DashboardLayout>
  );
}

export default Insurance;
