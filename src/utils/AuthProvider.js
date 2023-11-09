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

  // useEffect(() => {

  //   const userSessionData = Cookies.get('userSession');

  //   if (userSessionData) {
  //     const tokenData = JSON.parse(userSessionData);
  //     const userData = tokenData.data.user; // Use userData instead of JSON.stringify

  //     setUser(userData);
  //     setSession(tokenData.data.session);
  //     setEmail(userData.email); // Set email from userData

  //   }
  // }, []);

  
  useEffect(() => {
    const fetchUserData = async () => {
      const userSessionData = Cookies.get('userSession');
      setLoading(true)
      if (userSessionData) {
        const tokenData = JSON.parse(userSessionData);

        // Assuming you have a unique identifier like 'email' or 'id' to fetch the user
        const email = tokenData.data.user.email;

        // Use the Supabase 'select' function to fetch user data
        const { data, error } = await supabase
          .from('Users')
          .select('*')
          .eq('email', email); // Replace 'email' with the actual unique identifier

         

        if (error) {
          console.error('Error fetching user:', error);
        } else {
          if (data && data.length > 0) {
            const user = data[0];
            setUser(user);
            setSession(tokenData.data.session);
            setEmail(user.email);
            setLoading(false)
          }
        }
      }
    };

    fetchUserData();
  }, []);

  console.log(user)

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
