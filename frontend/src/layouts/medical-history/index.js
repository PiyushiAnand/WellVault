import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../config/config.js";
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

function MedicalHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newRecord, setNewRecord] = useState({
    date : new Date().toISOString().split('T')[0],
    hospital_name: "",
    diagnosis: ""
  });

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await fetch(`${apiUrl}/medical-history`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error("Failed to fetch medical history");
        }
        const data = await response.json();
        setHistory(data.data);
      } catch (error) {
        console.error("Error fetching medical history:", error);
      }
    };

    fetchMedicalHistory();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRecord = () => {
    setNewRecord({
      date : new Date().toISOString().split('T')[0],
      hospital_name: "",
      diagnosis: ""
    });
    setEditingIndex(null);
    setOpenDialog(true);
  };

  const handleEditRecord = (index) => {
    setNewRecord(history[index]);
    setEditingIndex(index);
    setOpenDialog(true);
  };

  const handleSaveRecord = async() => {
    if (editingIndex !== null) {

      const response = await fetch(`${apiUrl}/update-medical-history`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newRecord)
      });
      const res = await response.json();
      if (!response.ok) {
        throw new Error("Failed to update medical history");
      }
      // Update the history state with the new record
      const updated = [...history];
      updated[editingIndex] = newRecord;
      setHistory(updated);
    } else {

      const response = await fetch(`${apiUrl}/add-medical-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newRecord)
      });
      const res = await response.json();
      if (!response.ok) {
        throw new Error("Failed to update medical history");
      }
      setHistory([...history, res.record]);
    }
    setOpenDialog(false);
  };

  const handleDeleteRecord = (index) => {

    const recordToDelete = history[index];
    fetch(`${apiUrl}/delete-medical-history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({record: recordToDelete})
    })
    
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar isMini />
      <MDBox py={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h2">Medical History</Typography>
          <MDButton variant="gradient" color="info" onClick={handleAddRecord}>
            <AddIcon /> Add Record
          </MDButton>
        </MDBox>

        <Grid container spacing={3}>
          {history.map((record, index) => (
            <Grid item xs={12} sm={6} md={4} key={record.date}>
              <Card sx={{ p: 2, height: "100%", position: "relative" }}>
                <MDBox display="flex" justifyContent="space-between">
                  <Typography variant="h4" gutterBottom>
                    {record.condition}
                  </Typography>
                  <MDBox>
                    <IconButton onClick={() => handleEditRecord(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteRecord(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </MDBox>
                </MDBox>
                
                <MDBox mt={2}>
                  <Typography variant="body1">
                    <strong> Date:</strong> {record.date}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Hospital:</strong> {record.hospital_name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Diagnosis</strong> {record.diagnosis}
                  </Typography>
                </MDBox>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={4}>
            <Card 
              onClick={handleAddRecord}
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
                Add New Record
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingIndex !== null ? "Edit Medical Record" : "Add New Medical Record"}
          </DialogTitle>
          <DialogContent>
            <MDBox component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Date"
                    name="date"
                    value={newRecord.date}
                    type = "date"
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
               
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Hospital Name"
                    name="hospital_name"
                    value={newRecord.hospital_name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Diagnosis"
                    name="diagnosis"
                    value={newRecord.diagnosis}
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
              onClick={handleSaveRecord} 
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

export default MedicalHistory;