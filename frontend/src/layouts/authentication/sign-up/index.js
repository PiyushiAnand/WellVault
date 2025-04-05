import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { apiUrl } from "../../../config/config.js";

const Cover = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",  // Use `password`, not `password_hash`
    name: "",
    dob: "",
    mobile_number: "",
    gender: "",
    address: "",
    emergency_contact: "",
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`${apiUrl}/isLoggedIn`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkStatus();
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user modifies any field
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setError(null);
        navigate("/dashboard") // Redirect after success
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Signup failed. Please try again.");
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
              <MDInput type="text" label="Username" name="username" fullWidth onChange={handleChange} value={formData.username} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" name="password" fullWidth onChange={handleChange} value={formData.password} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Name" name="name" fullWidth onChange={handleChange} value={formData.name} />
            </MDBox>
            <MDBox mb={2}>
            
              <MDInput type="date"  name="dob" fullWidth onChange={handleChange} value={formData.dob} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Mobile Number" name="mobile_number" fullWidth onChange={handleChange} value={formData.mobile_number} />
            </MDBox>
            <MDBox mb={2}>
                        <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-[300px] p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>
            
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            </MDBox>
             {/* <MDBox mb={2}>
              <MDInput type="text" label="Gender" name="gender" fullWidth onChange={handleChange} value={formData.gender} />
            </MDBox> */}
            <MDBox mb={2}>
              <MDInput type="text" label="Address" name="address" fullWidth onChange={handleChange} value={formData.address} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Emergency Contact" name="emergency_contact" fullWidth onChange={handleChange} value={formData.emergency_contact} />
            </MDBox>
            <MDBox display="flex" alignItems="center">
              <Checkbox />
              <MDTypography variant="button" fontWeight="regular" color="text">
                &nbsp;I agree to the&nbsp;
              </MDTypography>
              <MDTypography component="a" href="#" variant="button" fontWeight="bold" color="info">
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
                <MDTypography component={Link} to="/authentication/sign-in" variant="button" color="info" fontWeight="medium">
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
