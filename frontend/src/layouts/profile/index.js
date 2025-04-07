/*
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================
*/

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import img1 from "../../assets/avatars/boy.png";
import img2 from "../../assets/avatars/cat.png"
import img3 from "../../assets/avatars/man.png";
import img4 from "../../assets/avatars/panda.png";
import img5 from "../../assets/avatars/woman.png";
import img6 from "../../assets/avatars/woman-2.png";
import img7 from "../../assets/avatars/woman-3.png";
import img8 from "../../assets/avatars/account.png";
import img9 from "../../assets/avatars/user.png";
import img10 from "../../assets/avatars/penguin.png";
import img11 from "../../assets/avatars/rabbit.png";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { apiUrl } from "../../config/config.js";

function ProfilePage() {

  const navigate = useNavigate();
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await fetch(`${apiUrl}/isLoggedIn`, {
                   method: "GET",
                   credentials: "include",
                 });
          
          if (res.status === 401) {
            navigate("/");
          }
        } catch (err) {
          console.error("Error verifying auth", err);
          navigate("/");
        }
      };
  
      checkAuth();
    }, [navigate]);

  const [user, setUser] = useState(null);
  const [healthRecord, setHealthRecord] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    dob: "",
    mobile_number: "",
    gender: "",
    address: "",
    emergency_contact: "",
    height: "",
    weight: "",
    blood_group: "",
    allergy: "",
    ongoing_treatment: "",
  });
  const [errors, setErrors] = useState({});
  // Inside your ProfilePage component, add:
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isAvatarEditOpen, setIsAvatarEditOpen] = useState(false);

  // Add handler for image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
      // You can also upload it to the server here if needed.
    }
  };
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
            mobile_number: res.user?.mobile_number || "",
            gender: res.user?.gender || "",
            address: res.user?.address || "",
            emergency_contact: res.user?.emergency_contact || "",
            height: res.record?.height || "",
            weight: res.record?.weight || "",
            blood_group: res.record?.blood_group || "",
            allergy: res.record?.allergy || "",
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

  const validate = () => {
    const errs = {};
    const isTenDigit = (val) => /^\d{10}$/.test(val);

    if (!isTenDigit(editFormData.mobile_number)) {
      errs.mobile_number = "Mobile number must be 10 digits.";
    }
    if (!isTenDigit(editFormData.emergency_contact)) {
      errs.emergency_contact = "Emergency contact must be 10 digits.";
    }

    if (editFormData.dob) {
      const enteredDate = new Date(editFormData.dob);
      const today = new Date();
      if (enteredDate > today) {
        errs.dob = "Date of birth cannot be in the future.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!validate()) return;

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
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display="flex" alignItems="center" mb={2}>
        <Avatar
          alt={user?.name || "Profile Picture"}
          src={avatarUrl || img8}
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <IconButton color="primary" onClick={() => setIsAvatarEditOpen(true)}>
          <EditIcon />
        </IconButton>
  
        <Stack direction="row" alignItems="center" spacing={2}>
          <label htmlFor="upload-avatar">
            <Input
              accept="image/*"
              id="upload-avatar"
              type="file"
              onChange={handleImageUpload}
              sx={{ display: "none" }}
            />
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Stack>
      </MDBox>
  
      <MDBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MDTypography variant="h3">Profile Information</MDTypography>
            {user && (
              <MDBox mt={2}>
              <MDTypography><b>Name</b>: {user.name}</MDTypography>
              <MDTypography><b>DOB</b>: {new Date(user.dob).toLocaleDateString("en-GB")}</MDTypography>
              <MDTypography><b>Mobile</b>: {user.mobile_number}</MDTypography>
              <MDTypography><b>Gender</b>: {user.gender}</MDTypography>
              <MDTypography><b>Address</b>: {user.address}</MDTypography>
              <MDTypography><b>Emergency Contact</b>: {user.emergency_contact}</MDTypography>
              </MDBox>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <MDTypography variant="h3">Health Record</MDTypography>
            {healthRecord && (
              <MDBox mt={2}>
              <MDTypography><b>Height</b>: {healthRecord.height} cm</MDTypography>
              <MDTypography><b>Weight</b>: {healthRecord.weight} kg</MDTypography>
              <MDTypography><b>Blood Group</b>: {healthRecord.blood_group}</MDTypography>
              <MDTypography><b>Allergy</b>: {healthRecord.allergy}</MDTypography>
              <MDTypography><b>Ongoing Treatment</b>: {healthRecord.ongoing_treatment}</MDTypography>
              </MDBox>
            )}
            <MDBox mt={2}>
              <MDButton onClick={() => setIsEditOpen(true)} startIcon={<EditIcon />} color="info">
                Edit Profile
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
  
      {/* --- EDIT PROFILE DIALOG --- */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {Object.entries(editFormData).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                {key === "blood_group" ? (
                  <TextField
                    select
                    fullWidth
                    label="Blood Group"
                    name={key}
                    value={value}
                    onChange={handleFormChange}
                    error={!!errors[key]}
                    helperText={errors[key] || ""}
                  >
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : key === "ongoing_treatment" ? (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={value === "Yes"}
                        onChange={(e) =>
                          handleFormChange({
                            target: { name: key, value: e.target.checked ? "Yes" : "No" },
                          })
                        }
                        name={key}
                      />
                    }
                    label="Ongoing Treatment"
                  />
                ) : (
                  <TextField
                    fullWidth
                    label={key.replace(/_/g, " ")}
                    name={key}
                    value={value}
                    onChange={handleFormChange}
                    error={!!errors[key]}
                    helperText={errors[key] || ""}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
  
      {/* --- AVATAR DIALOG --- */}
      <Dialog open={isAvatarEditOpen} onClose={() => setIsAvatarEditOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Choose Avatar</DialogTitle>
        <DialogContent>
          <MDBox mt={1} mb={2}>
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              {[img5, img6, img7, img1, img3, img9, img10, img11, img2, img4].map((src, index) => (
                <Avatar
                  key={index}
                  src={src}
                  onClick={() => {
                    setAvatarUrl(src);
                    setIsAvatarEditOpen(false);
                  }}
                  sx={{
                    width: 60,
                    height: 60,
                    cursor: "pointer",
                    border: avatarUrl === src ? "2px solid #1976d2" : "2px solid transparent",
                    transition: "border 0.2s",
                    m: 1,
                  }}
                />
              ))}
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center" mt={2}>
              <label htmlFor="upload-avatar">
                <Input
                  accept="image/*"
                  id="upload-avatar"
                  type="file"
                  onChange={(e) => {
                    handleImageUpload(e);
                    setIsAvatarEditOpen(false);
                  }}
                  sx={{ display: "none" }}
                />
              </label>
            </Stack>
          </MDBox>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
  
}

export default ProfilePage;