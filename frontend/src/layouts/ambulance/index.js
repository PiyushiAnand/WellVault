import { useEffect, useState } from "react";
import { Grid, Typography, Card, CardContent, TextField, Button } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { apiUrl } from "../../config/config"; // should resolve to your API base URL
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";

const vehicleNumberPattern = /^[A-Z]{2}\s\d{2}\s[A-Z]{2}\s\d{4}$/;
const AmbulanceTypeEnum = {
    EMERGENCY: "Emergency",
    NON_EMERGENCY: "Non-Emergency",
    ICU: "ICU",
    TRANSPORT: "Transport",
  };
function Ambulance() {
  const [ambulances, setAmbulances] = useState([]);
  const [formData, setFormData] = useState({ vehicle_number: "", type: "" }); // State to manage form data
    const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const fetchAmbulances = async () => {
    try {
      const response = await fetch(`${apiUrl}/show-ambulance`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      
      setAmbulances(data);
    } catch (error) {
      console.error("Failed to fetch ambulances:", error);
    }
  };

  const handleInputChange = (e) => {

    // Reset error message when user starts typing
    setErrorMessage("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


const handleUpdateAvailability = async (vehicle_number, availability) => {
    // Optimistically update the UI by setting the state immediately when checkbox is clicked
    setAmbulances((prevAmbulances) =>
      prevAmbulances.map((ambulance) =>
        ambulance.vehicle_number === vehicle_number
          ? { ...ambulance, availability }
          : ambulance
      )
    );
  
    // Send update request to the backend
    try {
      const response = await fetch(`${apiUrl}/update-ambulance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicle_number, availability }),
        credentials: "include",
      });
  
      if (response.ok) {
        console.log("Ambulance availability updated successfully");
      } else {
        console.error("Failed to update availability");
        // Optionally, revert the state if the update fails
      }
    } catch (error) {
      console.error("Failed to update availability:", error);
    }
  };
  
  const handleAddAmbulance = async () => {
    if (!vehicleNumberPattern.test(formData.vehicle_number)) {
        setErrorMessage("Vehicle number must be in the format: XX 99 XX 9999");
        return;
      }
    try {
      const response = await fetch(`${apiUrl}/add-ambulance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        fetchAmbulances(); // Refresh list
        setFormData({ vehicle_number: "", type: "" }); // Clear the form
      }
      else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to add ambulance");
        alert(errorData.message || "Failed to add ambulance");
      }
    } catch (error) {
      console.error("Failed to add ambulance:", error);
    }
  };

  const handleDeleteAmbulance = async (vehicle_number) => {
    try {
      const response = await fetch(`${apiUrl}/delete-ambulance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicle_number }), // Pass the vehicle number of the ambulance to delete
        credentials: "include",
      });

      if (response.ok) {
        fetchAmbulances(); // Refresh list
      }
    } catch (error) {
      console.error("Failed to delete ambulance:", error);
    }
  };

  useEffect(() => {
    fetchAmbulances();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Typography variant="h4" mb={2}>
        Ambulance Management
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
        <TextField
        label="Vehicle Number"
        name="vehicle_number"
        value={formData.vehicle_number}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!errorMessage} // Highlight input if error exists
        helperText={errorMessage}
      />
         <FormControl
            fullWidth
            margin="normal"
            error={!!errorMessage}
            sx={{
              boxShadow: 3,            // Elevation
              borderRadius: 2,         // Rounded corners
              minHeight: 40,           // Minimum height
              width: "100%",
              backgroundColor: "#f9f9f9", 
            }}
          >
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              label="Type"
              sx={{
                borderRadius: 2,        // Rounded corners inside
                 minHeight: 40,          // Minimum height
                            // Padding left, not full padding
              }}
            >
              {Object.keys(AmbulanceTypeEnum).map((key) => (
                <MenuItem key={key} value={AmbulanceTypeEnum[key]}>
                  {AmbulanceTypeEnum[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

                    <Button
                            
                            size="medium"
                            variant="contained"
                            onClick={() => handleAddAmbulance()}
                            sx={{
                                margin: '8px',
                                padding: '12px 24px',
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                // boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.15)',
                               
                                backgroundColor: 'blue',  // Set hover background color to red
                                color: '#fff',  // Change text color to white on hover
                                
                                // transition: 'all 0.3s ease', // Smooth transition for hover effects
                            }}
                            >
            Add Ambulance
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4">Available Ambulances</Typography>
          <Grid container spacing={2}>
            {ambulances.map((ambulance) => (
              <Grid item xs={12} md={4} key={ambulance.vehicle_number}>
                <Card>
                  <CardContent>
                    <Typography><strong>Vehicle Number:</strong> {ambulance.vehicle_number}</Typography>
                    <Typography><strong>Type:</strong> {ambulance.type}</Typography>
                    
                    <FormControlLabel
                            control={
                                <Checkbox
                                checked={ambulance.availability}
                                onChange={(e) =>
                                    handleUpdateAvailability(ambulance.vehicle_number, e.target.checked)
                                }
                                color="primary"
                                />
                            }
                            label={
                                ambulance.availability ? "Available" : "Unavailable"
                            }
                            />


                            <Button
                            variant="outlined"
                            color="error"  // This will set the color to red
                            size="large"
                            onClick={() => handleDeleteAmbulance(ambulance.vehicle_number)}
                            sx={{
                                margin: '8px',
                                padding: '12px 24px',
                                borderRadius: '50px',
                                border: '2px solid red',  // Set border to red
                                fontWeight: 'bold',
                                fontSize: '16px',
                                boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.15)',
                                '&:hover': {
                                backgroundColor: 'red',  // Set hover background color to red
                                color: '#fff',  // Change text color to white on hover
                                },
                                transition: 'all 0.3s ease', // Smooth transition for hover effects
                            }}
                            >
                            Delete
                            </Button>

                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Ambulance;
