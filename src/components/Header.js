import { Link } from "react-router-dom";
import CPSSLogo from "../images/CPSSLogo.png";
import CPSS_Image from "../images/CPSS_Image.png";
import CPSS_Image2 from "../images/CPSS_Image2.png";
import HeaderBanner from "../images/HeaderBanner.jpg";
import LoginPicture from "../images/loginPicture.png"
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header container-fluid p-0">
        <div className="row">
          <div className="col-xl-12 d-flex flex-column align-items-center">
            <div className="image-container">
              <img
                src={HeaderBanner}
                alt="Dog from Shelter"
                className="headerBanner img-fluid"
              />
              <div className="centered-content">
                <p className="responsive-text top-translate">
                  Find your new best friend.
                </p>
                <p className="responsive-text2 top-translate">
                  Browse pets from our partnered shelters.
                </p>
                <Link to="/Pets">
                  <button
                    type="button"
                    className="btn link top-translate shadow"
                  >
                    Adopt Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-3">
        <div className="row">
          <h2 className="fw-semibold">Partnered Shelters</h2>
          <hr className="mb-5" />
        </div>

        <div className="row">
          <div className="col-md-6">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={CPSSLogo} className="d-block w-100" alt="..."/>
                  </div>
                  <div className="carousel-item">
                    <img src={CPSS_Image} className="d-block w-100" alt="..."/>
                  </div>
                  <div className="carousel-item">
                    <img src={CPSS_Image2} className="d-block w-100" alt="..."/>
                  </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card description-card w-100 shadow">
              <h2 className="fw-bold card-title pt-5 px-5">
                {" "}
                Care for Paws Shelter Sanctuary
              </h2>
              <p className="card-body text-dark px-5">
                Nestled in Pulong Saging, Silang Cavite, CPSS Inc. is your
                dedicated partner in pet adoption. This non-profit animal
                shelter rescues and rehomes abused and neglected stray dogs and
                cats, offering them a second chance at happiness. With a
                passionate team working tirelessly, CPSS is where love and care
                redefine lives. Find your forever friend today!
              </p>
              <a
                className="btn description-button text-white mx-5 mb-5"
                href="https://www.facebook.com/careforpawsphshelter"
                target="https://www.facebook.com/careforpawsphshelter"
              >
                Visit Them Here!
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mt-5">
        <div className="row">
        <h2 className="fw-semibold text-end">Interested as signing-up as a shelter?</h2>
        <hr className=""/>
        </div>
      </div>

  <div className="container col-xl-10 px-4 py-5">
    <div className="row flex-lg-row-reverse align-items-center g-5 py-2">
      <div className="col-10 col-sm-8 col-lg-6">
        <img src={CPSS_Image2} className="d-block mx-lg-auto img-fluid"  width="700" height="500" loading="lazy"/>
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold lh-1 mb-3 pb-1">Welcome To BPUAdopt!</h1>
        <hr className="w-100"/>
        <p className="lead pt-3"> Your gateway to responsible pet adoption. Register your shelter today to efficiently connect with potential adopters. Showcase the pets available for adoption, providing essential information and images. By joining our platform, you contribute to finding loving homes for animals in need. Click below to begin the registration process and be part of the solution for responsible and caring pet ownership."</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <Link to="/ShelterSignup" className="btn btn-lg px-4 mt-3 me-md-2">Sign Up</Link>
        </div>
      </div>
    </div>
  </div>

    </>
  );
};

export default Header;
