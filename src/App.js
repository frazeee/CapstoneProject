import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { Login, Register, LandingPage, Pets } from './pages' 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';




function App() {
  const [token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token', JSON.stringify(token))
  }


  return (
    <>

     <Router>
      <Routes>
        <Route path ="/" element={<LandingPage token={token} />}/>
        <Route path ="/Login" element={<Login setToken={setToken}/>} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Pets' element={<Pets token={token}/>} />
      </Routes>
    </Router> 
    </>
  );
}

export default App;
