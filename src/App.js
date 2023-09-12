import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register'
import LandingPage from './pages/landingPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path ="/" element={<LandingPage />}/>
        <Route path ="/Login" element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </Router> 
    </>
  );
}

export default App;
