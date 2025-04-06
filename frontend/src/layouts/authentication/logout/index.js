import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'services/auth'; // Replace with your logout service

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout operations
    signOut();
    navigate('/authentication/sign-in');
  }, [navigate]);

  return null; // This component doesn't render anything
}

export default Logout;