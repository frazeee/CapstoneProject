import "./Header.css";
import HeaderBanner from "../images/HeaderBanner.jpg";
import { Link } from "react-router-dom";
import CPSSLogo from "../images/CPSSLogo.png"
import CPSS_Image from "../images/CPSS_Image.png"
import CPSS_Image2 from "../images/CPSS_Image2.png"


const Header = () => {
  return (
    <>
   <div className="header container-fluid p-0">
  <div className="row">
    <div className="col-xl-12 d-flex flex-column align-items-center">
      <div className="image-container">
        <img src={HeaderBanner} alt="Dog from Shelter" className="headerBanner img-fluid" />
        <div className="centered-content">
          <p className="responsive-text top-translate">Find your new best friend.</p>
          <p className="responsive-text2 top-translate">Browse pets from our partnered shelters.</p>
          <Link to="/Pets">
            <button type="button" className="btn link top-translate shadow">
              Adopt Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
   </div>
 
      <div className="container pt-2">
        <div className="row carousel-div">
          <div className="row-header">
            <h2 className="fw-semibold">Partnered Shelters</h2>
            <hr className="mb-5 w-100"/>
          </div>
        <div className="col-xl-6">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={CPSSLogo} class="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src={CPSS_Image} class="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src={CPSS_Image2} class="d-block w-100" alt="..."/>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
        </div>
        <div className="col-xl-6 align-items-center">
          <div className="card description-card w-100 shadow">
            <h2 className="fw-bold card-title pt-5 px-5"> Care for Paws Shelter Sanctuary</h2>
            <p className="card-body text-dark px-5">Nestled in Pulong Saging, Silang Cavite, CPSS Inc. is your dedicated partner in pet adoption. This non-profit animal shelter rescues and rehomes abused and neglected stray dogs and cats, offering them a second chance at happiness. With a passionate team working tirelessly, CPSS is where love and care redefine lives. Find your forever friend today!</p>
            <a className="btn btn-dark description-button text-light mx-5 mb-5" href="https://www.facebook.com/careforpawsphshelter" target="https://www.facebook.com/careforpawsphshelter">Visit Them Here!</a>
          </div>
        </div>
        </div>
      </div>


    </>
  );
};

export default Header;
