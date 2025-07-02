import { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function ProtectedRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    
    const token = localStorage.getItem('token');

    // Validate the sessionId using a more comprehensive check
    const isLoggedIn = token; // Replace with your validation logic

    // If correct sessionId, do nothing
    if (!isLoggedIn) {
      // Handle incorrect or missing sessionId gracefully
      // Consider informing the user and showing relevant options
      // (e.g., retry fetching session, sign in, etc.)
      console.error('Invalid or missing sessionId. Redirecting to login...');
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // Render children if provided
  return children ? children : null;
}

export default ProtectedRoute;