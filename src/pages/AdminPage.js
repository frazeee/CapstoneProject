import { useState, useEffect } from "react";
import './AdminPage.css'
import Navbar from "../components/Navbar";
import CPSSLogo from "../images/CPSSLogo.png"
import { supabase } from "../components/client";



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
 
    };

  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        
          try {
            
            const { data, error } = await supabase
              .from('Pets')
              .update({
               pet_name : editedDetails.pet_name,
               age : editedDetails.age,
               gender : editedDetails.gender,
               pet_type : editedDetails.pet_type,
               pet_personality : editedDetails.pet_personality
              })
              .eq('id', selectedCard.id);
              
    
      
            if (error) {
              // Handle the error here
              console.error('Error updating user:', error);
            } else {
              // Update was successful
              console.log(error)
              console.log('User updated successfully:', data);
              
            }
          } catch (error) {
            // Handle any other errors that may occur during the update.
            console.error('An error occurred:', error);
          }
      
        closeModal();
      };
      

      const [addFormData, setAddFormData] = useState({
        pet_name: '',
        age: '',
        gender: 'Male',
        petType: 'Dog',
        pet_personality: '',
      });
    

      const handleAddChange = (e) => {
        const { name, value } = e.target;
    
        // If the input is a file input, handle it differently
        if (e.target.type === 'file') {
          setFile(e.target.files[0]);
        } else {
          setAddFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
        console.log(addFormData)
      };

      const handleAddSubmit = async (e) => {
        e.preventDefault();
          try {

            if (!file) {
              alert('You must select an image to upload.')
            }
            
            const fileExt = file.name.split('.').pop()
            const fileName = `${addFormData.pet_name}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage.from('PetPictures').upload(filePath, file)

            if (uploadError) {
              throw uploadError
            }

            const { data: publicUrl, error: getUrlError } = await supabase.storage
            .from('PetPictures')
            .getPublicUrl(filePath)
    
          if (getUrlError) {
            throw getUrlError
          }

          setImageUrl(publicUrl)
          console.log(publicUrl.publicUrl)

          
          const { data, error } = await supabase
          .from('Pets')
          .insert([
            { pet_name: addFormData.pet_name, 
              age: addFormData.age,
              gender: addFormData.gender,
              pet_type: addFormData.petType,
              pet_personality: addFormData.pet_personality,
              image_url1: publicUrl.publicUrl},
          ])
          .select()

          if (error){
            throw error
          }
          else{
            alert("Pet added successfully!")
            document.getElementById("exampleModal").classList.remove("show");
          }

          } catch (error) {
            alert(error.message)
          }

          finally {
            setUploading(false)
          }
      
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
                  <button type="button" className="btn btn-lg btn-dark px-5" data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>
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
                <button type="button" class="btn danger-btn w-100 mt-2">Delete Pet</button>
              </div>
            </div>
            </a>
          </div>

        ))}



        {/* Edit Modal */}
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
                    <img src={selectedCard.image_url1} className="d-block mx-auto border modal-image"/>
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

         {/* Add Modal */}
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Pet</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={handleAddSubmit}>
                <div className="modal-body">
                  <div className="mb-3 px-2">
                      <label for="formFile" className="form-label">Add Pet Picture</label>
                      <input className="form-control" type="file" id="formFile" accept=".png, .jpg"  onChange={(e) => setFile(e.target.files[0])}/>
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
                                  onChange={handleAddChange}
                                  required
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
                                  onChange={handleAddChange}
                                  required
                                />
                              </div>

                              <div className="mb-3 px-2">
                              <label htmlFor="gender" className="form-label">
                                  Gender
                                </label>
                                  <select className="form-select" aria-label="Default select example" onChange={handleAddChange}>
                                      <option selected value="Male">Male</option>
                                      <option value="Female">Female</option>
                                  </select>
                              </div>

                              <div className="mb-3 px-2">
                              <label htmlFor="petType" className="form-label">
                                  Pet Type
                                </label>
                                  <select className="form-select" aria-label="Default select example" onChange={handleAddChange}>
                                      <option selected value="Dog">Dog</option>
                                      <option value="Cat">Cat</option>
                                  </select>
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
                                  onChange={handleAddChange}
                                  required
                                />
                              </div>


                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Add Pet</button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>





      </div>
    </div>

    </>
  );
};

export default AdminPage;
