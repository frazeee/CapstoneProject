import { Link } from 'react-router-dom';
import './Footer.css';


const Footer = () =>{
    return(
        <>
        <footer className="d-flex flex-wrap justify-content-between align-items-center px-3 py-3 my-4 border-top">
            <p className="col-md-4 mb-0 text-dark">© 2023 BPUAdopt</p>
            <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto text-decoration-none">
            <svg className="bi me-2" width="40" height="32"></svg>
            </a>
            <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item"><Link to className="nav-link link-color px-2 text-dark">Home</Link></li>
                <li className="nav-item"><Link to className="nav-link link-color px-2 text-dark">Adopt A Pet</Link></li>
                <li className="nav-item"><Link to className="nav-link link-color px-2 text-dark">FAQs</Link></li>
                <li className="nav-item"><Link to className="nav-link link-color px-2 text-dark">About</Link></li>
            </ul>
        </footer>
        </>
    )
}

export default Footer;