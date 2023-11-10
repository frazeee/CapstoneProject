import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { supabase } from "../components/client";
import "./PetPage.css";

const PetPage = ({ user }) => {
  const { cardId } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase
        .from("Pets")
        .select("*")
        .eq("id", cardId);
      if (error) {
        console.log("Error getting data:", error.message);
      } else {
        setData(data);
      }
    }
    getData();
  }, []);

  return (
    <div className="container-bg">
      <Navbar user={user} />
      <div className="container">
        {data.map((pet) => (
          <div className="pet-container">
            <div className="pet-header">
              <h1 key={pet.id}>{pet.pet_name}</h1>
              <img
                src={pet.image_url1}
                alt={pet.pet_name}
                className="profile-img img-fluid rounded"
              />
            </div>
            <div className="details-container">
              <div className="pet-details">
                <ul className="list-group list-group-flush pb-2 rounded">
                  <li className="list-group-item fs-5">
                    {" "}
                    <span className=" fw-bold">Age:</span> {pet.age} years old{" "}
                  </li>
                  <li className="list-group-item fs-5">
                    {" "}
                    <span className="fw-bold">Gender:</span> {pet.gender}{" "}
                  </li>
                  <li className="list-group-item fs-5">
                    {" "}
                    <span className="fw-bold">Personality:</span>{" "}
                    {pet.pet_personality}{" "}
                  </li>
                  <li className="list-group-item fs-6">
                    {" "}
                    <span className="fw-light text-body-secondary">
                      Note: All CPSS pets are both spayed and neutered
                    </span>{" "}
                  </li>
                </ul>
                <Link to="/Application">
                  {" "}
                  <button className="btn w-25">Apply Now</button>{" "}
                </Link>
              </div>
            </div>
          </div>
        ))}

        <div className="faqs-container">
          <h1 className="text-center">Frequently Asked Questions (FAQs)</h1>
          <div className="faq-container">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    How do I adopt a pet from your website?
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <strong>
                      Adopting a pet from our shelters is a simple process.
                    </strong>{" "}
                    Start by submitting an application, attending an online
                    interview, and meeting our shelter animals in person. Once
                    you've found your ideal companion, wait for vet clearance,
                    schedule a pick-up, and pay the adoption fee, which varies
                    by shelter. Then, you're ready to bring your new pet home
                    and embark on your exciting journey as a pet owner!
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Can I meet the pet before adopting?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <strong>This is the second item's accordion body.</strong>{" "}
                    It is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingThree">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    What are the requirements for pet adoption?
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It
                    is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PetPage;
