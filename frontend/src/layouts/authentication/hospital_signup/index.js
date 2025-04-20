import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bgsignup.jpg";
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
    type:"",
    ambulance_availability:"",
    blood_bank_availability:"",  
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

1. Eligibility
By using this website, you confirm that:
- You are at least 18 years old or have the permission of a parent or guardian.
- The information you provide is accurate and truthful.

2. Services Provided
Our platform allows you to:
- Store and manage your digital medical records.
- Track ongoing treatments and medical history.
- Connect to hospitals and healthcare providers for emergencies and checkups.
- Share your medical information securely with authorized medical personnel.

3. Privacy and Data Protection
- All your medical and personal information will be stored securely and in compliance with applicable data protection laws.
- We do not sell your data to third parties.
- You have control over who can access your information.`);
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
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
              <MDInput type="text" label="Hospital Name" name="hospital_name" fullWidth onChange={handleChange} value={formData.hospital_name} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="pincode" label="pincode" name="pincode" fullWidth onChange={handleChange} value={formData.pincode} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Address" name="address" fullWidth onChange={handleChange} value={formData.address} />
            </MDBox>
             <MDBox mb={2}>
                          <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-[300px] p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                color="info"
                style={{ cursor: "pointer" }}
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            {error && <MDTypography color="error">{error}</MDTypography>}
            {success && <MDTypography color="success">{success}</MDTypography>}

            <MDButton variant="gradient" color="info" fullWidth type="submit">
              Sign Up
            </MDButton>

            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography component={Link} to="/authentication/hospital-sign-in" variant="button" color="info" fontWeight="medium">
                  Sign In
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
