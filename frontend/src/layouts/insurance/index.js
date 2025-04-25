import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { apiUrl } from "../../config/config";

function VerifyInsurance() {
  const [policies, setPolicies] = useState([]);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [searchForm, setSearchForm] = useState({
    policy_number: "",
    provider_name: "",
  });
  const [editPolicy, setEditPolicy] = useState(null);
  const [newPolicy, setNewPolicy] = useState({
    policy_number: "",
    provider_name: "",
    coverage_details: "",
    valid_until: "",
    is_external: false,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [availDialog, setAvailDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  useEffect(() => {
    fetchPolicies();
    fetchAvailablePlans();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await fetch(`${apiUrl}/my-policies`, {
        credentials: "include"
      });
      const data = await response.json();
      if (response.ok) setPolicies(data);
    } catch (error) {
      showSnackbar("Error loading policies", "error");
    }
  };

  const fetchAvailablePlans = async () => {
    try {
      const response = await fetch(`${apiUrl}/available-plans`);
      const data = await response.json();
      if (response.ok) setAvailablePlans(data);
    } catch (error) {
      showSnackbar("Error loading plans", "error");
    }
  };

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSearchChange = (e) => {
    setSearchForm({ ...searchForm, [e.target.name]: e.target.value });
  };

  const handlePolicyChange = (e) => {
    const { name, value } = e.target;
    setNewPolicy(prev => ({
      ...prev,
      [name]: name === 'valid_until' ? value.split('T')[0] : value
    }));
  };

  const handleVerify = async () => {
    try {
      const response = await fetch(`${apiUrl}/verify-policy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchForm),
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        await fetchPolicies();
        showSnackbar("Policy verified and added!", "success");
      } else {
        showSnackbar(result.message || "Verification failed", "error");
      }
    } catch (error) {
      showSnackbar("Server error occurred", "error");
    }
  };

  // Add External Policy Handlers
  const handleAddPolicy = () => {
    setOpenDialog(true);
    setNewPolicy({
      policy_number: "",
      provider_name: "",
      coverage_details: "",
      valid_until: "",
      is_external: true,
    });
  };

  const handleSavePolicy = async () => {
    if (!newPolicy.policy_number || !newPolicy.provider_name) {
      showSnackbar("Policy number and provider name are required", "warning");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/add-policy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPolicy),
        credentials: "include",
      });

      if (response.ok) {
        await fetchPolicies();
        setOpenDialog(false);
        showSnackbar("Policy added successfully", "success");
      }
    } catch (error) {
      showSnackbar("Error saving policy", "error");
    }
  };

  // Edit Policy Handlers
  const handleEdit = (index) => {
    setEditPolicy(index);
    setNewPolicy(policies[index]);
    setOpenDialog(true);
  };

  const handleUpdatePolicy = async () => {
    if (!newPolicy.policy_number || !newPolicy.provider_name) {
      showSnackbar("Policy number and provider name are required", "warning");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/update-policy/${policies[editPolicy].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPolicy),
        credentials: "include",
      });

      if (response.ok) {
        await fetchPolicies();
        setOpenDialog(false);
        showSnackbar("Policy updated successfully", "success");
      }
    } catch (error) {
      showSnackbar("Error updating policy", "error");
    }
  };

  // Delete Policy Handler
  const handleDelete = async (index) => {
    try {
      const response = await fetch(`${apiUrl}/delete-policy/${policies[index].id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        await fetchPolicies();
        showSnackbar("Policy removed successfully", "success");
      }
    } catch (error) {
      showSnackbar("Error deleting policy", "error");
    }
  };

  // Avail Plan Handlers
  const handleAvailPlan = async () => {
    try {
      const response = await fetch(`${apiUrl}/avail-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan_id: selectedPlan }),
        credentials: "include",
      });

      if (response.ok) {
        await fetchPolicies();
        setAvailDialog(false);
        showSnackbar("Plan availed successfully", "success");
      }
    } catch (error) {
      showSnackbar("Error availing plan", "error");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* Search Section */}
        <Card sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            🔍 Search Insurance Policy
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Policy Number"
                name="policy_number"
                fullWidth
                value={searchForm.policy_number}
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Provider Name"
                name="provider_name"
                fullWidth
                value={searchForm.provider_name}
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="contained" color="primary" fullWidth onClick={handleVerify}>
                Verify Policy
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <MDBox textAlign="center" display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleAddPolicy} startIcon={<AddIcon />}>
              Add External Policy
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setAvailDialog(true)}>
              Avail New Plan
            </Button>
          </MDBox>
        </Card>

        {/* Policies Grid */}
        <Grid container spacing={3}>
          {policies.map((policy, index) => (
            <Grid item xs={12} sm={6} md={4} key={policy.id}>
              <Card sx={{ p: 2, height: "100%" }}>
                <MDBox display="flex" justifyContent="space-between">
                  <Typography variant="h6">{policy.provider_name}</Typography>
                  <MDBox>
                    <IconButton onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </MDBox>
                </MDBox>

                <MDBox mt={2}>
                  <Typography>Policy #: {policy.policy_number}</Typography>
                  <Typography>Valid Until: {policy.valid_until}</Typography>
                  <Typography>Coverage: {policy.coverage_details}</Typography>
                  {policy.is_external && (
                    <Chip label="External" color="warning" size="small" sx={{ mt: 1 }} />
                  )}
                </MDBox>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add/Edit Policy Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editPolicy !== null ? "Edit Insurance Policy" : "Add New Insurance Policy"}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Policy Number *"
                  name="policy_number"
                  fullWidth
                  value={newPolicy.policy_number}
                  onChange={handlePolicyChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Provider Name *"
                  name="provider_name"
                  fullWidth
                  value={newPolicy.provider_name}
                  onChange={handlePolicyChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Coverage Details"
                  name="coverage_details"
                  fullWidth
                  multiline
                  rows={3}
                  value={newPolicy.coverage_details}
                  onChange={handlePolicyChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Valid Until"
                  name="valid_until"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={newPolicy.valid_until}
                  onChange={handlePolicyChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={editPolicy !== null ? handleUpdatePolicy : handleSavePolicy}
            >
              {editPolicy !== null ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Avail Plan Dialog */}
        <Dialog open={availDialog} onClose={() => setAvailDialog(false)}>
          <DialogTitle>Select Insurance Plan</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Available Plans</InputLabel>
              <Select
                value={selectedPlan}
                label="Available Plans"
                onChange={(e) => setSelectedPlan(e.target.value)}
              >
                {availablePlans.map((plan) => (
                  <MenuItem key={plan.id} value={plan.id}>
                    {plan.provider_name} - {plan.coverage_details} (${plan.claim_limit})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAvailDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAvailPlan}>
              Avail Plan
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={handleCloseSnackbar}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </MDBox>
    </DashboardLayout>
  );
}

export default VerifyInsurance;