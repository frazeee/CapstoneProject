import { useEffect, useState } from "react";
import { supabase } from "../../components/client";
import "./CheckApplicationFormModal.css";
import { Link } from "react-router-dom";

function CheckApplicationFormModal(requestDetails) {
  const [data, setData] = useState(requestDetails.requestDetails);
  console.log(data);

  return (
    <>
      <button
        type="button"
        class="btn btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#adminRequestModal"
      >
        Check Application Form
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
                Application Form
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body request-modal-body">
              <h1 className="text-primary text-center fw-medium">
                Questionnaire
              </h1>
              <hr
                className="mb-3"
                style={{ color: "black", backgroundColor: "black" }}
              />
              <span className="mb-2">What prompted you to adopt a pet?</span>
              <div className="form-check">
                <input
                  className="form-control mb-1"
                  type="text"
                  value={data.q_source}
                  readOnly
                />
              </div>
              <span className="mb-2">Have you adopted pet before?</span>
              <div className="form-check">
                <input
                  className="form-control mb-1"
                  type="text"
                  value={data.q_had_adapted ? "Yes" : "No"}
                  readOnly
                />
              </div>
              <span className="mb-2">
                What type of building do you live in?
              </span>
              <div className="form-check">
                <input
                  className="form-control mb-1"
                  type="text"
                  value={data.q_building_type}
                  readOnly
                />
              </div>
              <span className="mb-2">Are you currently renting?</span>
              <div className="form-check">
                <input
                  className="form-control mb-1"
                  type="text"
                  value={data.q_renting ? "Yes" : "No"}
                  readOnly
                />
              </div>
              <span className="mb-2">Who do you live with?</span>
              <div className="form-check">
                <input
                  className="form-control mb-1"
                  type="text"
                  value={data.q_living_with}
                  readOnly
                />
              </div>
              <span className="mb-2">
                Are members of your household allergic to animals?
              </span>
              <div className="form-check">
                <input
                  className="form-control mb-1"
                  type="text"
                  value={data.q_is_allergic ? "Yes" : "No"}
                  readOnly
                />
              </div>

              {data.q_is_allergic === true && (
                <div>
                  <span className="mb-2">
                    Even if members of your family have allergies, are you still
                    willing to adopt a pet?
                  </span>
                  <div className="form-check">
                    <input
                      className="form-control mb-1"
                      type="text"
                      value={data.q_willing_to_allergies ? "Yes" : "No"}
                      readOnly
                    />
                  </div>
                </div>
              )}

              <span className="mb-2">
                {" "}
                Who will be responsible for feeding, grooming, and generally
                caring for your pet?
              </span>
              <div className="form-check">
                <input
                  className="form-control mb-1"
                  type="text"
                  value={data.q_responsible_feeder}
                  readOnly
                />
              </div>
              <span className="mb-2">
                Who will be financially responsible for your pet’s needs?
              </span>
              <div className="form-check">
                <input
                  className="form-control mb-1"
                  type="text"
                  value={data.q_responsible_financial}
                  readOnly
                />
              </div>
              <span className="mb-2">
                How many hours in an average workday will your pet be left
                alone?
              </span>
              <div className="form-check">
                <input
                  className="form-control mb-1"
                  type="text"
                  value={data.q_hours_alone}
                  readOnly
                />
              </div>
              <span className="mb-2">
                {" "}
                Who will look after your pet if you go on vacation or in case of
                emergency?
              </span>
              <div className="form-check">
                <input
                  className="form-control mb-1"
                  type="text"
                  value={data.q_look_after}
                  readOnly
                />
              </div>
              <span className="mb-2">
                {" "}
                What steps will you take to introduce your new pet to his/her
                new surroundings?
              </span>
              <div className="form-check">
                <input
                  className="form-control mb-1"
                  type="text"
                  value={data.q_introduce_steps}
                  readOnly
                />
              </div>
              <span className="mb-2">
                {" "}
                Does everyone in the family support your decision to adopt a
                pet?
              </span>
              <div className="form-check">
                <input
                  className="form-control mb-1"
                  type="text"
                  value={data.q_is_supported ? "Yes" : "No"}
                  readOnly
                />
              </div>
              <span className="mb-4">Do you have other pets?</span>
              <div className="form-check">
                <input
                  className="form-control mb-1"
                  type="text"
                  value={data.q_have_other_pets ? "Yes" : "No"}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckApplicationFormModal;
