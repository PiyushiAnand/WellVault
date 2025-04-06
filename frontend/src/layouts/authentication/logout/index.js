import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../../config/config.js'; // adjust path as needed

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const res = await fetch(`${apiUrl}/logout`, {
          method: "POST", // ensure you're using POST if your backend expects that
          credentials: "include", // important for sending cookies
        });

        if (res.ok) {
          navigate('/'); // redirect to home or login page
        } else {
          console.error("Logout failed");
          navigate('/authentication/sign-in');
        }
      } catch (err) {
        console.error("Logout error:", err);
        navigate('/authentication/sign-in');
      }
    };

    performLogout();
  }, [navigate]);

  return null; // no UI
}

export default Logout;
