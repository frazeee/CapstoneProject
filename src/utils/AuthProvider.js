import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { supabase } from '../components/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(false);
  const [session, setSession] = useState(false);
  const [role, setRole] = useState(false)
  const [email, setEmail] = useState(false)


  useEffect(() => {
    const userSessionData = Cookies.get('userSession');

    if (userSessionData) {
      const tokenData = JSON.parse(userSessionData);
      const user = JSON.stringify(userSessionData.user)
    
      setUser(tokenData.data.user);
      setSession(tokenData.data.session);
      setEmail(tokenData.data.user.email)
      
    }

  }, []);




  return (
    <AuthContext.Provider value={{ user, setUser, session, setSession, role }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
