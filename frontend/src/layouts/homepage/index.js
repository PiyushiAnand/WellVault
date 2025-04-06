import React from "react";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import bgImage from "../../assets/images/home-decor-1.jpg"; // Adjust the path as necessary

const Homepage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => navigate("/authentication/sign-up");
  const handleSignIn = () => navigate("/authentication/sign-in");

  return (
    <MDBox
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        color: "white",
        px: 3,
      }}
    >
      <MDTypography variant="h2" fontWeight="bold" mb={2}>
        Welcome to WellVault
      </MDTypography>
      <MDTypography variant="h5" mb={5}>
        Your secure health record vault
      </MDTypography>
      <MDBox display="flex" gap={2}>
        <MDButton color="info" variant="contained" size="large" onClick={handleSignUp}>
          Sign Up
        </MDButton>
        <MDButton color="white" variant="outlined" size="large" onClick={handleSignIn}>
          Sign In
        </MDButton>
      </MDBox>
    </MDBox>
  );
};

export default Homepage;
