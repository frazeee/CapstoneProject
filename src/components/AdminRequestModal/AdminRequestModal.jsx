import { useEffect, useState } from "react";
import { supabase } from "../../components/client";
import "./AdminRequestModal.css";
import { Link } from "react-router-dom";

function AdminRequestModal({ shelterName }) {
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
        .eq("shelter_from", shelterName);

      setRequestList(data);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };


  const [activeStatus, setActiveStatus] = useState("For Verification");

  const handleStatusChange = async (status) => {
    setActiveStatus(status)
  };

  


  return (
    <>
      <button
        type="button"
        className="btn btn-lg request-check-btn"
        data-bs-toggle="modal"
        data-bs-target="#adminRequestModal"
      >
        Check
      </button>

      <div
        className="modal fade admin-request-modal"
        id="adminRequestModal"
        tabindex="-1"
        aria-labelledby="adminRequestModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="adminRequestModalLabel">
                Requests
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body request-modal-body">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link text-primary" aria-current="page" onClick={() => handleStatusChange("For Verification")}>
                    For Verification
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-primary" onClick={() => handleStatusChange("For Interview")}>
                    For Interview
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-primary" onClick={() => handleStatusChange("Interview Done")}>
                    Interview Done
                  </a>
                </li>
              
              </ul>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Pet Name</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Email</th>
                      <th scope="col">Status</th>
                      <th scope="col">Check Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestList
                    .filter(req => req.adoption_status === activeStatus)
                    .map((req) => (
                      <tr>
                        <td>{req.Pets.pet_name}</td>
                        <td>{req.first_name}</td>
                        <td>{req.last_name}</td>
                        <td>{req.phone_number}</td>
                        <td>{req.email}</td>
                        <td
                          className={`badge mt-2 mx-3 ${
                            req.adoption_status === "For Verification"
                              ? "text-bg-primary"
                              : req.adoption_status === "For Interview"
                              ? "text-bg-primary"
                              : req.adoption_status === "Interview Done"
                              ? "text-light text-bg-info"
                              : req.adoption_status === "Approved"
                              ? "text-bg-success"
                              : req.adoption_status === "Rejected" &&
                                "text-bg-danger"
                          }`}
                        >
                          {req.adoption_status}
                        </td>
                        <td>
                          <Link to={`/CheckApplication/${req.id}`}>
                            <span
                              className=" ms-2 check-link"
                              data-bs-dismiss="modal"
                            >
                              Check Application
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminRequestModal;
