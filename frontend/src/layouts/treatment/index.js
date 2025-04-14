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

function OngoingTreatments() {
  const navigate = useNavigate();
  const [treatments, setTreatments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newTreatment, setNewTreatment] = useState({
    treatmentName: "",
    doctor: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    description: "",
    status: "Ongoing"
  });

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const mockData = [
          {
            id: 1,
            treatmentName: "Physical Therapy",
            doctor: "Dr. Smith",
            startDate: "2023-04-10",
            endDate: "2023-07-10",
            description: "For knee rehabilitation",
            status: "Ongoing"
          },
          {
            id: 2,
            treatmentName: "Psychotherapy",
            doctor: "Dr. Johnson",
            startDate: "2023-01-15",
            endDate: "2023-12-15",
            description: "Weekly sessions",
            status: "Ongoing"
          }
        ];
        setTreatments(mockData);
      } catch (error) {
        console.error("Error fetching treatments:", error);
      }
    };

    fetchTreatments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTreatment(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTreatment = () => {
    setNewTreatment({
      treatmentName: "",
      doctor: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
      description: "",
      status: "Ongoing"
    });
    setEditingIndex(null);
    setOpenDialog(true);
  };

  const handleEditTreatment = (index) => {
    setNewTreatment(treatments[index]);
    setEditingIndex(index);
    setOpenDialog(true);
  };

  const handleSaveTreatment = () => {
    if (editingIndex !== null) {
      const updated = [...treatments];
      updated[editingIndex] = newTreatment;
      setTreatments(updated);
    } else {
      setTreatments([...treatments, { ...newTreatment, id: Date.now() }]);
    }
    setOpenDialog(false);
  };

  const handleDeleteTreatment = (index) => {
    const updated = treatments.filter((_, i) => i !== index);
    setTreatments(updated);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar isMini />
      <MDBox py={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h2">Ongoing Treatments</Typography>
          <MDButton variant="gradient" color="info" onClick={handleAddTreatment}>
            <AddIcon /> Add Treatment
          </MDButton>
        </MDBox>

        <Grid container spacing={3}>
          {treatments.map((treatment, index) => (
            <Grid item xs={12} sm={6} md={4} key={treatment.id}>
              <Card sx={{ p: 2, height: "100%", position: "relative" }}>
                <MDBox display="flex" justifyContent="space-between">
                  <Typography variant="h4" gutterBottom>
                    {treatment.treatmentName}
                  </Typography>
                  <MDBox>
                    <IconButton onClick={() => handleEditTreatment(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTreatment(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </MDBox>
                </MDBox>
                
                <MDBox mt={2}>
                  <Typography variant="body1">
                    <strong>Doctor:</strong> {treatment.doctor}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Start Date:</strong> {treatment.startDate}
                  </Typography>
                  <Typography variant="body1">
                    <strong>End Date:</strong> {treatment.endDate}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Status:</strong> {treatment.status}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Description:</strong> {treatment.description}
                  </Typography>
                </MDBox>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={4}>
            <Card 
              onClick={handleAddTreatment}
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
                Add New Treatment
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingIndex !== null ? "Edit Treatment" : "Add New Treatment"}
          </DialogTitle>
          <DialogContent>
            <MDBox component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Treatment Name"
                    name="treatmentName"
                    value={newTreatment.treatmentName}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Doctor"
                    name="doctor"
                    value={newTreatment.doctor}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Status"
                    name="status"
                    value={newTreatment.status}
                    onChange={handleInputChange}
                    select
                    SelectProps={{ native: true }}
                    required
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Paused">Paused</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={newTreatment.startDate}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={newTreatment.endDate}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={newTreatment.description}
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
              onClick={handleSaveTreatment} 
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

export default OngoingTreatments;