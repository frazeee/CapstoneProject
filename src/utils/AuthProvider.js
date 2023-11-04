import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const userSessionData = Cookies.get('userSession');

    if (userSessionData) {
      const tokenData = JSON.parse(userSessionData);
      const user = JSON.stringify(userSessionData.user)
      console.log(tokenData)
      setUser(tokenData.data.user);
      setSession(tokenData.data.session);
      
    }
  }, []);

  useEffect(() => {
    if (user && session) {
      console.log('User:', user);
      console.log('Session:', session);
    }
  }, [user, session]);
  

  return (
    <AuthContext.Provider value={{ user, setUser, session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
