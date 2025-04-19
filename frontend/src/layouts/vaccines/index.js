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
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Enum-like array of vaccine names
const VACCINE_NAMES = [
  "COVIDSHIELD",
  "COVAXIN",
  "MMR",
  "HEPATITIS-B",
  "POLIO",
  "BCG",
  "TETANUS",
  "INFLUENZA",
];

function Vaccines() {
  const navigate = useNavigate();
  const [oldvacname,setOldvacname] = useState("");
  const [vaccines, setVaccines] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newVaccine, setNewVaccine] = useState({
    vaccine_name: "",
    no_of_dose: "",
    year_administered: "",
    administering_hospital: "",
  });

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const res = await fetch(`${apiUrl}/vaccines`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) {
          navigate("/");
        }
        if (!res.ok) {
          throw new Error("Failed to fetch vaccines");
        }
        const data = await res.json();
        setVaccines(data.vaccines);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
      }
    };

    fetchVaccines();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // if (name === "vaccine_name"){
    //   setOldvacname(value);
    // }
    setNewVaccine((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVaccine = () => {
   
    setNewVaccine({
      vaccine_name: "",
      no_of_dose: "",
      year_administered: "",
      administering_hospital: "",
    });
    setEditingIndex(null);
    setOpenDialog(true);
  };

  const handleEditVaccine = (index) => {

    const selectedVaccine = vaccines[index];
    setNewVaccine({ ...selectedVaccine });
    setEditingIndex(index);
    setOldvacname(selectedVaccine.vaccine_name);
    setOpenDialog(true);
  };

  const handleSaveVaccine = async () => {
    try {
      if (editingIndex !== null) {
        const response = await fetch(`${apiUrl}/update-vaccine`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({oname:oldvacname,newVaccine}),
          credentials: "include",
        });
        if(response.status === 500) alert("Vaccine name already exists");
        if(response.status === 400) alert ("invalid year");
        if (!response.ok) throw new Error("Failed to update vaccine");

        const updated = [...vaccines];
        updated[editingIndex] = newVaccine;
        setVaccines(updated);
      } else {
        const response = await fetch(`${apiUrl}/add-vaccine`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVaccine),
          credentials: "include",
        });
        if(response.status === 500) alert("Vaccine name already exists");
        if(response.status === 400) alert ("invalid year");
        if (!response.ok) throw new Error("Failed to add vaccine");

        const result = await response.json();
        setVaccines([...vaccines, result.vaccine]);
        console.log(result);
      }

      setOpenDialog(false);
    } catch (error) {
      console.error("Error saving vaccine:", error);
    }
  };

  const handleDeleteVaccine = async (index) => {
    try {
      const vaccineToDelete = vaccines[index];
      const response = await fetch(`${apiUrl}/delete-vaccine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({vaccine: vaccineToDelete }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete vaccine");

      const updated = vaccines.filter((_, i) => i !== index);
      setVaccines(updated);
    } catch (error) {
      console.error("Error deleting vaccine:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar isMini />
      <MDBox py={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h2">Vaccines</Typography>
        </MDBox>

        <Grid container spacing={3}>
          {vaccines.map((vaccine, index) => (
            <Grid item xs={12} sm={6} md={4} key={vaccine.id || index}>
              <Card sx={{ p: 2, height: "100%", position: "relative" }}>
                <MDBox display="flex" justifyContent="space-between">
                  <Typography variant="h4" gutterBottom>
                    {vaccine.vaccine_name}
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
                    <strong>Dose no:</strong> {vaccine.no_of_dose}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Year administered:</strong> {vaccine.year_administered}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Administering Hospital:</strong> {vaccine.administering_hospital}
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
                Add New Vaccine
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editingIndex !== null ? "Edit Vaccine" : "Add New Vaccine"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="vaccine-name-label">Vaccine Name</InputLabel>
                  <Select
                    labelId="vaccine-name-label"
                    name="vaccine_name"
                    value={newVaccine.vaccine_name}
                    onChange={handleInputChange}
                    label="Vaccine Name"
                  >
                    {VACCINE_NAMES.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="No of dose"
                  name="no_of_dose"
                  type="number"
                  value={newVaccine.no_of_dose}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Year Administered"
                  name="year_administered"
                  value={newVaccine.year_administered}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Administering Hospital"
                  name="administering_hospital"
                  value={newVaccine.administering_hospital}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} startIcon={<CancelIcon />}>
              Cancel
            </Button>
            <Button onClick={handleSaveVaccine} startIcon={<SaveIcon />} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </MDBox>
    </DashboardLayout>
  );
}

export default Vaccines;
