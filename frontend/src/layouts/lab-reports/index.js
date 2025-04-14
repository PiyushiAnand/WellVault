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

function LabReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newReport, setNewReport] = useState({
    testName: "",
    testDate: new Date().toISOString().split('T')[0],
    labName: "",
    doctor: "",
    results: "",
    notes: ""
  });

  useEffect(() => {
    const fetchLabReports = async () => {
      try {
        const mockData = [
          {
            id: 1,
            testName: "Complete Blood Count",
            testDate: "2023-05-20",
            labName: "City Diagnostics",
            doctor: "Dr. Smith",
            results: "Normal range",
            notes: "Follow up in 6 months"
          },
          {
            id: 2,
            testName: "Lipid Panel",
            testDate: "2023-04-15",
            labName: "Health Labs",
            doctor: "Dr. Johnson",
            results: "Cholesterol slightly elevated",
            notes: "Diet recommended"
          }
        ];
        setReports(mockData);
      } catch (error) {
        console.error("Error fetching lab reports:", error);
      }
    };

    fetchLabReports();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport(prev => ({ ...prev, [name]: value }));
  };

  const handleAddReport = () => {
    setNewReport({
      testName: "",
      testDate: new Date().toISOString().split('T')[0],
      labName: "",
      doctor: "",
      results: "",
      notes: ""
    });
    setEditingIndex(null);
    setOpenDialog(true);
  };

  const handleEditReport = (index) => {
    setNewReport(reports[index]);
    setEditingIndex(index);
    setOpenDialog(true);
  };

  const handleSaveReport = () => {
    if (editingIndex !== null) {
      const updated = [...reports];
      updated[editingIndex] = newReport;
      setReports(updated);
    } else {
      setReports([...reports, { ...newReport, id: Date.now() }]);
    }
    setOpenDialog(false);
  };

  const handleDeleteReport = (index) => {
    const updated = reports.filter((_, i) => i !== index);
    setReports(updated);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar isMini />
      <MDBox py={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h2">Lab Reports</Typography>
          <MDButton variant="gradient" color="info" onClick={handleAddReport}>
            <AddIcon /> Add Report
          </MDButton>
        </MDBox>

        <Grid container spacing={3}>
          {reports.map((report, index) => (
            <Grid item xs={12} sm={6} md={4} key={report.id}>
              <Card sx={{ p: 2, height: "100%", position: "relative" }}>
                <MDBox display="flex" justifyContent="space-between">
                  <Typography variant="h4" gutterBottom>
                    {report.testName}
                  </Typography>
                  <MDBox>
                    <IconButton onClick={() => handleEditReport(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteReport(index)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </MDBox>
                </MDBox>
                
                <MDBox mt={2}>
                  <Typography variant="body1">
                    <strong>Test Date:</strong> {report.testDate}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Lab Name:</strong> {report.labName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Doctor:</strong> {report.doctor}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Results:</strong> {report.results}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Notes:</strong> {report.notes}
                  </Typography>
                </MDBox>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={4}>
            <Card 
              onClick={handleAddReport}
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
                Add New Report
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingIndex !== null ? "Edit Lab Report" : "Add New Lab Report"}
          </DialogTitle>
          <DialogContent>
            <MDBox component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Test Name"
                    name="testName"
                    value={newReport.testName}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Test Date"
                    name="testDate"
                    type="date"
                    value={newReport.testDate}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Lab Name"
                    name="labName"
                    value={newReport.labName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Doctor"
                    name="doctor"
                    value={newReport.doctor}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Results"
                    name="results"
                    value={newReport.results}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    name="notes"
                    value={newReport.notes}
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
              onClick={handleSaveReport} 
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

export default LabReports;