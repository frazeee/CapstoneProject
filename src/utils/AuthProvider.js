import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { supabase } from '../components/client';
import { BeatLoader } from 'react-spinners';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null); 
  const [email, setEmail] = useState(null); 
  const [loading, setLoading] = useState(null); 
  const userData = Cookies.get("userSession")


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
    <AuthContext.Provider value={{ user, setUser, session, setSession, email}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}