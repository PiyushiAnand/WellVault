// pages/TermsAndConditions.js
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PageLayout from "examples/LayoutContainers/PageLayout";

function TermsAndConditions() {
  return (
    <PageLayout>
      <MDBox px={4} py={6}>
        <MDTypography variant="h4" gutterBottom>
          Terms and Conditions
        </MDTypography>
        <MDTypography variant="body1" paragraph>
          Effective Date: [Insert Date]
        </MDTypography>
        <MDTypography variant="body1" paragraph>
          Welcome to [Your Website Name] ("we," "our," or "us"). By signing up and using our health platform ("Service"), you agree to be bound by the following Terms and Conditions. Please read them carefully.
        </MDTypography>
        <MDTypography variant="h6" gutterBottom>1. Eligibility</MDTypography>
        <MDTypography variant="body1" paragraph>
          By using this website, you confirm that:
          <ul>
            <li>You are at least 18 years old or have the permission of a parent or guardian.</li>
            <li>The information you provide is accurate and truthful.</li>
          </ul>
        </MDTypography>
        <MDTypography variant="h6" gutterBottom>2. Services Provided</MDTypography>
        <MDTypography variant="body1" paragraph>
          Our platform allows you to:
          <ul>
            <li>Store and manage your digital medical records.</li>
            <li>Track ongoing treatments and medical history.</li>
            <li>Connect to hospitals and healthcare providers for emergencies and checkups.</li>
            <li>Share your medical information securely with authorized medical personnel.</li>
          </ul>
        </MDTypography>
        <MDTypography variant="h6" gutterBottom>3. Privacy and Data Protection</MDTypography>
        <MDTypography variant="body1" paragraph>
          All your medical and personal information will be stored securely and in compliance with applicable data protection laws.
          <br />
          We do not sell your data to third parties.
          <br />
          You have control over who can access your information.
          <br />
          For more details, refer to our Privacy Policy.
        </MDTypography>
        <MDTypography variant="h6" gutterBottom>4. Emergency Access</MDTypography>
        <MDTypography variant="body1" paragraph>
          In the event of a verified emergency, authorized medical personnel may access your medical records to ensure timely and appropriate care.
        </MDTypography>
        <MDTypography variant="h6" gutterBottom>5. User Responsibilities</MDTypography>
        <MDTypography variant="body1" paragraph>
          You are responsible for maintaining the confidentiality of your login credentials.
          <br />
          You must not misuse the platform or provide false or misleading information.
          <br />
          Do not share your account with others.
        </MDTypography>
        <MDTypography variant="h6" gutterBottom>6. Security</MDTypography>
        <MDTypography variant="body1" paragraph>
          We use encryption and industry-standard safeguards to protect your data. However, no system is completely immune from breaches. By using our services, you acknowledge and accept this risk.
        </MDTypography>
        <MDTypography variant="h6" gutterBottom>7. Medical Disclaimer</MDTypography>
        <MDTypography variant="body1" paragraph>
          This platform does not provide medical advice. Always consult with a qualified healthcare provider regarding any medical concerns. Our platform is a tool to assist communication and data management, not a replacement for professional care.
        </MDTypography>
        <MDTypography variant="h6" gutterBottom>8. Modifications</MDTypography>
        <MDTypography variant="body1" paragraph>
          We may update these Terms and Conditions at any time. You will be notified of any significant changes. Continued use of the platform after changes implies acceptance of the updated terms.
        </MDTypography>
        <MDTypography variant="h6" gutterBottom>9. Termination</MDTypography>
        <MDTypography variant="body1" paragraph>
          We reserve the right to suspend or terminate your access if you violate these terms or misuse the service in any way.
        </MDTypography>
      </MDBox>
    </PageLayout>
  );
}

export default TermsAndConditions;
