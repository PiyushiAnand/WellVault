import { useEffect, useState } from "react";
import { Grid, Typography, Card, CardContent, TextField, Button, IconButton } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { apiUrl } from "../../config/config"; // should resolve to your API base URL
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const BloodTypeEnum = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
};

function Blood() {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [formData, setFormData] = useState({ blood_group: "", count: 1 }); // Set initial count to 1
  const [errorMessage, setErrorMessage] = useState("");

  const fetchBloodBanks = async () => {
    try {
      const response = await fetch(`${apiUrl}/show-bloodbank`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setBloodBanks(data);
    } catch (error) {
      console.error("Failed to fetch blood banks:", error);
    }
  };

  const handleInputChange = (e) => {
    setErrorMessage("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddBloodBank = async () => {
    if (!formData.blood_group || !formData.count) {
      setErrorMessage("Both blood type and count are required.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/add-bloodbank`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        fetchBloodBanks(); // Refresh list
        setFormData({ blood_group: "", count: 1 }); // Reset the form
      }
    } catch (error) {
      console.error("Failed to add blood bank:", error);
    }
  };

  const handleDeleteBloodBank = async (blood_group) => {
    try {
      const response = await fetch(`${apiUrl}/delete-bloodbank`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blood_group }),
        credentials: "include",
      });

      if (response.ok) {
        fetchBloodBanks(); // Refresh list
      }
    } catch (error) {
      console.error("Failed to delete blood bank:", error);
    }
  };

  const handleUpdateCount = async (blood_group, operation) => {
    // Update the blood count locally based on the operation
    setBloodBanks((prevBloodBanks) =>
      prevBloodBanks.map((bloodBank) =>
        bloodBank.blood_group === blood_group
          ? {
              ...bloodBank,
              count: operation === 'increment' ? bloodBank.count + 1 : Math.max(bloodBank.count - 1, 0), // Prevent negative count
            }
          : bloodBank
      )
    );

    // const updatedBloodBank = bloodBanks.find((bloodBank) => bloodBank.blood_group === blood_group);
    // if (updatedBloodBank) {
    //   const updatedCount = updatedBloodBank.count;

      try {
        const response = await fetch(`${apiUrl}/update-bloodbank`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blood_group, count: operation === 'increment' ? 1 : -1 }),
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Failed to update count");
          // Optionally revert the state if update fails
        }
      } catch (error) {
        console.error("Failed to update count:", error);
      }
    
  };

  useEffect(() => {
    fetchBloodBanks();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Typography variant="h4" mb={2}>
        Blood Bank Management
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal" error={!!errorMessage}>
            <InputLabel>Blood Type</InputLabel>
            <Select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleInputChange}
              label="Blood Type"
            >
              {Object.keys(BloodTypeEnum).map((key) => (
                <MenuItem key={key} value={BloodTypeEnum[key]}>
                  {BloodTypeEnum[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            label="Count"
            name="count"
            type="number"
        
            value={formData.count}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errorMessage}
            helperText={errorMessage}
          />
          
          <Button
            size="medium"
            variant="contained"
            onClick={handleAddBloodBank}
            sx={{
              margin: '8px',
              padding: '12px 24px',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '16px',
              backgroundColor: 'green',
              color: '#fff',
            }}
          >
            Add Blood Bank
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4">Available Blood Banks</Typography>
          <Grid container spacing={2}>
            {bloodBanks.map((bloodBank) => (
              <Grid item xs={12} md={4} key={bloodBank.blood_group}>
                <Card>
                  <CardContent>
                    <Typography><strong>Blood Type:</strong> {bloodBank.blood_group}</Typography>
                    {/* <Typography><strong>Count:</strong> {bloodBank.count}</Typography> */}
                    
                    <div>
                    <b>Count:</b>
                      <IconButton
                        onClick={() => handleUpdateCount(bloodBank.blood_group, 'decrement')}
                        disabled={bloodBank.count <= 0}
                      >
                        <RemoveIcon />
                      </IconButton>
                      {bloodBank.count}
                      <IconButton
                        onClick={() => handleUpdateCount(bloodBank.blood_group, 'increment')}
                      >
                        <AddIcon />
                      </IconButton>
                    </div>

                    <Button
                      variant="outlined"
                      color="error"
                      size="large"
                      onClick={() => handleDeleteBloodBank(bloodBank.blood_group)}
                      sx={{
                        margin: '8px',
                        padding: '12px 24px',
                        borderRadius: '50px',
                        border: '2px solid red',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        '&:hover': {
                          backgroundColor: 'red',
                          color: '#fff',
                        },
                        transition: 'all 0.3s ease',
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

export default Blood;
