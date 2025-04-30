import React, { useState, useEffect } from "react";
import {
  Box, Card, Grid, TextField, Button, Snackbar, Alert, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Divider,
  MenuItem, Select, FormControl, InputLabel, CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { apiUrl } from "../../config/config";

function VerifyInsurance() {
  const [policies, setPolicies] = useState([]);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [search, setSearch] = useState({ policy_number: "", provider_name: "" });
  const [newPolicy, setNewPolicy] = useState({
    policy_number: "", provider_name: "", coverage_details: "",
    valid_from: "", valid_until: "", amount: ""
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [availDialog, setAvailDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [verifiedPolicy, setVerifiedPolicy] = useState(null);
  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    fetchPolicies();
    fetchAvailablePlans();
  }, []);

  const fetchPolicies = async () => {
    try {
      const res = await fetch(`${apiUrl}/insurance`, { credentials: "include" });
      const record = await res.json();
      setPolicies(record.record || []);
    } catch (err) {
      showSnackbar("Error loading policies", "error");
    }
  };
  const fetchAvailablePlans = async () => {
  
    try {
      const res = await fetch(`${apiUrl}/insurance/available-policies`);
      const data = await res.json();
      if (!Array.isArray(data.policies)) {
        throw new Error("Invalid response structure");
      }
      setAvailablePlans(data.policies);
      console.log(data.policies);
    } catch (err) {
      console.error(err);
      showSnackbar("Error loading plans", "error");
      setAvailablePlans([]);
    }
   
  };

  const handleVerify = async () => {
    try {
      if (!search.policy_number || !search.provider_name) {
        showSnackbar("Please fill both fields", "warning");
        return;
      }

      const verifyRes = await fetch(`${apiUrl}/insurance/verify-policy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(search),
        credentials: "include",
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        showSnackbar(verifyData.message || "Policy not found", "error");
        return;
      }
     setVerifiedPolicy(verifyData);
    } catch (err) {
      showSnackbar("Network error", "error");
    }
  };

  const handleAddPolicy = async () => {
    try {
      const requiredFields = ['policy_number', 'provider_name', 'valid_from', 'valid_until'];
      const missing = requiredFields.filter(field => !newPolicy[field]);

      if (missing.length > 0) {
        showSnackbar(`Missing: ${missing.join(', ')}`, "warning");
        return;
      }

      if (new Date(newPolicy.valid_until) < new Date(newPolicy.valid_from)) {
        showSnackbar("End date must be after start date", "warning");
        return;
      }

      const res = await fetch(`${apiUrl}/insurance/add-policy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPolicy),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Save failed");

      setOpenDialog(false);
      await fetchPolicies();
      showSnackbar("Policy saved", "success");
    } catch (err) {
      showSnackbar(err.message, "error");
    }
  };

  const handleDelete = async (policy) => {
    try {
      const res = await fetch(`${apiUrl}/insurance/delete-policy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(policy),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Delete failed");

      await fetchPolicies();
      showSnackbar("Policy deleted", "success");
    } catch (err) {
      showSnackbar(err.message, "error");
    }
  };

  const handleAvailPlan = async () => {
    try {
      if (!selectedPlan || !amount) {
        showSnackbar("Please select plan and enter amount", "warning");
        return;
      }

      const res = await fetch(`${apiUrl}/insurance/avail-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policy_name: selectedPlan, amount }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to avail plan");

      setAvailDialog(false);
      await fetchPolicies();
      showSnackbar("Plan activated!", "success");
    } catch (err) {
      showSnackbar(err.message, "error");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
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
                value={search.policy_number}
                onChange={(e) => setSearch({ ...search, policy_number: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Provider Name"
                name="provider_name"
                fullWidth
                value={search.provider_name}
                onChange={(e) => setSearch({ ...search, provider_name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="contained" color="primary" fullWidth onClick={handleVerify}>
                Access Policy Details
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <MDBox textAlign="center" display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={() => setOpenDialog(true)} startIcon={<AddIcon />}>
              Add External Policy
            </Button>
            <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          fetchAvailablePlans();
          setAvailDialog(true);
        }}
      >
        Avail New Plan
      </Button>
          </MDBox>
        </Card>

        <Grid container spacing={3}>
          {policies.map((policy) => (
            <Grid item xs={12} sm={6} md={4} key={policy.policy_number}>
              <Card sx={{ p: 2, height: "100%" }}>
                <MDBox display="flex" justifyContent="space-between">
                  <Typography variant="h6">{policy.provider_name}</Typography>
                  <IconButton onClick={() => handleDelete(policy)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </MDBox>
                <MDBox mt={2}>
                  <Typography>Policy #: {policy.policy_number}</Typography>
                  <Typography>Amount: ₹{policy.amount}</Typography>
                  <Typography>Start: {new Date(policy.valid_from).toLocaleDateString()}</Typography>
                  <Typography>End: {new Date(policy.valid_until).toLocaleDateString()}</Typography>
                  <Typography>Coverage: {policy.coverage_details}</Typography>
                </MDBox>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add External Policy Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add External Policy</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Policy Number *"
                  fullWidth
                  value={newPolicy.policy_number}
                  onChange={(e) => setNewPolicy({ ...newPolicy, policy_number: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Provider Name *"
                  fullWidth
                  value={newPolicy.provider_name}
                  onChange={(e) => setNewPolicy({ ...newPolicy, provider_name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date *"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={newPolicy.valid_from}
                  onChange={(e) => setNewPolicy({ ...newPolicy, valid_from: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date *"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={newPolicy.valid_until}
                  onChange={(e) => setNewPolicy({ ...newPolicy, valid_until: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Coverage Details"
                  multiline
                  rows={3}
                  fullWidth
                  value={newPolicy.coverage_details}
                  onChange={(e) => setNewPolicy({ ...newPolicy, coverage_details: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount"
                  type="number"
                  fullWidth
                  value={newPolicy.amount}
                  onChange={(e) => setNewPolicy({ ...newPolicy, amount: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAddPolicy}>Save Policy</Button>
          </DialogActions>
        </Dialog>
          {verifiedPolicy && (
          <Card sx={{ mt: 3, p: 2, backgroundColor: "#f0f0f0" }}>
            <Typography variant="h5" gutterBottom>
              ✅ Verified Policy Details
            </Typography>
            <Typography><strong>Provider:</strong> {verifiedPolicy.provider_name}</Typography>
            <Typography><strong>Policy number:</strong> {verifiedPolicy.policy_number}</Typography>
            <Typography><strong>Amount:</strong> ₹{verifiedPolicy.amount}</Typography>
            <Typography><strong>Coverage:</strong> {verifiedPolicy.coverage_details}</Typography>
            <Typography><strong>Valid From:</strong> {new Date(verifiedPolicy.valid_from).toLocaleDateString()}</Typography>
            <Typography><strong>Valid Until:</strong> {new Date(verifiedPolicy.valid_until).toLocaleDateString()}</Typography>
          </Card>
        )}
          {availDialog && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>Available Insurance Plans</Typography>
           (
            <CircularProgress />
          ) : availablePlans.length === 0 ? (
            <Typography>No plans available at the moment.</Typography>
          ) : (
            <Grid container spacing={2}>
              {availablePlans.map((plan, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card variant="outlined" sx={{ p: 2, height: "100%" }}>
                    <Typography variant="h6">{plan.policy_name}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {plan.provider_name}
                    </Typography>
                    <Typography><strong>Coverage:</strong> {plan.coverage_details}</Typography>
                    <Typography><strong>Duration:</strong> {plan.duration} months</Typography>
                    <Typography><strong>Claim Limit:</strong> ₹{plan.claim_limit}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )
        </Box>
      )}



        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </MDBox>
    </DashboardLayout>
  );
}

export default VerifyInsurance;
