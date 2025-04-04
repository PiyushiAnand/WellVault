/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================
*/

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

// Import React Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../../../config/config.js";

const Cover = () => {
  // React hook to navigate to pages
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    dob: "",
    mobile_number: "",
    gender: "",
    address: "",
    emergency_contact: "",
  });

  // Check if user is logged in
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`${apiUrl}/isLoggedIn`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Not logged in");
        }

        const data = await response.json();
        console.log(data.message);
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
      }
    };
    checkStatus();
  }, [loggedIn, navigate]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
              <MDInput type="text" label="Username" name="username" variant="standard" fullWidth onChange={handleChange} value={formData.username} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" name="password_hash" variant="standard" fullWidth onChange={handleChange} value={formData.password_hash} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Name" name="name" variant="standard" fullWidth onChange={handleChange} value={formData.name} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="date" label="DOB" name="dob" variant="standard" fullWidth onChange={handleChange} value={formData.dob} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Mobile Number" name="mobile_number" variant="standard" fullWidth onChange={handleChange} value={formData.mobile_number} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Gender" name="gender" variant="standard" fullWidth onChange={handleChange} value={formData.gender} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Address" name="address" variant="standard" fullWidth onChange={handleChange} value={formData.address} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Emergency Contact" name="emergency_contact" variant="standard" fullWidth onChange={handleChange} value={formData.emergency_contact} />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </MDTypography>
              <MDTypography component="a" href="#" variant="button" fontWeight="bold" color="info" textGradient>
                Terms and Conditions
              </MDTypography>
            </MDBox>
            {error && <MDTypography color="error">{error}</MDTypography>}
            {success && <MDTypography color="success">{success}</MDTypography>}
            <button type="submit" >Signup</button>
            {/* <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Sign Up
              </MDButton>
            </MDBox> */}
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography component={Link} to="/authentication/sign-in" variant="button" color="info" fontWeight="medium" textGradient>
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
