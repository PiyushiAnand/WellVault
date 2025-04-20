import React from "react";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import bgImage from "../../assets/images/bg_homepage.jpg"; // Adjust if needed
import { Fade } from "@mui/material";

const Homepage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => navigate("/authentication/sign-up");
  const handleSignIn = () => navigate("/authentication/sign-in");
  const handleHospital = () => navigate("/authentication/hospital-sign-up");

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
        position: "relative",
      }}
    >
      {/* Overlay */}
      <MDBox
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgcolor="rgba(0, 0, 0, 0.4)"
        zIndex={1}
      />

      {/* Glassmorphism Container */}
      <Fade in timeout={600}>
        <MDBox
          zIndex={2}
          textAlign="center"
          color="white"
          p={5}
          borderRadius={4}
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            maxWidth: "90%",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <MDTypography variant="h2" fontWeight="bold" mb={2}>
            Welcome to <span style={{ color: "#00bcd4" }}>WellVault</span>
          </MDTypography>

          <MDTypography variant="h5" mb={4} fontWeight="light">
            Your secure health record vault
          </MDTypography>

          <MDBox display="flex" justifyContent="center" gap={3} flexWrap="wrap">
            <MDButton
              color="info"
              variant="contained"
              size="large"
              onClick={handleSignUp}
              sx={{
                px: 4,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              Sign Up
            </MDButton>

            <MDButton
              variant="outlined"
              size="large"
              onClick={handleSignIn}
              sx={{
                px: 4,
                fontWeight: "bold",
                color: "#ffffff",
                borderColor: "#ffffff",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(4px)",
                borderWidth: "2px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderColor: "#00bcd4",
                  color: "#00bcd4",
                  transform: "scale(1.05)",
                  boxShadow: "0 0 12px rgba(0, 188, 212, 0.5)",
                },
              }}
            >
              Sign In
            </MDButton>
          </MDBox>

          <MDTypography
            variant="body1"
            mt={3}  // Margin top to separate from buttons
            sx={{
              color: "#2196F3",
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": {
                color: "#ffffff",  // Blue color when hovered
              },
            }}
            onClick={handleHospital}
          >
            Not a patient? Click here for hospital login
          </MDTypography>
        </MDBox>
      </Fade>
    </MDBox>
  );
};

export default Homepage;
