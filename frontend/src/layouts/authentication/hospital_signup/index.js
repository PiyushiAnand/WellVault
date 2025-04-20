import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/hosp_signup.jpg";
import { apiUrl } from "../../../config/config.js";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const Cover = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    hospital_name: "",
    pincode: "",
    address: "",
    type: "",
    ambulance_availability: "",
    blood_bank_availability: "",
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`${apiUrl}/hospital/isLoggedIn`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          navigate("/hospitaldashboard");
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkStatus();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    try {
      const response = await fetch(`${apiUrl}/hospital/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setError(null);
        navigate("/hospitaldashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Error:", error);
    }
  };

  const showTermsAlert = () => {
    alert(`Terms and Conditions

Welcome to WellVault. By signing up and using our health platform ("Service"), you agree to be bound by the following Terms and Conditions. Please read them carefully.

Eligibility:
Only properly licensed and registered hospitals recognized by the relevant health authorities are eligible to be listed on our platform. Hospitals must provide valid documentation upon registration.

Services Provided:
Our platform facilitates the management and storage of essential hospital-related information, including blood bank inventories, ambulance availability, patient records, doctor profiles, and appointment slots.

Data Accuracy & Compliance:
Hospitals are responsible for ensuring that all data entered — including slot timings, staff availability, and medical resources — is accurate and regularly updated.`);
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="warning"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your details to get started
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Hospital Name"
                name="hospital_name"
                fullWidth
                onChange={handleChange}
                value={formData.hospital_name}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Pincode"
                name="pincode"
                fullWidth
                onChange={handleChange}
                value={formData.pincode}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Address"
                name="address"
                fullWidth
                onChange={handleChange}
                value={formData.address}
              />
            </MDBox>
            <MDBox mb={2}>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-[300px] p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Select type</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </MDBox>

            <MDBox mb={2}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Ambulance Availability</FormLabel>
                <RadioGroup
                  row
                  name="ambulance_availability"
                  value={formData.ambulance_availability}
                  onChange={handleChange}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </MDBox>

            <MDBox mb={2}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Blood Bank Availability</FormLabel>
                <RadioGroup
                  row
                  name="blood_bank_availability"
                  value={formData.blood_bank_availability}
                  onChange={handleChange}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </MDBox>

            <MDBox display="flex" alignItems="center">
              <Checkbox />
              <MDTypography variant="button" fontWeight="regular" color="text">
                &nbsp;I agree to the&nbsp;
              </MDTypography>
              <MDTypography
                component="span"
                onClick={showTermsAlert}
                variant="button"
                fontWeight="bold"
                color="warning"
                style={{ cursor: "pointer" }}
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            {error && <MDTypography color="error">{error}</MDTypography>}
            {success && <MDTypography color="success">{success}</MDTypography>}

            <MDButton variant="gradient" color="warning" fullWidth type="submit">
              Sign Up
            </MDButton>

            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/hospital-sign-in"
                  variant="button"
                  color="warning"
                  fontWeight="medium"
                >
                  Sign in
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
};

export default Cover;
