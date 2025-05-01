import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import { apiUrl } from "../../config/config";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import QR_image from "../../assets/images/WhatsApp Image 2025-05-01 at 11.56.17 AM.jpeg";

function Appointments() {
  const [hospital, setHospital] = useState("");
  const [hospitalOptions, setHospitalOptions] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [slots, setSlots] = useState([]);
  const [slot, setSlot] = useState("");
  const [bookedAppointments, setBookedAppointments] = useState([]);
  //state for pay button
  const [pay, setPay] = useState(false);
  const [booked, setBooked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${apiUrl}/isLoggedIn`, {
          method: "GET",
          credentials: "include",
        });
        if (res.status === 401) navigate("/");
      } catch (err) {
        console.error("Error verifying auth", err);
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

  const listhospital = async () => {
    try {
      const res = await fetch(`${apiUrl}/hospital`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setHospitalOptions(data.hospitals || []);
      console.log(data.hospitals);
    } catch (err) {
      console.log(err);
    }
  };

  const listdoctor = async () => {
    if (!hospital) return;
  
    try {
      const res = await fetch(`${apiUrl}/doctor`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          hospital_name: hospital.hospital_name,
          pincode: hospital.pincode,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await res.json();
      // Ensure that the doctor options contain doc_name and speciality
      const doctorsWithSpeciality = data.doctors.map(doctor => ({
        ...doctor,
        label: `${doctor.doc_name} (${doctor.speciality})`,  // Create a custom label if needed
      }));
  
      setDoctorOptions(doctorsWithSpeciality || []);
    } catch (err) {
      console.log("Error fetching doctors:", err);
    }
  };
  
  
  

  const listslots = async () => {
    if (!doctor || !date || !hospital) return;
  
    try {
      const res = await fetch(`${apiUrl}/slots`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          doc_name: doctor.doc_name,
          date,
          hospital_name: hospital.hospital_name,
          pincode: hospital.pincode,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await res.json();
      setSlots((data.slots || []).filter(slot => !slot.booked));

    } catch (err) {
      console.log("Error fetching slots:", err);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ hosp:hospital.hospital_name, doc:doctor.doc_name, a_date:date, slot:slot.slot_id }),
      });
      if(response.status === 400) {
        alert("Please select a valid date and slot");
      }
      if (response.status === 500) return alert("Server error, please try again later");
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error creating appointment");
      }
      alert("Appointment created successfully");
      setBooked(true);
      setPay(false);
        setSlot("");
    // Refresh slots
    await listslots();
    await listBookedAppointments();
    } catch (err) {
      console.log(err);
      alert("Error: " + err.message);
    }
  };

  const listBookedAppointments = async () => {  
    try {
      const res = await fetch(`${apiUrl}/appointments`, {
        method: "GET",
        credentials: "include",
      });
  
      const data = await res.json();
      console.log(data);
      setBookedAppointments(data.data|| []);
    } catch (err) {
      console.error("Error fetching booked appointments:", err);
    }
  };

  const handle_payment = async (apt_id) => {
    try {
      const response = await fetch(`${apiUrl}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({apt_id}),
      });
      if (response.status === 400) {
        alert("Please select a valid date and slot");
      }
      if (response.status === 500) return alert("Server error, please try again later");
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error creating appointment");
      }
      alert("Payment successful");
      setBooked(true);
      setPay(false);
      setSlot("");
      // Refresh slots
      await listslots();
      await listBookedAppointments();
    } catch (err) {
      console.log(err);
      alert("Error: " + err.message);
    }
  };
  


  useEffect(() => {
    listhospital();
  }, []);

  useEffect(() => {
    listdoctor();
  }, [hospital]);

  useEffect(() => {
    listslots();
  }, [doctor, date]);

  useEffect(() => {
    listBookedAppointments();
  }, []);
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
          Book an Appointment
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
            <Autocomplete
                options={hospitalOptions}
                value={hospital}
                onChange={(e, newVal) => setHospital(newVal)}
                getOptionLabel={(option) => option.hospital_name || ""}
                renderInput={(params) => (
                    <TextField {...params} label="Search Hospital" />
                )}
                />

            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            <Autocomplete
                options={doctorOptions}
                value={doctor}
                onChange={(e, newVal) => setDoctor(newVal)}
                getOptionLabel={(option) =>
                    typeof option === "string"
                    ? option
                    : `${option.doc_name} (${option.speciality})`
                }
                renderOption={(props, option) => (
                    <li {...props}>
                    <strong>{option.doc_name}</strong> — {option.speciality}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField {...params} label="Search Doctor" />
                )}
                />

            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                type="date"
                label="Select Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            <Autocomplete
                options={slots}
                getOptionLabel={(option) => option.timings || ""} 
                value={slot}
                onChange={(e, newVal) => setSlot(newVal)}
                renderInput={(params) => (
                    <TextField {...params} label="Select Slot" />
                )}
                />

            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
           
            sx={{
                                margin: '20px',
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
            Book Appointment
          </Button>
         
        </form>
      </MDBox>
      <MDBox mt={5}>
  <Typography variant="h5" gutterBottom>
    Booked Appointments
  </Typography>
  {bookedAppointments.length === 0 ? (
    <Typography>No appointments yet</Typography>
  ) : (
    bookedAppointments.map((appt, idx) => (
      <MDBox key={idx} my={1} p={2} border="1px solid #ccc" borderRadius="8px">
        <Typography><strong>Hospital Name:</strong> {appt.hospital_name || "N/A"}</Typography>
        <Typography><strong>Doctor Name:</strong> {appt.doctor_name || "N/A"}</Typography>
        <Typography><strong>Appointment Date:</strong> {new Date(appt.appointment_date).toLocaleDateString()}</Typography>
        <Typography><strong>Timings:</strong> {appt.timings || "N/A"}</Typography>

        {!appt.paid && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setPay(true)}
            sx={{
              margin: '20px',
              padding: '12px 24px',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '16px',
              backgroundColor: 'green',
              color: '#fff',
            }}
          >
            Pay Now (500)
          </Button>
        )}

        {pay && !appt.paid &&(
          <MDBox mt={3} textAlign="center">
            <img src={QR_image} alt="QR Code" style={{ width: "200px", height: "200px" }} />
            <Typography variant="h6">Scan to Pay</Typography>
            <Typography variant="body2">Please pay the amount to confirm your appointment.</Typography>
          </MDBox>
        )}

        {pay && !appt.paid &&
          (<Button
            variant="contained"
            color="primary"
            onClick={() => handle_payment(appt.apt_id)}
            sx={{
              margin: '20px',
              padding: '12px 24px',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '16px',
              backgroundColor: 'blue',  // Set hover background color to red
              color: '#fff',  // Change text color to white on hover
            }}
          >
            Confirm Payment
        </Button>)
}
      </MDBox>
    ))
  )}
</MDBox>


    </DashboardLayout>
  );
}

export default Appointments;
