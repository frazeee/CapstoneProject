import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { supabase } from '../components/client';
import { BeatLoader } from 'react-spinners';

const AdminRoute = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userSessionData = Cookies.get('userSession');

    if (userSessionData) {
      const tokenData = JSON.parse(userSessionData);
      
      fetchUserRole(tokenData.data.user.email);
    } else {
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
      setLoading(false); // Set loading to false when done fetching
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
      <BeatLoader type="ThreeDots" color="#fee481" height={200} width={200} className="spinner" />
    </div>
    );
  }

  return role === "ADMIN" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
