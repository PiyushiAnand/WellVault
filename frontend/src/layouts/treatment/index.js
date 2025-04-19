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
  DialogActions,
  MenuItem, 
  Select, 
  InputLabel,
  FormControl
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { apiUrl } from "../../config/config.js";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Treatments() {
  const navigate = useNavigate();
  const [treatments, setTreatments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [originalName, setOriginalName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [newTreatment, setNewTreatment] = useState({
    treatment_name: "",
    doctor: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    status: "",
    description: "",
  });

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch(`${apiUrl}/ongoing-treatment`, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        //if (response.status === 401) navigate("/");
        if (response.status !== 200) {
          console.error("Error fetching treatments:", result);
        }
        setTreatments(Array.isArray(result.treatments) ? result.treatments : []);
      } catch (error) {
        console.error("Error fetching treatments:", error);
      }
    };
    fetchTreatments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTreatment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTreatment = () => {
    setNewTreatment({
      treatment_name: "",
      doctor: "",
      start_date: new Date().toISOString().split("T")[0],
      end_date: new Date().toISOString().split("T")[0],
      status: "",
      description: "",
    });
    setEditingIndex(null);
    setOpenDialog(true);
  };

  const handleEditTreatment = (index) => {
    setNewTreatment(treatments[index]);
    setOriginalName(treatments[index].treatment_name);
    setEditingIndex(index);
    setOpenDialog(true);
  };

  const handleSaveTreatment = async () => {
    if (editingIndex !== null) {
      const response = await fetch(`${apiUrl}/update-treatment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ oname: originalName, newTreatment }),
      });
      const result = await response.json();
    
      if (response.status !== 200) {
        console.error("Error updating treatment:", result);
        setErrorMsg("failed to update treatment");
      }
      
      const updated = [...treatments];
      updated[editingIndex] = newTreatment;
      setTreatments(updated);
    } else {
      const response = await fetch(`${apiUrl}/add-treatment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newTreatment),
      });
      const result = await response.json();
      if (response.status !== 200) {
        console.error("Error adding treatment:", result);
        setErrorMsg("failed to add treatment");
      }
      setTreatments([...treatments, result.treatment]);
    }
    setOpenDialog(false);
  };

  const handleDeleteTreatment = async (index) => {
    const response = await fetch(`${apiUrl}/delete-treatment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ treatment: treatments[index] }),
    });
   
   if (response.status !== 200) {
      console.error("Error deleting treatment");
    }
    const updated = treatments.filter((_, i) => i !== index);
    setTreatments(updated);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar isMini />
      <MDBox py={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h2">Treatments</Typography>
        </MDBox>

        <Grid container spacing={3}>
          {treatments.map((treatment, index) => (
            <Grid item xs={12} sm={6} md={4} key={treatment.treatment_name || index}>
              <Card sx={{ p: 2 }}>
                <MDBox display="flex" justifyContent="space-between">
                  <Typography variant="h4">{treatment.treatment_name}</Typography>
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
                  <Typography><strong>Doctor:</strong> {treatment.doctor}</Typography>
                  <Typography><strong>Start Date:</strong> {treatment.start_date}</Typography>
                  <Typography><strong>End Date:</strong> {treatment.end_date}</Typography>
                  <Typography><strong>Status:</strong> {treatment.status}</Typography>
                  <Typography><strong>Description:</strong> {treatment.description}</Typography>
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
                Add New Treatment
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editingIndex !== null ? "Edit Treatment" : "Add New Treatment"}</DialogTitle>
          <DialogContent>
            <MDBox component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Treatment Name"
                    name="treatment_name"
                    fullWidth
                    value={newTreatment.treatment_name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Doctor"
                    name="doctor"
                    fullWidth
                    value={newTreatment.doctor}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Start Date"
                    name="start_date"
                    type="date"
                    fullWidth
                    value={newTreatment.start_date}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="End Date"
                    name="end_date"
                    type="date"
                    fullWidth
                    value={newTreatment.end_date}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    name="status"
                    value={newTreatment.status}
                    onChange={handleInputChange}
                    label="Status"
                  >
                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                    <MenuItem value="Paused">Paused</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    multiline
                    rows={3}
                    value={newTreatment.description}
                    onChange={handleInputChange}
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

export default Treatments;
