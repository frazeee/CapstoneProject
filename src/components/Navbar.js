import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return(
    <nav className="navbar navbar-dark sticky-top topbar navbar-expand-xl">
      <div className="container-fluid">
        <ul className="navbar-nav">
        
          <li className="nav-item">
            <i icon="fa-solid fa-paw" style={{color: "#ffffff",}} />
            <Link className="nav-link mx-3" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-3" to="/Login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-3" to="/Register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;