import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { supabase } from "../components/client";
import Cookies from "js-cookie";
import "./PetPage.css";
import { faL } from "@fortawesome/free-solid-svg-icons";

const PetPage = ({ user }) => {
  const { cardId } = useParams();
  const UserData = JSON.parse(Cookies.get("userSession"))
  const userEmail = UserData.data.user.email
  const navigate = useNavigate()

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  

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

  const checkRecord = async () => {
    const { data, error } = await supabase
      .from('Requests')
      .select('*')
      .eq('pet_id', cardId)
      .eq('email', userEmail)
      .neq('adoption_status', "Rejected")

    if (error) {
      console.log('Error fetching data:', error);
    } else {
      if (data.length > 0) {
        setShowModal(true)
      } else {
        console.log('Record does not exist');
        navigate(`/Application/${cardId}`);
      }
    }
  };

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
                className="img-fluid rounded"
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
                  <button className="btn w-30" onClick={checkRecord}>Apply Now</button>{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />

      {showModal && (
  <div>
    <div className="modal-backdrop show"></div>
    <div
      className="modal"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Existing Adoption Request</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">You already have an adoption request for this pet.</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
    
  );
};

export default PetPage;
