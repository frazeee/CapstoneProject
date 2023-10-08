import "./Header.css";
import HeaderBanner from "../images/HeaderBanner.jpg";
import CPSSLogo from "../images/CPSSLogo.png"

const Header = () => {
  return (
    <>
   <div className="container-fluid p-0">
      <div className="row">
        <div className="col-xl-12 d-flex flex-column align-items-center negative-margin">
          <img src={HeaderBanner} alt="Dog from Shelter" className="headerBanner img-fluid" />
            <p className="responsive-text top-translate">Find your new best friend.</p> 
            <p className="responsive-text2 top-translate">Browse pets from our partnered shelters.</p>
            <button type="button" className="btn top-translate">
              Adopt Now
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row part-div">
          <h2 className="fw-semibold">Partnered Shelters</h2>
          <hr/>
        <div className="col-xl-6">
          <img src={CPSSLogo} alt="Care For Paws Logo" className="img-fluid"/>
        </div>
        <div className="col-xl-6">
          <h2 className="fw-medium"> Care for Paws Shelter Sanctuary</h2>
          <p>CPSS Inc. is a non-profit animal shelter located in Pulong Saging, Silang Cavite. The shelter rescues and rehomes abused and neglected stray dogs and cats.
          CPSS serves as a sanctuary for animals in dire need of compassionate care. The shelter is staffed by a dedicated team of individuals who work tirelessly to improve the 
          lives of these animals and provide for their every need. 
          </p>
        </div>
        </div>
      </div>
  

    </>
  );
};

export default Header;
