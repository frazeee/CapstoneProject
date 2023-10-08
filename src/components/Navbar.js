import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({token}) => {

  const navigate = useNavigate()

  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/')
  }


  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top topbar">
      <div className="container-fluid">
          <div className="nav-item">
            <Link className="nav-link mx-3" to="/">Home</Link>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
              <div className='nav-item'>
                <Link className="nav-link mx-3" to="/">Adopt A Pet</Link>
              </div>
             <ul className='navbar-nav ms-auto'>
              {token ? (
              <li className="nav-item dropdown">
                <li className="nav-link dropdown-toggle mx-3" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >{token.user.user_metadata.first_name}</li>
                <ul className='dropdown-menu dropdown-menu-lg-end'> 
                  <li className='dropdown-item'><Link style={{ textDecoration: 'none' }} to="/">Account Details</Link></li>
                  <li className='dropdown-divider'><hr class="dropdown-divider" /></li>
                  <li className='dropdown-item'><a href=''className='' onClick={handleLogout()}>Logout</a></li>
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