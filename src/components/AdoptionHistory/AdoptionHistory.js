import { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import ReportGeneration from "../../utils/ReportGeneration";
import PDFGeneration from "../../utils/PDFGeneration";
import ReportsGeneration from "../ReportsGeneration/ReportsGeneration";
import DateRangePicker from "../../utils/DateRangePicker";
import emailjs from "emailjs-com";

const AdoptionHistory = ({ shelterName }) => {
  const [requestList, setRequestList] = useState([]);
  const [reason, setReason] = useState("");

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
                pet_name,
                pet_type
            )
            `
        )
        .eq("shelter_from", shelterName);
      setRequestList(data);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from("Users")
          .select("email, is_Restricted");

        if (error) {
          throw error;
        }

        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const [activeStatus, setActiveStatus] = useState("All");

  const handleStatusChange = async (status) => {
    setActiveStatus(status);
  };

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const [selectedDate, setSelectedDate] = useState("");

  const handleSelectRange = (range) => {
    setSelectedDate(range);
  };

  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    const filteredData = requestList
      .filter(
        (req) =>
          (activeStatus === "All" || req.adoption_status === activeStatus) &&
          (searchInput.trim() === "" ||
            req.first_name.toLowerCase().includes(searchInput.toLowerCase()) ||
            req.last_name.toLowerCase().includes(searchInput.toLowerCase()) ||
            req.email.toLowerCase().includes(searchInput.toLowerCase()) ||
            req.Pets.pet_name
              .toLowerCase()
              .includes(searchInput.toLowerCase())) &&
          (!selectedDate || selectedDate[0] <= req.created_at) &&
          (!selectedDate[1] || req.created_at <= selectedDate[1])
      )
      .map((req) => ({
        ...req,
        formattedDate: new Date(req.created_at).toLocaleString(),
      }));

    setFilteredRequests(filteredData);
  }, [requestList, activeStatus, searchInput, selectedDate]);

  const [renderedComponent, setRenderedComponent] = useState("History");

  const [showRestrictionModal, setShowRestrictionModal] = useState(false);
  const [showUnrestrictionModal, setShowUnrestrictionModal] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleConfirmRestriction = async (email, e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const { data, error } = await supabase
        .from("Users")
        .update({ is_Restricted: true })
        .eq("email", email)
        .select();

      if (error) {
        console.error("Error restricting user:", error.message);
      } else {
        console.log("User restricted successfully:", data);
        // Add any additional logic here
      }
      setUserData((prevUserData) =>
        prevUserData.map((user) =>
          user.email === email ? { ...user, is_Restricted: true } : user
        )
      );
      const templateParams = {
        to_email: email,
        message: `Dear valued user,
  
        We regret to inform you that your account has been temporarily restricted due to a violation of our platform's policies. We take the enforcement of our policies seriously to ensure a safe and positive experience for all users.
        
        Reason of Restriction: ${reason}
        
        During this restriction period, you will be unable to access certain features of our platform, including the ability to apply for adoptions. We understand that this may be disappointing.
        
        If you believe this restriction was made in error or have any questions regarding the matter, please don't hesitate to reach out to our support team. 
        Thank you for your understanding and cooperation.
        
        Best regards,
        BPUAdopt Team`,
      };

      const serviceId = "service_8r6eaxe";
      const templateId = "template_restriction";
      const userId = "-fD_Lzps7ypbyVDAa";

      emailjs
        .send(serviceId, templateId, templateParams, userId)
        .then((response) => {
          console.log("Email sent:", response);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    } catch (error) {
      console.error("Error restricting user:", error.message);
    }
    setShowRestrictionModal(false);
  };

  const handleConfirmUnrestriction = async (email) => {
    try {
      const { data, error } = await supabase
        .from("Users")
        .update({ is_Restricted: false })
        .eq("email", email)
        .select();

      if (error) {
        console.error("Error unrestricting user:", error.message);
      } else {
        console.log("User unrestricted successfully:", data);
      }
      setUserData((prevUserData) =>
        prevUserData.map((user) =>
          user.email === email ? { ...user, is_Restricted: false } : user
        )
      );
      const templateParams = {
        to_email: email,
        message: `Dear valued user,

        We are pleased to inform you that the restriction on your account has been lifted. We understand that there may have been circumstances leading to the restriction, and we appreciate your cooperation and understanding throughout this process.
        
        Your commitment to our community is valued, and we believe in second chances. By lifting the restriction, you now have the opportunity to continue engaging with our platform and accessing all features, including the ability to apply for adoptions.
        
        Thank you for your understanding and cooperation. 
        
        Best regards,
        BPUAdopt Team`,
      };

      const serviceId = "service_8r6eaxe";
      const templateId = "template_restriction";
      const userId = "-fD_Lzps7ypbyVDAa";

      emailjs
        .send(serviceId, templateId, templateParams, userId)
        .then((response) => {
          console.log("Email sent:", response);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    } catch (error) {
      console.error("Error unrestricting user:", error.message);
    }
    setShowUnrestrictionModal(false);
  };

  const handleRestrictUser = (email) => {
    setSelectedUserEmail(email);
    setShowRestrictionModal(true);
  };

  const handleUnrestrictUser = (email) => {
    setSelectedUserEmail(email);
    setShowUnrestrictionModal(true);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRequest = currentPage * 10;
  const indexOfFirstRequest = indexOfLastRequest - 10;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-5">
      {renderedComponent === "History" && (
        <>
          <a
            className="text-end"
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "#ffbd59",
            }}
            onClick={() => setRenderedComponent("Reports")}
          >
            <p className="text-primary">
              {" "}
              To Reports <i class="bi bi-arrow-right text-primary"></i>
            </p>
          </a>

          <div>
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

                  <div className="d-flex ms-auto w-25">
                    <DateRangePicker onSelect={handleSelectRange} />
                  </div>
                </ul>

                <div className="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Pet Name</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Date Created</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Check Application</th>
                        <th scope="col">Restrict User</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRequests.map((req) => {
                        // Find the user in userData array
                        const user = userData.find(
                          (user) => user.email === req.email
                        );

                        // Render the table row
                        return (
                          <tr key={req.id}>
                            <td>{req.Pets.pet_name}</td>
                            <td>{req.first_name}</td>
                            <td>{req.last_name}</td>
                            <td>{new Date(req.created_at).toLocaleString()}</td>
                            <td>{req.email}</td>
                            <td
                              className={`badge w-75 mt-2 mx-3 ${
                                req.adoption_status === "For Verification" ||
                                req.adoption_status === "For Interview"
                                  ? "text-bg-primary"
                                  : req.adoption_status === "Interview Done"
                                  ? "text-light text-bg-info"
                                  : req.adoption_status === "Approved"
                                  ? "text-bg-success"
                                  : req.adoption_status === "Adopted"
                                  ? "text-bg-secondary"
                                  : req.adoption_status === "Rejected" &&
                                    "text-bg-danger"
                              }`}
                            >
                              {req.adoption_status}
                            </td>
                            <td>
                              <Link to={`/CheckApplication/${req.id}`}>
                                <span
                                  className="ms-2 check-link"
                                  data-bs-dismiss="modal"
                                >
                                  Check Application
                                </span>
                              </Link>
                            </td>
                            <td>
                              {userData.map(
                                (user) =>
                                  user.email === req.email &&
                                  (user.is_Restricted ? (
                                    <button
                                      className="text-danger"
                                      style={{
                                        backgroundColor: "transparent",
                                        height: "auto",
                                        width: "110px",
                                        border: "none",
                                        textDecoration: "underline",
                                      }}
                                      onClick={() =>
                                        handleUnrestrictUser(user.email)
                                      }
                                    >
                                      Unrestrict
                                    </button>
                                  ) : (
                                    <button
                                      className="text-danger"
                                      style={{
                                        backgroundColor: "transparent",
                                        height: "auto",
                                        width: "110px",
                                        border: "none",
                                        textDecoration: "underline",
                                      }}
                                      onClick={() =>
                                        handleRestrictUser(user.email)
                                      }
                                    >
                                      Restrict
                                    </button>
                                  ))
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <nav>
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                    >
                      &laquo;
                    </button>
                  </li>
                  {Array.from({
                    length: Math.ceil(filteredRequests.length / 10),
                  }).map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === Math.ceil(filteredRequests.length / 10)
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
              <ReportGeneration data={requestList} />
              <PDFGeneration
                data={filteredRequests}
                shelterName={shelterName}
                activeStatus={activeStatus}
                dateRange={selectedDate}
              />
            </div>
          </div>
        </>
      )}

      {renderedComponent === "Reports" && (
        <>
          <p
            className="text-start"
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "#ffbd59",
            }}
            onClick={() => setRenderedComponent("History")}
          >
            <i class="bi bi-arrow-left text-primary"></i>
            <a className="text-primary"> To History</a>{" "}
          </p>
          <ReportsGeneration data={requestList} shelterName={shelterName} />
        </>
      )}
      <>
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: showRestrictionModal ? "block" : "none" }}
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Restrict User?</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowRestrictionModal(false)}
                ></button>
              </div>
              <form
                onSubmit={(e) => handleConfirmRestriction(selectedUserEmail, e)}
              >
                <div class="modal-body">
                  <p>
                    Are you sure you want to restrict user with email:{" "}
                    {selectedUserEmail}
                  </p>

                  <p>If yes, kindly add a reason of restriction:</p>
                  <input
                    className="form-control"
                    required
                    value={reason}
                    onChange={handleChange}
                    placeholder="Reason of Restriction"
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="submit"
                    class="btn btn-danger"
                    style={{ backgroundColor: "red" }}
                  >
                    Restrict
                  </button>

                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => setShowRestrictionModal(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: showUnrestrictionModal ? "block" : "none" }}
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Unrestrict User?</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowRestrictionModal(false)}
                ></button>
              </div>
              <div class="modal-body">
                <p>
                  Are you sure you want to unrestrict user with email:{" "}
                  {selectedUserEmail}
                </p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  style={{ backgroundColor: "red" }}
                  onClick={() => handleConfirmUnrestriction(selectedUserEmail)}
                >
                  Unrestrict
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowUnrestrictionModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default AdoptionHistory;
