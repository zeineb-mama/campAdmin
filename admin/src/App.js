import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin";
import LoginSignup from "./Pages/LoginSignup";
import axios from 'axios';
import { useEffect, useState } from "react";

export const backend_url = 'https://camp-admin-side-9cb5372894ec.herokuapp.com';
export const currency = '€';

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await axios.get(`${backend_url}/api/auth/user`, {
        headers: { 'auth-token': token }
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loggedOut) {
      fetchUserDetails();
    }
  }, [loggedOut]);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setUser(null);
    setLoggedOut(true);
    window.location.replace('/');
  };

  if (loading) {
    return <div style={{ display: "flex", justifyContent: 'center' }}>
      Loading...
    </div>;
  }

  return (
    <div>
      {user && user.role === 'admin' ? (
        <>
          <Navbar user={user} handleLogout={handleLogout} />
          <Admin />
          {/* <Footer /> */}
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginSignup />} />
        </Routes>
      )}
    </div>
  )
}

export default App;
