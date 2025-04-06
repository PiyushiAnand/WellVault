import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Dashboard Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { apiUrl } from "../../config/config.js";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [healthRecord, setHealthRecord] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    dob: "",
    height: "",
    weight: "",
    blood_group: "",
    allergy: "",
    ongoing_treatment: "",
  });

  useEffect(() => {
    const getRecords = async () => {
      try {
        const response = await fetch(`${apiUrl}/profile`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const res = await response.json();
          setUser(res.user);
          setHealthRecord(res.record);

          setEditFormData({
            name: res.user?.name || "",
            dob: res.user?.dob ? res.user.dob.slice(0, 10) : "",
            height: res.record?.height || "",
            weight: res.record?.weight || "",
            blood_group: res.record?.blood_group || "",
            allergys: res.record?.allergys || "",
            ongoing_treatment: res.record?.ongoing_treatment || "",
          });
        } else {
          console.error("Failed to fetch profile:", response.status);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    getRecords();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${apiUrl}/profile/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditOpen(false);

        // Refetch to update UI
        const updated = await fetch(`${apiUrl}/profile`, {
          method: "GET",
          credentials: "include",
        });
        const res = await updated.json();
        setUser(res.user);
        setHealthRecord(res.record);
      } else {
        const err = await response.text();
        alert("Failed to update: " + err);
      }
    } catch (err) {
      console.error("Update failed", err);
      alert("Error while updating profile.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <Card sx={{ p: 3 }}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <MDTypography variant="h6">Profile Info</MDTypography>
                <IconButton onClick={() => setIsEditOpen(true)} title="Edit Profile">
                  <EditIcon />
                </IconButton>
              </MDBox>

              <MDBox>
                <MDTypography variant="body2">
                  <strong>Full Name:</strong> {user?.name || "Loading..."}
                </MDTypography>
                <MDTypography variant="body2">
                  <strong>Mobile:</strong> {user?.mobile_number || "N/A"}
                </MDTypography>
                <MDTypography variant="body2">
                  <strong>Date of Birth:</strong> {user?.dob ? user.dob.slice(0, 10) : "N/A"}
                </MDTypography>
                <MDTypography variant="body2">
                  <strong>Height:</strong> {healthRecord?.height || "N/A"} cm
                </MDTypography>
                <MDTypography variant="body2">
                  <strong>Weight:</strong> {healthRecord?.weight || "N/A"} kg
                </MDTypography>
                <MDTypography variant="body2">
                  <strong>Blood Group:</strong> {healthRecord?.blood_group || "N/A"}
                </MDTypography>
                <MDTypography variant="body2">
                  <strong>Allergies:</strong> {healthRecord?.allergys || "None"}
                </MDTypography>
                <MDTypography variant="body2">
                  <strong>Ongoing Treatment:</strong> {healthRecord?.ongoing_treatment || "No"}
                </MDTypography>
              </MDBox>
            </Card>

            {!healthRecord && (
              <MDBox mt={2}>
                <Card sx={{ p: 2 }}>
                  <MDTypography variant="body2" color="text">
                    No health records found yet. You can add them using "Edit Profile".
                  </MDTypography>
                </Card>
              </MDBox>
            )}
          </Grid>
        </Grid>
      </MDBox>

      {/* === Edit Form Modal === */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <MDBox component="form" display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Full Name"
              name="name"
              value={editFormData.name}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="Date of Birth"
              type="date"
              name="dob"
              value={editFormData.dob}
              onChange={handleFormChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Height (cm)"
              name="height"
              value={editFormData.height}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="Weight (kg)"
              name="weight"
              value={editFormData.weight}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="Blood Group"
              name="blood_group"
              value={editFormData.blood_group}
              onChange={handleFormChange}
              fullWidth
              select
              SelectProps={{ native: true }}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </TextField>
            <TextField
              label="Allergies"
              name="allergys"
              value={editFormData.allergy}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="Ongoing Treatment"
              name="ongoing_treatment"
              value={editFormData.ongoing_treatment}
              onChange={handleFormChange}
              fullWidth
              select
              SelectProps={{ native: true }}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </TextField>
          </MDBox>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default ProfilePage;
