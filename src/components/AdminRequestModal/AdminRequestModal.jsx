import { useEffect, useState } from "react";
import { supabase } from "../../components/client";
import "./AdminRequestModal.css";

function AdminRequestModal() {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    getRequestList();
  }, []);

  const getRequestList = async () => {
    try {
      const { data, error } = await supabase
        .from("Requests")
        .select(
          `
            *,
            Pets (
                id,
                pet_name
            )
            `
        )
        .eq("payment_status", "PAID");

      console.log(data);
      setRequestList(data);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-lg request-check-btn"
        data-bs-toggle="modal"
        data-bs-target="#adminRequestModal"
      >
        Check
      </button>

      <div
        class="modal fade admin-request-modal"
        id="adminRequestModal"
        tabindex="-1"
        aria-labelledby="adminRequestModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="adminRequestModalLabel">
                Requests
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body request-modal-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Pet Name</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Birthdate</th>
                    <th scope="col">Status</th>
                    <th scope="col">Occupation</th>
                    <th scope="col">Social Media</th>
                    <th scope="col">Alternate Contact First Name</th>
                    <th scope="col">Alternate Contact Last Name</th>
                    <th scope="col">Alternate Contact Phone Number</th>
                    <th scope="col">Alternate Contact Email</th>

                    <th scope="col">What prompted you to adopt a pet?</th>
                    <th scope="col">Have you adapted pet before?</th>
                    <th scope="col">What are you looking to adopt?</th>
                    <th scope="col">
                      Are you applying to adopt a specific shelter animal?
                    </th>
                    <th scope="col">Ideal Pet Description</th>
                    <th scope="col">What type of building do you live in?</th>
                    <th scope="col">Are you currently renting?</th>
                    <th scope="col">Who do you live with?</th>
                    <th scope="col">
                      Are members of your household allergic to animals?
                    </th>
                    <th scope="col">
                      Who will be responsible for feeding, grooming, and
                      generally caring for your pet?
                    </th>
                    <th scope="col">
                      Who will be financially responsible for your pet’s needs
                      (i.e. food, vet bills, etc.)?
                    </th>
                    <th scope="col">
                      Who will look after your pet if you go on vacation or in
                      case of emergency?
                    </th>
                    <th scope="col">
                      How many hours in an average workday will your pet be left
                      alone?
                    </th>
                    <th scope="col">
                      What steps will you take to introduce your new pet to
                      his/her new surroundings?
                    </th>
                    <th scope="col">
                      Does everyone in the family support your decision to adopt
                      a pet?
                    </th>
                    <th scope="col">Do you have other pets?</th>
                  </tr>
                </thead>
                <tbody>
                  {requestList.map((req) => (
                    <tr>
                      <th scope="row">{req.id}</th>
                      <td>{req.Pets.pet_name}</td>
                      <td>{req.first_name}</td>
                      <td>{req.last_name}</td>
                      <td>{req.address}</td>
                      <td>{req.phone_number}</td>
                      <td>{req.email}</td>
                      <td>{req.birthdate}</td>
                      <td>{req.status}</td>
                      <td>{req.occupation}</td>
                      <td>{req.soc_med}</td>
                      <td>{req.ac_first_name}</td>
                      <td>{req.ac_last_name}</td>
                      <td>{req.ac_phone_number}</td>
                      <td>{req.ac_email}</td>

                      <td>{req.q_source}</td>
                      <td>{req.had_adapted ? "Yes" : "No"}</td>
                      <td>{req.q_animal_type}</td>
                      <td>{req.q_is_specific_animal ? "Yes" : "No"}</td>
                      <td>{req.q_ideal_pet}</td>
                      <td>{req.q_building_type}</td>
                      <td>{req.q_is_renting ? "Yes" : "No"}</td>
                      <td>{req.q_living_with}</td>
                      <td>{req.q_is_allergic ? "Yes" : "No"}</td>
                      <td>{req.q_responsible_feeder}</td>
                      <td>{req.q_responsible_financial}</td>
                      <td>{req.q_look_after}</td>
                      <td>{req.q_hours_alone}</td>
                      <td>{req.q_introduce_steps}</td>
                      <td>{req.q_is_supported ? "Yes" : "No"}</td>
                      <td>{req.q_have_other_pets ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminRequestModal;
