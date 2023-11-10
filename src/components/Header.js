import { Link } from "react-router-dom";
import CPSSLogo from "../images/CPSSLogo.png";
import CPSS_Image from "../images/CPSS_Image.png";
import CPSS_Image2 from "../images/CPSS_Image2.png";
import HeaderBanner from "../images/HeaderBanner.jpg";
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

      <div className="container pt-2">
        <div className="row">
          <h2 className="fw-semibold">Partnered Shelters</h2>
          <hr className="mb-5 w-100" />
        </div>

        <div className="row">
          <div className="col-md-6">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></li>
                <li
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></li>
                <li
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={CPSSLogo} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={CPSS_Image} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={CPSS_Image2} className="d-block w-100" alt="..." />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
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
    </>
  );
};

export default Header;
