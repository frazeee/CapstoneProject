import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { supabase } from '../components/client';
import { BeatLoader } from 'react-spinners';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Set to null initially
  const [session, setSession] = useState(null); // Set to null initially
  const [email, setEmail] = useState(null); // Set to null initially
  const [loading, setLoading] = useState(null); // Set to null initially

 
useEffect(() => {
  const fetchUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      } else if (data) {
        const { user } = data;
        setUser(user);
        setEmail(user.email)
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  };

  fetchUser();
}, []);



  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
      <BeatLoader type="ThreeDots" color="#fee481" height={200} width={200} className="spinner" />
    </div>
    );
  }


  return (
    <AuthContext.Provider value={{ user, setUser, session, setSession, email }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}