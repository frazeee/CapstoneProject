import { useState, useEffect } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import ReportGeneration from "../../utils/ReportGeneration";

const AdoptionHistory = ({ shelterName }) => {
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

      console.log(data)
      setRequestList(data);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const [activeStatus, setActiveStatus] = useState("All");

  const handleStatusChange = async (status) => {
    setActiveStatus(status);
  };

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">ADOPTION HISTORY</h1>
      <hr />
      <div className="card w-100 mt-3">
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchInputChange}
          ></input>
        </div>
        <div className="card-body text-dark">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a
                class="nav-link text-primary"
                aria-current="page"
                onClick={() => handleStatusChange("All")}
              >
                All
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-primary"
                aria-current="page"
                onClick={() => handleStatusChange("For Verification")}
              >
                For Verification
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-primary"
                onClick={() => handleStatusChange("For Interview")}
              >
                For Interview
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-primary"
                onClick={() => handleStatusChange("Interview Done")}
              >
                Interview Done
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-primary"
                onClick={() => handleStatusChange("Approved")}
              >
                Approved
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-primary"
                onClick={() => handleStatusChange("Rejected")}
              >
                Rejected
              </a>
            </li>
          </ul>
          <div className="table-responsive">
            <table class="table">
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
                  .filter(
                    (req) =>
                      (activeStatus === "All" ||
                        req.adoption_status === activeStatus) &&
                      (searchInput.trim() === "" ||
                        req.first_name
                          .toLowerCase()
                          .includes(searchInput.toLowerCase()) ||
                        req.last_name
                          .toLowerCase()
                          .includes(searchInput.toLowerCase()) ||
                        req.email
                          .toLowerCase()
                          .includes(searchInput.toLowerCase()) ||
                        req.Pets.pet_name
                          .toLowerCase()
                          .includes(searchInput.toLowerCase()))
                  )
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
        <ReportGeneration data={requestList}/>
      </div>
    </div>
  );
};

export default AdoptionHistory;
