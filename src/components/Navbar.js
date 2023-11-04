import './Navbar.css';
import { Link } from 'react-router-dom';
import { supabase } from './client';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import Cookies from 'js-cookie';

const Navbar = ({}) => {
  const { user, session } = useAuth(); 
  console.log(user)
  console.log(session)


  function handleLogout(){

    supabase.auth.signOut().then(() => {
      Cookies.remove('userSession')
      localStorage.clear();
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  }


  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top topbar">
      <div className="container">
          <div className="nav-item">
            <Link className="nav-link mx-3" to="/">Home</Link>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
              <div className='nav-item'>
                <Link className="nav-link mx-3" to="/Pets">Adopt A Pet</Link>
              </div>
             <ul className='navbar-nav ms-auto'>
              
               { user ? (
                <li className="nav-item dropdown">
                <li className="nav-link dropdown-toggle mx-3" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >{user.user_metadata.firstName}</li>
                  <ul className='dropdown-menu'> 
                    <li className='dropdown-item'><Link style={{ textDecoration: 'none' }} to="/accountInformation">Account Details</Link></li>
                    <li className='dropdown-divider'><hr className="dropdown-divider" /></li>
                    <li className='dropdown-item '><a href=''className='text-decoration-none' onClick={handleLogout}>Logout</a></li>
                  </ul>
                </li>
              ) : (
                <>
              <li className="nav-item">
                <Link className="nav-link mx-3" to="/Login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-3" to="/Register">Register</Link>
              </li>
              </>
              )}  
          </ul>
          </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar;