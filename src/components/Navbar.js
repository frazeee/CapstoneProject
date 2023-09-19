import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({token}) => {
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
            <ul className='navbar-nav'>
              <li className="nav-item">
                <Link className="nav-link mx-3" to="/Login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-3" to="/Register">Register</Link>
              </li>
              {/* {token ? (
              <li className="nav-item">
                <Link className="nav-link mx-3" to="/">{token.user.user_metadata.first_name}</Link>
              </li>
              ) : (
              <li className="nav-item">
                <Link className="nav-link mx-3" to="/">Wala shang Token</Link>
              </li>
              )} */}
          </ul>
        </div>
      </div>
    </nav>

    </>
  )
}

export default Navbar;