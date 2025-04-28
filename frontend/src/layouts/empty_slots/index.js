import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { apiUrl } from "../../config/config";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Empty_Slots() {
    const navigate = useNavigate();
  const [data, setData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  useEffect(() => {
    const checkStatus = async () => {
        try {
            const response = await fetch(`${apiUrl}/hospital/isLoggedIn`, {
                method: "GET",
                credentials: "include",
            });
            if (!response.ok) navigate("/");
            const data = await response.json();
        }
        catch (err) {
            console.log(err);
        }
    }
    checkStatus();
    }, [navigate]);



  const fetchSlots = async () => {
    const res = await fetch(`${apiUrl}/doctorwise-slots`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ date: selectedDate }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const rows = await res.json();
    if(rows.status === 401) {
        navigate("/");
        return;
    } 
    const result = Array.isArray(rows.hospital) ? rows.hospital : [];
    // Filter only selected date's slots
    const filtered = result.filter((row) => row.date === selectedDate);

    // Group by doc_id for selected date
    const grouped = filtered.reduce((acc, row) => {
      const key = row.doc_id;
      if (!acc[key]) {
        acc[key] = {
          doc_id: row.doc_id,
          date: row.date,
          timings: row.timings,
          slots: [],
          doc_name: row.doc_name,
        };
      }
      acc[key].slots.push(row);
      return acc;
    }, {});

    setData(grouped);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar isMini />
      <Typography variant="h4" gutterBottom>
        Doctor-wise Slots
      </Typography>

      <MDBox mb={2}>
        <MDInput
          type="date"
          name="date"
          fullWidth
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </MDBox>

      <Grid container spacing={3}>
        {Object.entries(data).map(([key, group]) => {
          // Filter out doctors with no available slots
          const availableSlots = group.slots.filter((s) => !s.booked);
          if (availableSlots.length === 0) {
            return null; // Skip doctors with no available slots
          }

          return (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Card style={{ padding: 16 }}>
                <Typography variant="h4">{group.doc_name}</Typography>
                <Divider />
                <Typography variant="subtitle1">Timings :</Typography>
                <List>
                  {availableSlots.map((s, i) => (
                    
                    <ListItem key={i}>
                      <ListItemText primary={`${s.timings}`} />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </DashboardLayout>
  );
}

export default Empty_Slots;
