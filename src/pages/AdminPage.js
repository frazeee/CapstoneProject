import "./AdminPage.css";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CPSSLogo from "../images/CPSSLogo.png"
import { supabase } from "../components/client";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



const AdminPage = () => {

    const [data, setData] = useState([])

    useEffect(() => {
      async function getData() {
        const { data, error } = await supabase.from('Pets').select('*')
        if (error) {
          console.log('Error getting data:', error.message)
        } else {
          setData(data)
          
        }
      }
      getData()
    }, [])

    let dataCount = data.length

    const [selectedCard, setSelectedCard] = useState({
      age: '',
      gender: '',
      pet_name: '',
      pet_personality: '',
    });
    const [editedDetails, setEditedDetails] = useState({
      age: '',
      gender: '',
      pet_name: '',
      pet_personality: '',
    });
  
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = (cardItem) => {
      setSelectedCard(cardItem);
      setEditedDetails({ ...cardItem });
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setSelectedCard({
        age: '',
        gender: '',
        pet_name: '',
        pet_personality: '',
      });
      setEditedDetails({
        age: '',
        gender: '',
        pet_name: '',
        pet_personality: '',
      });
      setIsModalOpen(false);
    };
  
    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setEditedDetails((prevEditedDetails) => ({
        ...prevEditedDetails,
        [name]: value,
      }));
      console.log(editedDetails)
    };


    const handleSubmit = (e) => {
      e.preventDefault();
  
      console.log(editedDetails === selectedCard)
      // Check if there are edited details
      if (hasEditedDetails()) {
        // Update the Supabase table with the edited details
        updateSupabaseTable();
      }
  
      closeModal();
    };
  
    const hasEditedDetails = () => {
      // Compare editedDetails with selectedCard to determine if there are changes
      return (
        editedDetails.age !== selectedCard.age ||
        editedDetails.gender !== selectedCard.gender ||
        editedDetails.pet_name !== selectedCard.pet_name ||
        editedDetails.pet_personality !== selectedCard.pet_personality
      );
    };
  
    const updateSupabaseTable = () => {
      console.log(editedDetails)
      console.log("updates table")
    };



  return (
    <>
      <Navbar />
      <div className="container my-5">
      <h1 className="text-center">Care For Paws Shelter Sanctuary - CPSS Inc</h1>
      <hr />
    </div>
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-12">
          <div className="card rounded-5  shadow" id="infoCard">
            <div className="card-body">
              <div className="row">
                <div className="box col-lg-4 text-center py-5">
                  <h1 style={{ color: '#ffffff' }}>{dataCount}</h1>
                  <h2 style={{ color: '#ffffff' }}>PETS FOR <br/> ADOPTION</h2>
                  <button type="button" className="btn btn-lg btn-dark px-5">Add</button>
                </div>
                <div className="box col-lg-4 text-center py-5">
                  <h1 style={{ color: '#ffffff' }}>1</h1>
                  <h2 style={{ color: '#ffffff' }}>POTENTIAL <br/> ADOPTERS</h2>
                  <button type="button" className="btn btn-lg btn-dark px-5">Check</button>
                </div>
                <div className="box col-lg-4 text-center py-5">
                  <h1 style={{ color: '#ffffff' }}>1</h1>
                  <h2 style={{ color: '#ffffff' }}>SCHEDULED INTERVIEWS</h2>
                  <button type="button" className="btn btn-lg btn-dark px-5">Check</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <h1 className="text-center">PETS FOR ADOPTION</h1>
    <hr className="mb-5"/>
    <div className="container">
    <div className="row" key={`row`}>
        {data.map((cardItem) => (
          <div key={cardItem.id} className="container col-xl-4 col-lg-6 col-md-6 col-sm-12 pb-4 d-flex flex-column justify-content-center align-items-center">  
            <a to={`/petPage/${cardItem.id}`} className="text-decoration-none">
            <div className="card shadow on-hover">
              <div className="card-image-top">
                <img src={cardItem.image_url1} alt={cardItem.pet_name} />
              </div>
              <div className="card-title pt-3 text-center card-design">
                <h2>{cardItem.pet_name}</h2>
              </div>
              <div className="card-body">
                <p>Age: {cardItem.age} {cardItem.gender === 'Male' ? <i className="icon bi bi-gender-male "></i> : <i className="icon bi bi-gender-female"></i>} </p>
                <p>Personality: {cardItem.pet_personality}</p>
                <button className="btn w-100"  onClick={() => openModal(cardItem)} type="button">Edit Details</button>
              </div>
            </div>
            </a>
          </div>

        ))}

{isModalOpen && (
        <div>
          <div
            className="modal-backdrop show"
            style={{ zIndex: 1040 }}
            onClick={closeModal}
          ></div>

          <div
            className="modal fade show"
            style={{ display: 'block' }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">{selectedCard.pet_name}'s Details</h1>
                  <button className="btn-close" onClick={closeModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <img src={selectedCard.image_url1} className="d-block mx-auto"/>
                  <form onSubmit={handleSubmit}>
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
                      <label htmlFor="pet_personality" className="form-label">
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
                      <button className="btn btn-lg btn-save" type="submit">Save changes</button>
                      <button className="btn btn-lg " onClick={closeModal}>Close</button>
                    </div>
                  </form>
                </div>
            
              </div>
            </div>
          </div>
        </div>
      )}

    

      </div>
    </div>

    </>
  );
};

export default AdminPage;
