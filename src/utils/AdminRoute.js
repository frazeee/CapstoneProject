import { Outlet, Navigate } from "react-router-dom";
import { supabase } from "../components/client";
import Cookies from "js-cookie";
import { useAuth } from "./AuthProvider";
import { useState, useEffect} from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminRoute = ({}) => {
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize as true to show loading spinner

  useEffect(() => {
    const userSessionData = Cookies.get('userSession');

    if (userSessionData) {
      const tokenData = JSON.parse(userSessionData);

      setEmail(tokenData.data.user.email);
      
      // Fetch the user's role and set the loading state to false when the role is fetched
      fetchUserRole(tokenData.data.user.email);
    } else {
      // If there's no userSessionData, set the loading state to false
      setLoading(false);
    }
  }, []);

  const fetchUserRole = async (userEmail) => {
    try {
      const { data, error } = await supabase
        .from('Users')
        .select('role')
        .eq('email', userEmail)
        .single();

      if (error) {
        console.error('Error fetching user role:', error.message);
      } else {
        setRole(data.role);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false); // Set loading state to false once role is fetched or an error occurs
    }
  };

  if (loading) {
    return <LoadingSpinner />; // Show the loading spinner while fetching the role
  }

  return role === "ADMIN" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
