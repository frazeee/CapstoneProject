import { useEffect, useState } from "react";
import { supabase } from "../client";
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";
import "./PetList.css";

const PetList = () => {
  const [data, setData] = useState([]);
  const [adoptedPetsData, setAdoptedPetsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [shelterName, setShelterName] = useState("");
  const [renderedComponent, setRenderedComponent] = useState("All");

  const userData = Cookies.get("userSession");
  if (userData && userEmail == null) {
    const parsedUserData = JSON.parse(userData);
    const email = parsedUserData.data.user.email;
    setUserEmail(email);
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

        const sortedPetsData = petsData
          .slice()
          .sort((a, b) => a.id - b.id)
          .filter((pet) => !pet.is_adopted); // Filter out adopted pets

        const adoptedPetsData = petsData
          .slice()
          .sort((a, b) => a.id - b.id)
          .filter((pet) => pet.is_adopted); // Filter only adopted pets

        setShelterName(shelterName);
        setData(sortedPetsData);
        setAdoptedPetsData(adoptedPetsData);
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userEmail]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(editedDetails);
      const { data, error } = await supabase
        .from("Pets")
        .update({
          pet_name: editedDetails.pet_name,
          age: editedDetails.age,
          gender: editedDetails.gender,
          pet_type: editedDetails.pet_type,
          pet_personality: editedDetails.pet_personality,
          is_adopted: editedDetails.is_adopted
        })
        .eq("id", parseInt(selectedCard.id, 10))
        .single();

      if (error) {
        // Handle the error here
        console.error("Error updating user:", error);
      } else {
        // Update was successful
        console.log("Pet updated successfully:", data);
      }
    } catch (error) {
      // Handle any other errors that may occur during the update.
      console.error("An error occurred:", error);
    }

    closeModal();
    window.location.reload();
  };

  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);

  const handleClick = (cardItem) => {
    setSelectedCard(cardItem);
    setisDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setisDeleteModalOpen(false);
  };

  const DeletePet = async () => {
    try {
      console.log(selectedCard.id);
      setLoading(true);
      const { data, error } = await supabase
        .from("Pets")
        .delete()
        .eq("id", selectedCard.id);
      if (error) {
        console.error("Error deleting pet:", error);
      } else {
        console.log("Pet deleted successfully:", data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
      closeDeleteModal();
    }
  };

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const items = adoptedPetsData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <BeatLoader
          type="ThreeDots"
          color="#fee481"
          height={200}
          width={200}
          className="spinner"
        />
      </div>
    );
  }

  return (
    <>
      <div className="bg-color pt-5">
        {renderedComponent === "All" && (
          <>
            <div className="text-end">
              <a
                className="text-primary me-5"
                style={{
                  textDecorationLine: "underline",
                  textDecorationColor: "#ffbd59",
                }}
                onClick={() => setRenderedComponent("Adopted")}
              >
                Adopted Pets <i className="bi bi-arrow-right text-primary"></i>
              </a>
            </div>
            <h1 className="text-center">PETS FOR ADOPTION</h1>
            <hr />
            <div className="container my-3">
              <div className="row">
                {currentItems
                  .filter((cardItem) => !cardItem.is_adopted) // Filter out adopted pets
                  .map((cardItem) => (
                    <div
                      key={cardItem.id}
                      className="col-xl-4 col-lg-6 col-md-6 col-sm-12 pb-4"
                    >
                      <div className="container pb-4 d-flex flex-column justify-content-center align-items-center">
                        <div className="card shadow on-hover">
                          <div className="card-image-top">
                            <img
                              src={cardItem.image_url1}
                              alt={cardItem.pet_name}
                            />
                          </div>
                          <div className="card-title pt-3 text-center card-design">
                            <h2>{cardItem.pet_name}</h2>
                          </div>
                          <div className="card-body">
                            <p>
                              Age: {cardItem.age}{" "}
                              {cardItem.gender === "Male" ? (
                                <i className="icon bi bi-gender-male"></i>
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
                      </div>
                    </div>
                  ))}
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination pagination-lg justify-content-center">
                  {[...Array(totalPages).keys()].map((number) => (
                    <li
                      key={number + 1}
                      className={`page-item ${
                        number + 1 === currentPage ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(number + 1)}
                      >
                        {number + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        )}

        {renderedComponent === "Adopted" && (
          <>
            <div className="text-start">
              <a
                className="text-primary ms-5"
                style={{
                  textDecorationLine: "underline",
                  textDecorationColor: "#ffbd59",
                }}
                onClick={() => setRenderedComponent("All")}
              >
                <i className="bi bi-arrow-left text-primary"></i>Pets for
                Adoption
              </a>
            </div>
            <h1 className="text-center">ADOPTED PETS</h1>
            <hr />
            <div className="container my-3">
              <div className="row">
                {adoptedPetsData.map((cardItem) => (
                  <div
                    key={cardItem.id}
                    className="col-xl-4 col-lg-6 col-md-6 col-sm-12 pb-4"
                  >
                    <div className="container pb-4 d-flex flex-column justify-content-center align-items-center">
                      <div className="card shadow on-hover">
                        <div className="card-image-top">
                          <img
                            src={cardItem.image_url1}
                            alt={cardItem.pet_name}
                          />
                        </div>
                        <div className="card-title pt-3 text-center card-design">
                          <h2>{cardItem.pet_name}</h2>
                        </div>
                        <div className="card-body">
                          <p>
                            Age: {cardItem.age}{" "}
                            {cardItem.gender === "Male" ? (
                              <i className="icon bi bi-gender-male"></i>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

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

                      <div className="mb-3 px-2">
                        <label htmlFor="is_adopted" className="form-label">
                          Is Adopted
                        </label>
                        <select
                          className="form-select"
                          id="is_adopted"
                          name="is_adopted"
                          value={editedDetails.is_adopted.toString()} // Convert boolean to string
                          onChange={handleFormChange}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
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

            <div className="modal fade show" style={{ display: "block" }}>
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5">Delete Pet</h1>
                    <button
                      className="btn-close"
                      onClick={closeDeleteModal}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    Are you sure you want to delete{" "}
                    <span className="fw-bold"> {selectedCard.pet_name}</span> ?
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-lg danger-btn"
                      onClick={DeletePet}
                    >
                      Delete Pet
                    </button>
                    <button className="btn btn-lg " onClick={closeDeleteModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PetList;
