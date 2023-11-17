import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../components/client";
import "./Pets.css";
import Footer from "../components/Footer";

function Pets({ user }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    async function getData() {
      setLoading(true)
      const { data, error } = await supabase.from("Pets").select("*");
      if (error) {
        console.log("Error getting data:", error.message);
        setLoading(false)
      } else {
        const sortedData = data.slice().sort((a, b) => a.id - b.id);
        setData(sortedData);
        setLoading(false)
      }
    }
    getData();
  }, []);

  const [activeButton, setActiveButton] = useState("All");

  const handleButtonClick = (buttonText) => {
    setActiveButton(buttonText);
  };

  const filteredCardItems = data.filter((cardItem) => {
    if (activeButton === "All") {
      return true;
    } else if (activeButton === "Dogs" && cardItem.pet_type === "Dog") {
      return true;
    } else if (activeButton === "Cats" && cardItem.pet_type === "Cat") {
      return true;
    }
    return false;
  });

  return (
    <>
      <Navbar />

      <div className="bg-dark hero text-secondary px-4 py-5 text-center shadow-sm">
        <div className="py-5">
          <h1 className="display-5 fw-bold text-white">
            Every Pet Deserves a Loving Home.
          </h1>
          <h1 className="display-5 fw-bold text-white">Adopt a Pet Today!</h1>
          <div className="col-lg-6 mx-auto">
            <p className="fs-6 text-light mb-4">
              Browse our available animals and learn more about the adoption
              process. Together, we can rescue, rehabilitate, and rehome pets in
              need. Thank you for supporting our mission to bring joy to
              families through pet adoption.
            </p>
          </div>
        </div>
      </div>

      <div className="container pt-4 px-3">
        <div className="row">
          <div className="col-12">
            <h1 className="highlight-word">
              Adopt a Shelter cat or dog
            </h1>
            <hr className="w-100 mb-3" />
            <p className="fs-6">
              Our adoptable cats and dogs are all spayed/neutered and
              vaccinated. They’ve lived a difficult life before being in the
              shelters and we need to make sure that they get adopted by loving
              humans and won’t be subjected to further cruelty or neglect.
              Here’s how to apply:
            </p>
            <ul className="">
              <li>Submit the adoption application form</li>
              <li>Attend the online interview</li>
              <li>Meet our shelter animals in person</li>
              <li>Visit your chosen pet to confirm your choice</li>
              <li>Wait for vet clearance and schedule pick up</li>
              <li>Pay the adoption fee (Varying per shelter)</li>
              <li>Take your pet home!</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-3 padding-bottom-mobile">
        <div className="d-flex justify-content-center align-items-center pb-3 filter-buttons">
          <button
            className={`btn ${activeButton === "All" ? "active" : ""} mx-3`}
            onClick={() => handleButtonClick("All")}
          >
            All
          </button>
          <button
            className={`btn ${activeButton === "Cats" ? "active" : ""}  mx-3`}
            onClick={() => handleButtonClick("Cats")}
          >
            Cats
          </button>
          <button
            className={`btn ${activeButton === "Dogs" ? "active" : ""}  mx-3`}
            onClick={() => handleButtonClick("Dogs")}
          >
            Dogs
          </button>
        </div>
          <hr className=" mt-0 mb-3"/>
        

        <div className="row" key={`row`}>
          {filteredCardItems.map((cardItem) => (
            <div
              key={cardItem.id}
              className="container col-xl-3 col-lg-6 col-md-6 col-sm-12 pb-4 d-flex flex-column justify-content-center align-items-center"
            >
              <Link
                to={`/petPage/${cardItem.id}`}
                className="text-decoration-none"
              >
                <div className="card shadow on-hover">
                  <div className="card-image-top">
                    <img src={cardItem.image_url1} alt={cardItem.pet_name} />
                  </div>
                  <div className="card-title pt-3 text-center card-design">
                    <h2>{cardItem.pet_name}</h2>
                  </div>
                  <div className="card-body">
                    <p>
                      Age: {cardItem.age}{" "}
                      {cardItem.gender === "Male" ? (
                        <i className="icon bi bi-gender-male "></i>
                      ) : (
                        <i className="icon bi bi-gender-female"></i>
                      )}{" "}
                    </p>
                    <p>Personality: {cardItem.pet_personality}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Pets;
