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

function LabReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newReport, setNewReport] = useState({
    report_id: "",
    data: "",
    report_file: "",
  });

  useEffect(() => {
    const fetchLabReports = async () => {
      try {
        
        // Call the API to fetch lab reports
        const response = await fetch(`${apiUrl}/lab-reports`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 401) {
          navigate("/");
        }
        
        if (!response.ok) {
          throw new Error("Failed to fetch lab reports");
        }
        const data = await response.json();
        setReports(data.data);
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
      report_id: "",
      data: "",
      report_file: "",
    });
    setEditingIndex(null);
    setOpenDialog(true);
  };

  const handleEditReport = (index) => {
    setNewReport(reports[index]);
    setEditingIndex(index);
    setOpenDialog(true);
  };

  const handleSaveReport = async() => {

    const formData = new FormData();
    formData.append("report_id", newReport.report_id);
    formData.append("data", newReport.data);
    if (newReport.report_file) {
      formData.append("report_file", newReport.report_file); // this should be a File object
    }

    if (editingIndex !== null) {

        //call the api {apiUrl}/update-lab-reports to update the report
      const response = await fetch(`${apiUrl}/update-lab-report`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) {
        console.error("Error updating lab report");
      }
      else alert("Report updated successfully");
      const updated = [...reports];
      updated[editingIndex] = newReport;
      setReports(updated);
    } else {
      console.log("Adding new report");
      const response = await fetch(`${apiUrl}/add-lab-report`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      setReports([...reports, newReport]);
    }
    setOpenDialog(false);
  };

  const handleDeleteReport = async(index) => {
    const reportToDelete = reports[index];
    // Call the API to delete the report
    const response = await fetch(`${apiUrl}/delete-lab-report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ report: reportToDelete }),
      credentials: "include",
    });
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
            <Grid item xs={12} sm={6} md={4} key={report.report_id}>
              <Card sx={{ p: 2, height: "100%", position: "relative" }}>
                <MDBox display="flex" justifyContent="space-between">
                  <Typography variant="h4" gutterBottom>
                    {report.report_id}
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
                    <strong>Description:</strong> {report.data}
                  </Typography>
                  {report.report_file instanceof File && (
                    <Typography variant="body2">
                      <a
                        href={URL.createObjectURL(report.report_file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={report.report_file.name}
                      >
                        Download Report File
                      </a>
                    </Typography>
                  )}
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
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={newReport.data}
            onChange={(e) =>
              setNewReport((prev) => ({ ...prev, data: e.target.value }))
            }
          />

          <Grid item xs={12}>

              <Button variant="outlined" component="label" fullWidth>
                Upload Report File
                <input
                  type="file"
                  hidden
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setNewReport((prev) => ({
                      ...prev,
                      report_file: file,
                    }));
                  }}
                />
              </Button>

              {newReport.report_file && (
                <MDBox mt={2}>
                  {/* Check if it's a URL or a base64 string */}
                  {newReport.report_file.startsWith("data:application/octet-stream;base64,") ? (
                    // If the file is base64, display it (example for an image)
                    newReport.report_file.includes("pdf") ? (
                      <iframe
                        src={newReport.report_file}
                        title="report preview"
                        style={{ width: "100%", height: 300, border: "1px solid #ccc" }}
                      />
                    ) : (
                      <img
                        src={newReport.report_file}
                        alt="File preview"
                        style={{ width: "100%", height: 300, objectFit: "contain" }}
                      />
                    )
                  ) : (
                    // If it's a new file, use object URL for preview
                    <iframe
                      src={URL.createObjectURL(newReport.report_file)}
                      title="report preview"
                      style={{ width: "100%", height: 300, border: "1px solid #ccc" }}
                    />
                  )}
                </MDBox>
              )}
              {/* {newReport.report_file && (
              <MDBox mt={2}>
                {typeof newReport.report_file === "string" ? (
                  <iframe
                    src={newReport.report_file}
                    title="report preview"
                    style={{ width: "100%", height: 300, border: "1px solid #ccc" }}
                  />
                ) : (
                  <iframe
                    src={URL.createObjectURL(newReport.report_file)}
                    title="report preview"
                    style={{ width: "100%", height: 300, border: "1px solid #ccc" }}
                  />
                )}
              </MDBox>
            )} */}

            </Grid>
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