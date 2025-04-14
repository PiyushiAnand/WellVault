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

// Layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Prescriptions() {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newPrescription, setNewPrescription] = useState({
    medicineName: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    prescribedDate: new Date().toISOString().split('T')[0]
  });

  // Fetch prescriptions from API
  useEffect(() => {
    // This would be replaced with actual API call
    const fetchPrescriptions = async () => {
      try {
        // Mock data - replace with actual API call
        const mockData = [
          {
            id: 1,
            medicineName: "Amoxicillin",
            dosage: "500mg",
            frequency: "Twice daily",
            duration: "7 days",
            instructions: "Take with food",
            prescribedDate: "2023-05-15"
          },
          {
            id: 2,
            medicineName: "Ibuprofen",
            dosage: "200mg",
            frequency: "As needed",
            duration: "30 days",
            instructions: "Take with water",
            prescribedDate: "2023-05-10"
          }
        ];
        setPrescriptions(mockData);
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
      medicineName: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
      prescribedDate: new Date().toISOString().split('T')[0]
    });
    setEditingIndex(null);
    setOpenDialog(true);
  };

  const handleEditPrescription = (index) => {
    setNewPrescription(prescriptions[index]);
    setEditingIndex(index);
    setOpenDialog(true);
  };

  const handleSavePrescription = () => {
    if (editingIndex !== null) {
      // Update existing prescription
      const updated = [...prescriptions];
      updated[editingIndex] = newPrescription;
      setPrescriptions(updated);
    } else {
      // Add new prescription
      setPrescriptions([...prescriptions, { ...newPrescription, id: Date.now() }]);
    }
    setOpenDialog(false);
  };

  const handleDeletePrescription = (index) => {
    const updated = prescriptions.filter((_, i) => i !== index);
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
            <Grid item xs={12} sm={6} md={4} key={prescription.id}>
              <Card sx={{ p: 2, height: "100%", position: "relative" }}>
                <MDBox display="flex" justifyContent="space-between">
                  <Typography variant="h4" gutterBottom>
                    {prescription.medicineName}
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
                    <strong>Frequency:</strong> {prescription.frequency}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Duration:</strong> {prescription.duration}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Instructions:</strong> {prescription.instructions}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Prescribed on: {prescription.prescribedDate}
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
                    name="medicineName"
                    value={newPrescription.medicineName}
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
                    label="Frequency (e.g., Twice daily)"
                    name="frequency"
                    value={newPrescription.frequency}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Duration (e.g., 7 days)"
                    name="duration"
                    value={newPrescription.duration}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Prescribed Date"
                    name="prescribedDate"
                    type="date"
                    value={newPrescription.prescribedDate}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Special Instructions"
                    name="instructions"
                    value={newPrescription.instructions}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
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