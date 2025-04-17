import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  DialogActions
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { apiUrl } from "../../config/config.js";
// Layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Prescriptions() {
  const navigate = useNavigate();
  const [oname,setOname] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newPrescription, setNewPrescription] = useState({
    medication_name: "",
    dosage: "",
    start_date: new Date().toISOString().split('T')[0],
    end_date:  new Date().toISOString().split('T')[0],
    prescribing_doc:""
  });

  // Fetch prescriptions from API
  useEffect(() => {
    // This would be replaced with actual API call
    const fetchPrescriptions = async () => {
      try {
        // Mock data - replace with actual API call
        const response = await fetch(`${apiUrl}/ongoing-medication`, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        if (response.status === 401) {
          navigate("/");
        }
        if (response.status !== 200) {
          console.error("Error fetching prescriptions:", result);
        }
        setPrescriptions(Array.isArray(result.meds) ? result.meds : []);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPrescription = () => {
    setNewPrescription({
      medication_name: "",
      dosage: "",
      start_date: new Date().toISOString().split('T')[0],
      end_date:  new Date().toISOString().split('T')[0],
      prescribing_doc:""
    });
    setEditingIndex(null);
    setOpenDialog(true);
  };

  const handleEditPrescription = (index) => {
    setNewPrescription(prescriptions[index]);
    setOname(prescriptions[index].medication_name);
    setEditingIndex(index);
    setOpenDialog(true);
  };

  const handleSavePrescription = async() => {
    if (editingIndex !== null) {

      //send a put request to update the prescription
      const response = await fetch(`${apiUrl}/update-medication`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({oname,newMedication: newPrescription}),
      });
      const result = await response.json();
      if (response.status === 401) {
        navigate("/");
      }
      if (response.status !== 200) {
        console.error("Error updating prescription:", result);
      }
      // Update existing prescription
      const updated = [...prescriptions];
      updated[editingIndex] = newPrescription;
      setPrescriptions(updated);
    } else {
      // Add new prescription
      const response = await fetch(`${apiUrl}/add-medication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newPrescription),
      });
      const result = await response.json();
      if (response.status === 401) {
        navigate("/");
      }
      if (response.status !== 200) {
        console.error("Error adding prescription:", result);
      }
      setPrescriptions([...prescriptions, result.med]);
    }
    setOpenDialog(false);
  };

  const handleDeletePrescription = async(index) => {
    const updated = prescriptions.filter((_, i) => i !== index);
    //send a delete request to delete the prescription
    const response = fetch(`${apiUrl}/delete-medication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({medication:prescriptions[index]}),
    });
    if (response.status === 401) {
      navigate("/");
    }
    if (response.status !== 200) {
      console.error("Error deleting prescription");
    }
    // Update state
    setPrescriptions(updated);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar isMini />
      <MDBox py={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h2">Prescriptions</Typography>
          <MDButton variant="gradient" color="info" onClick={handleAddPrescription}>
            <AddIcon /> Add Prescription
          </MDButton>
        </MDBox>

        <Grid container spacing={3}>
          {/* Existing Prescriptions */}
          {prescriptions.map((prescription, index) => (
            <Grid item xs={12} sm={6} md={4} key={prescription.medication_name||index}>
              <Card sx={{ p: 2, height: "100%", position: "relative" }}>
                <MDBox display="flex" justifyContent="space-between">
                  <Typography variant="h4" gutterBottom>
                    {prescription.medication_name}
                  </Typography>
                  <MDBox>
                    <IconButton onClick={() => handleEditPrescription(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeletePrescription(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </MDBox>
                </MDBox>
                
                <MDBox mt={2}>
                  <Typography variant="body1">
                    <strong>Dosage:</strong> {prescription.dosage}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Start Date:</strong> {prescription.start_date}
                  </Typography>
                  <Typography variant="body1">
                    <strong>End Date:</strong> {prescription.end_date}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Prescribing Doc:</strong> {prescription.prescribing_doc}
                  </Typography>
                </MDBox>
              </Card>
            </Grid>
          ))}

          {/* Add New Card (now appears after existing prescriptions) */}
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              onClick={handleAddPrescription}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "200px",
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6
                },
                border: "2px dashed",
                borderColor: "text.secondary"
              }}
            >
              <AddIcon sx={{ fontSize: 48, color: "text.secondary" }} />
              <Typography variant="h6" color="text.secondary">
                Add New Prescription
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Add/Edit Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingIndex !== null ? "Edit Prescription" : "Add New Prescription"}
          </DialogTitle>
          <DialogContent>
            <MDBox component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Medicine Name"
                    name="medication_name"
                    value={newPrescription.medication_name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Dosage (e.g., 500mg)"
                    name="dosage"
                    value={newPrescription.dosage}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    name="start_date"
                    type="date"
                    value={newPrescription.start_date}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    name="end_date"
                    type="date"
                    value={newPrescription.end_date}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Prescribing Doctor"
                    name="prescribing_doc"
                    value={newPrescription.prescribing_doc}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Special Instructions"
                    name="instructions"
                    value={newPrescription.instructions}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                  />
                </Grid> */}
              </Grid>
            </MDBox>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} startIcon={<CancelIcon />}>
              Cancel
            </Button>
            <Button 
              onClick={handleSavePrescription} 
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

export default Prescriptions;