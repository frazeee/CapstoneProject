import { useEffect, useState } from "react";
import AdminInterviewModal from "../components/AdminInterviewModal/AdminInterviewModal";
import AdminRequestModal from "../components/AdminRequestModal/AdminRequestModal";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import { supabase } from "../components/client";
import './AdminPage.css';
import AddPetModal from "../components/AddPetModal/AddPetModal";
import DeletedModal from "../components/DeletedModal/DeletedModal";
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";
 
const AdminPage = () => {
  const [data, setData] = useState([]);
  const [requestListCount, setRequestListCount] = useState(0);
  const [interviewListCount, setInterviewListCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [shelterName, setShelterName] = useState("");

  const userData = Cookies.get('userSession')
  if(userData && userEmail == null){
      const parsedUserData = JSON.parse(userData);
      const email = parsedUserData.data.user.email;
      setUserEmail(email)
  }
    


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data: shelterData, error: shelterError } = await supabase
          .from("Admins")
          .select("shelter_name")
          .eq("shelter_email", userEmail);
  
        if (shelterError) {
          throw shelterError;
        }
  
        const shelterName = shelterData[0]?.shelter_name;
  
        // Get Pets data
        const { data: petsData, error: petsError } = await supabase
          .from("Pets")
          .select("*")
          .eq("Shelter", shelterName);
  
        if (petsError) {
          throw petsError;
        }
  
        const sortedPetsData = petsData.slice().sort((a, b) => a.id - b.id);
  
        // Get Request List
        const { data: requestListData, error: requestListError } = await supabase
          .from("Requests")
          .select("*")
          .eq("shelter_from", shelterName);
  
        if (requestListError) {
          throw requestListError;
        }
  
        // Get Interview List
        const currentDate = new Date();
        const { data: interviewListData, error: interviewListError } = await supabase
          .from("Requests")
          .select()
          .eq("shelter_from", shelterName)
          .gt("interview_date", currentDate.toISOString());
  
        if (interviewListError) {
          throw interviewListError;
        }
  
        setShelterName(shelterName);
        setData(sortedPetsData);
        setRequestListCount(requestListData.length);
        setInterviewListCount(interviewListData.length);
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, [userEmail]); // Add userEmail to the dependency array if it's used inside the effect
  
  let dataCount = data.length;

  const [selectedCard, setSelectedCard] = useState({
    age: "",
    gender: "",
    pet_name: "",
    pet_personality: "",
  });
  const [editedDetails, setEditedDetails] = useState({
    age: "",
    gender: "",
    pet_name: "",
    pet_personality: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (cardItem) => {
    setSelectedCard(cardItem);
    setEditedDetails({ ...cardItem });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCard({
      age: "",
      gender: "",
      pet_name: "",
      pet_personality: "",
    });
    setEditedDetails({
      age: "",
      gender: "",
      pet_name: "",
      pet_personality: "",
    });
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevEditedDetails) => ({
      ...prevEditedDetails,
      [name]: value,
    }));
  };

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
          try {
            console.log(editedDetails)
            const { data, error } = await supabase
              .from('Pets')
              .update({
               pet_name : editedDetails.pet_name,
               age : editedDetails.age,
               gender : editedDetails.gender,
               pet_type : editedDetails.pet_type,
               pet_personality : editedDetails.pet_personality
              })
              .eq('id', parseInt(selectedCard.id, 10))
              .single()
              
            if (error) {
              // Handle the error here
              console.error('Error updating user:', error);
            } else {
              // Update was successful
              console.log('Pet updated successfully:', data);
              
            }
          } catch (error) {
            // Handle any other errors that may occur during the update.
            console.error('An error occurred:', error);
          }
      
        closeModal();
      };
      

      const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);

      const handleClick = (cardItem) => {
        setSelectedCard(cardItem)
        setisDeleteModalOpen(true);
      };

      const closeDeleteModal = () => {
        setisDeleteModalOpen(false);
      };

      const DeletePet = async () => {
        try{
          console.log(selectedCard.id)
          setLoading(true)
          const {data, error} = await supabase
          .from('Pets')
          .delete()
          .eq('id', selectedCard.id)
            if (error) {
            console.error('Error deleting pet:', error);
          } else {
            console.log('Pet deleted successfully:', data);
          }
        }
        catch (error){
          console.error('An error occurred:', error);
        }
        finally{
          setLoading(false);
          closeDeleteModal();
        }
        
      }

      if (loading) {
        return (
          <div className="d-flex justify-content-center align-items-center">
          <BeatLoader type="ThreeDots" color="#fee481" height={200} width={200} className="spinner" />
        </div>
        );
      }


  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h1 className="text-center">{shelterName || 'Default Shelter Name'}</h1>
        <hr />
      </div>
      <div className="admin-page container my-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="card rounded-5  shadow" id="infoCard">
              <div className="card-body">
                <div className="row">
                  <div className="box col-lg-4 text-center py-5">
                    <h1 style={{ color: "#ffffff" }}>{dataCount}</h1>
                    <h2 style={{ color: "#ffffff" }}>
                      PETS FOR <br /> ADOPTION
                    </h2>
                    <AddPetModal shelterName={shelterName}/>
                  </div>
                  <div className="box col-lg-4 text-center py-5">
                    <h1 style={{ color: "#ffffff" }}>{requestListCount}</h1>
                    <h2 style={{ color: "#ffffff" }}>
                      POTENTIAL <br /> ADOPTERS
                    </h2>
                    <AdminRequestModal shelterName={shelterName}/>
                  </div>
                  <div className="box col-lg-4 text-center py-5">
                    <h1 style={{ color: "#ffffff" }}>{interviewListCount}</h1>
                    <h2 style={{ color: "#ffffff" }}>SCHEDULED INTERVIEWS</h2>
                    <AdminInterviewModal />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-center">PETS FOR ADOPTION</h1>
      <hr className="mb-5" />
      <div className="container">
        <div className="row" key={`row`}>
          {data.map((cardItem) => (
            <div
              key={cardItem.id}
              className="container col-xl-4 col-lg-6 col-md-6 col-sm-12 pb-4 d-flex flex-column justify-content-center align-items-center"
            >
              <a
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
                    <button
                      className="btn w-100"
                      onClick={() => openModal(cardItem)}
                      type="button"
                    >
                      Edit Details
                    </button>
                    <button
                      className="btn btn-danger danger-btn w-100 mt-2"
                      onClick={() => handleClick(cardItem)}
                      type="button"
                    >
                      Delete Pet
                    </button>
                  </div>
                </div>
              </a>
            </div>
          ))}

          {loading && (
              <>
              BeatLoader
              </>
          )
      
          }

          {/* Edit Modal */}
          {isModalOpen && (
            <div>
              <div
                className="modal-backdrop show"
                style={{ zIndex: 1040 }}
                onClick={closeModal}
              ></div>

              <div className="modal fade show" style={{ display: "block" }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5">
                        {selectedCard.pet_name}'s Details
                      </h1>
                      <button
                        className="btn-close"
                        onClick={closeModal}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <img
                        src={selectedCard.image_url1}
                        className="d-block mx-auto border img-thumbnail modal-image"
                      />
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3 px-2">
                          <label htmlFor="pet_name" className="form-label">
                            Pet Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="pet_name"
                            name="pet_name"
                            value={editedDetails.pet_name}
                            onChange={handleFormChange}
                          />
                        </div>

                        <div className="mb-3 px-2">
                          <label htmlFor="age" className="form-label">
                            Age
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="age"
                            name="age"
                            value={editedDetails.age}
                            onChange={handleFormChange}
                          />
                        </div>

                        <div className="mb-3 px-2">
                          <label htmlFor="gender" className="form-label">
                            Gender
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="gender"
                            name="gender"
                            value={editedDetails.gender}
                            onChange={handleFormChange}
                          />
                        </div>

                        <div className="mb-3 px-2">
                          <label
                            htmlFor="pet_personality"
                            className="form-label"
                          >
                            Pet Personality
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="pet_personality"
                            name="pet_personality"
                            value={editedDetails.pet_personality}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div className="modal-footer">
                          <button className="btn btn-lg btn-save" type="submit">
                            Save changes
                          </button>
                          <button className="btn btn-lg " onClick={closeModal}>
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

         
         {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div>
            <div
              className="modal-backdrop show"
              style={{ zIndex: 1040 }}
              onClick={closeDeleteModal}
            ></div>

            <div
              className="modal fade show"
              style={{ display: 'block' }}
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5">Delete Pet</h1>
                    <button className="btn-close" onClick={closeDeleteModal} aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                        Are you sure you want to delete <span className="fw-bold"> {selectedCard.pet_name}</span> ?

                      </div>
                      <div className="modal-footer">
                        <button className="btn btn-lg danger-btn" onClick={DeletePet}>Delete Pet</button>
                        <button className="btn btn-lg " onClick={closeDeleteModal}>Close</button>
                      </div>
                  </div>
              
                </div>
              </div>
            </div>
        )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;
