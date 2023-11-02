import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { Login, Register, LandingPage, Pets, PetPage } from './pages' 
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { useState, useEffect } from 'react';
import { supabase } from './components/client';




function App() {  

  const [session, setSession] = useState(false)
  const [user, setUser] = useState(false)

  console.log(session)
  console.log(user)


  useEffect(()=>{

    const getSessionData = async () => {
      console.log("GET SESSION RUNS")
  if (session && session.expires_at) {
    console.log("pumasok")
    const now = new Date()
    const expiresAt = session.expires_at
    console.log(now) 
    console.log(expiresAt)
  }

  const{data, error} = await supabase.auth.getSession()
    setSession(data.session)
    setUser(data.session.user)
}

getSessionData()



  },[])


  // useEffect(() => {
  //   const getSessionData = async () => {
  //         console.log("GET SESSION RUNS")
  //     if (session && session.expires_at) {
  //       console.log("pumasok")
  //       const now = new Date()
  //       const expiresAt = new Date(session.expires_at)
  //       console.log(now >= expiresAt) 
  //       if (now >= expiresAt) {
          
  //       }
  //     }

  //     const{data} = await supabase.auth.getUser()
  //       setSession(data.session)
  //       console.log(session)
  //   }
    
  //   getSessionData()
    

  // },[])


  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage user={user} />} />
          <Route path="/login" element={<Login setSession = {setSession} setUser = {setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pets" element={<Pets user={user} />} />
          <Route path="/petPage/:cardId" element={<PetPage user={user} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
