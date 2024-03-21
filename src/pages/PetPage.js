import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { supabase } from "../components/client";
import "./PetPage.css";
import Cookies from "js-cookie";

const PetPage = ({ user }) => {
  const navigate = useNavigate();
  const { cardId } = useParams();
  const [userEmail, setUserEmail] = useState("");
  const [isRestricted, setIsRestricted] = useState(false);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userRequests, setUserRequests] = useState("");
  const [hasExistingRequest, setHasExistingRequest] = useState(false);
  const [showExistingRequestModal, setExistingRequestModal] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const { data, error } = await supabase
          .from("Pets")
          .select("*")
          .eq("id", cardId);
        if (error) {
          console.log("Error getting data:", error.message);
        } else {
          setData(data);
        }
      } catch (error) {
        console.error("Error getting data:", error);
      }
    }
    getData();
  }, [cardId]);

  useEffect(() => {
    const userSessionCookie = Cookies.get("userSession") ?? null;
    if (userSessionCookie !== null) {
      let UserData = JSON.parse(userSessionCookie);
      setUserEmail(UserData.data.user.email);

      async function fetchUserData() {
        try {
          const { data: usersData, error: fetchError } = await supabase
            .from("Users")
            .select("is_Restricted")
            .eq("email", UserData.data.user.email)
            .single();

          if (fetchError) {
            throw fetchError;
          }

          setIsRestricted(usersData.is_Restricted);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      fetchUserData();
    }
  }, []);

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const { data, error } = await supabase
          .from("Requests")
          .select("email, pet_id, adoption_status")
          .eq("email", userEmail);

        if (error) {
          throw error;
        }

        setUserRequests(data);
        const matchingRequests = data.filter(
          (request) =>
            request.pet_id === parseInt(cardId) &&
            request.adoption_status !== "Approved" &&
            request.adoption_status !== "Rejected"
        );
        if (matchingRequests.length >= 1) {
          setHasExistingRequest(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserRequests();
  }, [userEmail, cardId]);

  const handleApplyNowClick = () => {
    if (!userEmail) {
      navigate("/Login");
    }
    if (isRestricted) {
      setShowModal(true);
    } else {
      if (hasExistingRequest) {
        setExistingRequestModal(true);
      } else {
        navigate(`/Application/${cardId}`);
      }
    }
  };

  return (
    <div className="container-bg">
      <Navbar user={user} />
      <div className="container">
        {data.map((pet) => (
          <div className="pet-container" key={pet.id}>
            <div className="pet-header">
              <h1>{pet.pet_name}</h1>
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
                    <span className="fw-bold">Age:</span> {pet.age} years old
                  </li>
                  <li className="list-group-item fs-5">
                    <span className="fw-bold">Gender:</span> {pet.gender}
                  </li>
                  <li className="list-group-item fs-5">
                    <span className="fw-bold">Personality:</span>{" "}
                    {pet.pet_personality}
                  </li>
                </ul>
                <button className="btn w-30" onClick={handleApplyNowClick}>
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasExistingRequest && showExistingRequestModal && (
        <div
          className="modal fade show"
          id="myModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog  modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Existing Request
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setExistingRequestModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                You already have a pending request for this pet. Please await
                further instructions or updates from the shelter. Thank you for
                your patience and understanding.{" "}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setExistingRequestModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isRestricted &&
        showModal && ( // Render modal only if user is restricted and showModal is true
          <div
            className="modal fade show"
            id="myModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ display: "block" }}
          >
            <div
              className="modal-dialog  modal-dialog-centered"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Restricted User
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  You are a restricted user and won't be able to apply for
                  adoption. Please check your email for assistance.
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      <Footer />
    </div>
  );
};

export default PetPage;
