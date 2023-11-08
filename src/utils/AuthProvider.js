import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { supabase } from '../components/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Set to null initially
  const [session, setSession] = useState(null); // Set to null initially
  const [email, setEmail] = useState(null); // Set to null initially


  useEffect(() => {
    const userSessionData = Cookies.get('userSession');

    if (userSessionData) {
      const tokenData = JSON.parse(userSessionData);
      const user = JSON.stringify(userSessionData.user)
    
      setUser(tokenData.data.user);
      setSession(tokenData.data.session);
      setEmail(tokenData.data.user.email)
      

    }

  }, [user]);

  


  return (
    <AuthContext.Provider value={{ user, setUser, session, setSession, email }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
