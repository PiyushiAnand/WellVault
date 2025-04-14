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

function Vaccines() {
  const navigate = useNavigate();
  const [vaccines, setVaccines] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newVaccine, setNewVaccine] = useState({
    vaccineName: "",
    dateAdministered: new Date().toISOString().split('T')[0],
    nextDoseDate: "",
    administeredBy: "",
    location: "",
    notes: ""
  });

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const mockData = [
          {
            id: 1,
            vaccineName: "COVID-19 Booster",
            dateAdministered: "2023-03-15",
            nextDoseDate: "2023-09-15",
            administeredBy: "Dr. Patel",
            location: "City Health Center",
            notes: "No side effects"
          },
          {
            id: 2,
            vaccineName: "Flu Shot",
            dateAdministered: "2022-10-10",
            nextDoseDate: "2023-10-10",
            administeredBy: "Nurse Johnson",
            location: "Local Pharmacy",
            notes: "Mild soreness"
          }
        ];
        setVaccines(mockData);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
      }
    };

    fetchVaccines();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccine(prev => ({ ...prev, [name]: value }));
  };

  const handleAddVaccine = () => {
    setNewVaccine({
      vaccineName: "",
      dateAdministered: new Date().toISOString().split('T')[0],
      nextDoseDate: "",
      administeredBy: "",
      location: "",
      notes: ""
    });
    setEditingIndex(null);
    setOpenDialog(true);
  };

  const handleEditVaccine = (index) => {
    setNewVaccine(vaccines[index]);
    setEditingIndex(index);
    setOpenDialog(true);
  };

  const handleSaveVaccine = () => {
    if (editingIndex !== null) {
      const updated = [...vaccines];
      updated[editingIndex] = newVaccine;
      setVaccines(updated);
    } else {
      setVaccines([...vaccines, { ...newVaccine, id: Date.now() }]);
    }
    setOpenDialog(false);
  };

  const handleDeleteVaccine = (index) => {
    const updated = vaccines.filter((_, i) => i !== index);
    setVaccines(updated);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar isMini />
      <MDBox py={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h2">Vaccines</Typography>
          <MDButton variant="gradient" color="info" onClick={handleAddVaccine}>
            <AddIcon /> Add Vaccine
          </MDButton>
        </MDBox>

        <Grid container spacing={3}>
          {vaccines.map((vaccine, index) => (
            <Grid item xs={12} sm={6} md={4} key={vaccine.id}>
              <Card sx={{ p: 2, height: "100%", position: "relative" }}>
                <MDBox display="flex" justifyContent="space-between">
                  <Typography variant="h4" gutterBottom>
                    {vaccine.vaccineName}
                  </Typography>
                  <MDBox>
                    <IconButton onClick={() => handleEditVaccine(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteVaccine(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </MDBox>
                </MDBox>
                
                <MDBox mt={2}>
                  <Typography variant="body1">
                    <strong>Date Administered:</strong> {vaccine.dateAdministered}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Next Dose Date:</strong> {vaccine.nextDoseDate}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Administered By:</strong> {vaccine.administeredBy}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Location:</strong> {vaccine.location}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Notes:</strong> {vaccine.notes}
                  </Typography>
                </MDBox>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={4}>
            <Card 
              onClick={handleAddVaccine}
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
                Add New Vaccine
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingIndex !== null ? "Edit Vaccine" : "Add New Vaccine"}
          </DialogTitle>
          <DialogContent>
            <MDBox component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Vaccine Name"
                    name="vaccineName"
                    value={newVaccine.vaccineName}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date Administered"
                    name="dateAdministered"
                    type="date"
                    value={newVaccine.dateAdministered}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Next Dose Date"
                    name="nextDoseDate"
                    type="date"
                    value={newVaccine.nextDoseDate}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Administered By"
                    name="administeredBy"
                    value={newVaccine.administeredBy}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={newVaccine.location}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    name="notes"
                    value={newVaccine.notes}
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
              onClick={handleSaveVaccine} 
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

export default Vaccines;