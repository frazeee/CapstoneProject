import { useEffect, useState } from "react";
import { supabase } from "../../components/client";
import "./CheckRequestPage.css";
import { BeatLoader } from "react-spinners";
import Navbar from "../../components/Navbar";
import CheckApplicationFormModal from "../../components/CheckApplicationFormModal/CheckApplicationFormModal";
import emailjs from "emailjs-com";

function CheckRequestPage() {
  const [requestDetails, setRequestDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const currentUrl = window.location.href;

  // Split the URL by slashes and get the last part
  const dataId = currentUrl.split("/").pop();

  useEffect(() => {
    getRequestData();
  }, []);

  const getRequestData = async () => {
    setLoading(true);
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
        .eq("id", dataId);

      setRequestDetails(data);
      setSelectedStatus(data.adoption_status);
      setRequestEmail(data[0].email);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckPictures = () => {
    const url = requestDetails[0].q_house_pic;
    // Open the URL in a new tab
    window.open(url, "_blank");
  };

  const [getInfoModalShow, setGetInfoModalShow] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");

  //email for status for verification, interview done, and approved
  const sendProcessUpdateEmail = async (status, requestEmail) => {
    try {
      setLoading(true);
      let templateMessage;

      // Determine email template based on the status
      switch (status) {
        case "For Verification":
          templateMessage = `Hello ${requestDetails[0].first_name},

          Your adoption process for ${requestDetails[0].Pets.pet_name}  is now at the  "For Verification" stage. The respective shelter will review your submitted documents to ensure everything is in order.
          
          Thank you for your patience and cooperation.
          
          Best regards,
          BPUAdopt Team`;
          break;


        case "Interview Done":
          templateMessage = `Hello ${requestDetails[0].first_name},
          
            Congratulations! Your interview for the adoption of ${requestDetails[0].Pets.pet_name} is complete. We appreciate your time and cooperation throughout the process.
          
            The shelter will communicate with you regarding next steps in the adoption process.
          
            Best regards,
            BPUAdopt Team`;
          break;

        case "Approved":
          templateMessage = `Hello ${requestDetails[0].first_name},
            
              Great news! Your adoption request for ${requestDetails[0].Pets.pet_name} has been Approved. We are delighted to welcome you and your new furry friend to the BPUAdopt family!
            
              Further instructions for completing the adoption will be provided shortly.
            
              Best regards,
              BPUAdopt Team`;
          break;

        default:
          throw new Error("Invalid status");
      }

      const templateParams = {
        to_email: requestEmail,
        subject: selectedStatus,
        message: templateMessage,
        user: requestDetails.first_name,
        organization: "BPUAdopt",
      };

      await emailjs.send(
        "service_8r6eaxe",
        "template_email",
        templateParams,
        "-fD_Lzps7ypbyVDAa"
      );

      console.log("Process update email sent successfully");
    } catch (error) {
      console.error("Error sending process update email:", error);
    } finally {
      setLoading(false);
    }
  };

  //email for status rejected and for interview
  const handleGetInfoModalSubmit = async () => {
    try {
      setLoading(true);
      setGetInfoModalShow(false)
      let templateMessage;
  
      // Determine email template based on the status
      switch (selectedStatus) {
        case "For Interview":
          templateMessage = `Hello ${requestDetails[0].first_name},
  
            Your adoption process for ${requestDetails[0].Pets.pet_name} is now at the "For Interview" stage. We will be conducting an interview as part of the adoption process. Please be prepared for a discussion about your suitability as a pet owner.
  
            Interview Date and Time: ${additionalInfo}
  
            If you have any concerns or if the scheduled interview time is inconvenient, kindly contact the shelter.
            
            Thank you for your cooperation.
  
            Best regards,
            BPUAdopt Team`;
          break;
  
        case "Rejected":
          templateMessage = `Hello ${requestDetails[0].first_name},
              
              We regret to inform you that your adoption request for ${requestDetails[0].Pets.pet_name} has been Rejected. We appreciate your interest in adopting from us and encourage you to consider other pets in the future.
            
              Reason for Rejection: ${additionalInfo}
  
              If you have any questions or concerns, feel free to reach out to us.
            
              Best regards,
              BPUAdopt Team`;
          break;
  
        default:
          throw new Error("Invalid status");
      }
  
      const templateParams = {
        to_email: requestEmail,
        subject: selectedStatus,
        message: templateMessage,
        user: requestDetails.first_name,
        organization: "BPUAdopt",
      };
  
      await emailjs.send(
        "service_8r6eaxe",
        "template_email",
        templateParams,
        "-fD_Lzps7ypbyVDAa"
      );
  
      setModalMessage(
        `Record updated successfully! An email has been sent to ${requestEmail}`
      );
      setShowModal(true);
  
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
      setAdditionalInfo("")
    }
  };
  

  const handleStatusUpdate = async () => {
    try {
      setLoading(true);
  
      const { data, error } = await supabase
        .from("Requests")
        .update({ adoption_status: selectedStatus })
        .eq("id", dataId)
        .select();
  
      if (data) {
        if (selectedStatus === "For Interview" || selectedStatus === "Rejected") {
          anotherFunction(selectedStatus);
          return; // Exit the handleStatusUpdate function
        }
  
        if (selectedStatus === "Approved") {
          await handleApproval(); // Wait for handleApproval to complete
          await sendProcessUpdateEmail(
            selectedStatus,
            requestEmail,
          );
          setModalMessage(
            `Record updated successfully! An email has been sent to ${requestEmail}`
          );
          setShowModal(true);
          return; // Exit the handleStatusUpdate function
        }
  
        // For other status updates
        await sendProcessUpdateEmail(
          selectedStatus,
          requestEmail,
        );
        setModalMessage(
          `Record updated successfully! An email has been sent to ${requestEmail}`
        );
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setModalMessage("Error updating record.");
    } finally {
      setLoading(false);
    }
  };
  
 
  const anotherFunction = (status) => {
    setGetInfoModalShow(true)
  };

  const handleApproval = async () => {
    try {
      // Update the Pets table in Supabase
      const { data, error } = await supabase
        .from('Pets')
        .update({ is_adopted: true }) 
        .eq('id', requestDetails[0].Pets.id); 
  
      if (error) {
        throw error;
      }
  
      console.log('Pet approved successfully:', data);
      
  
    } catch (error) {
      console.error('Error approving pet:', error.message);
  
    }
  };
  
  

  if (loading) {
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <BeatLoader
          type="ThreeDots"
          color="#fee481"
          height={200}
          width={200}
          className="spinner"
        />
      </div>
    </>;
  }

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <div className="card my-3">
          <h1 className="text-center fw-semibold mt-3">
            Check Adoption Request
          </h1>
          <hr className="w-75 px-5 align-self-center" />
          <div className="card-body">
            {requestDetails.map((data) => (
              <>
                <div className="row">
                  <div className="col-xl-6">
                    <h2 className="text-primary">Adopters Details</h2>
                    <div className="form-group">
                      <label className="fs-5">
                        <strong>Adopters Name:</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={`${data.last_name}, ${data.first_name}`}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label className="fs-5">
                        <strong>Adopters Email:</strong>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={`${data.email}`}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label className="fs-5">
                        <strong>Adopters Contact Number:</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={`${data.phone_number}`}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label className="fs-5">
                        <strong>Adopters Occupation:</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={`${data.occupation}`}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <h2 className="text-primary">Adoption Status</h2>
                    <div className="form-group">
                      <label className="fs-5">
                        <strong>Pet To be Adopted:</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={`${data.Pets.pet_name}`}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label className="fs-5">
                        <strong>Interview Date:</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={new Date(
                          data.interview_date
                        ).toLocaleDateString()}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label className="fs-5">
                        <strong>Payment Status:</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={`${data.payment_status}`}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label className="fs-5">
                        <strong>Adoption Status:</strong>
                      </label>
                      <select
                        className="form-select"
                        defaultValue={data.adoption_status}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="For Verification">
                          For Verification
                        </option>
                        <option value="For Interview">For Interview</option>
                        <option value="Interview Done">Interview Done</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    <div className="d-flex justify-content-end">
                      <CheckApplicationFormModal
                        requestDetails={requestDetails[0]}
                      />
                      <button
                        type="button"
                        className="btn btn-lg ms-3"
                        onClick={handleCheckPictures}
                      >
                        Check Pictures
                      </button>
                      <button
                        type="button"
                        className="btn btn-lg ms-3"
                        onClick={handleStatusUpdate}
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div>
          <div className="modal-backdrop show"></div>
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Adoption Status</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">{modalMessage}</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {getInfoModalShow && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedStatus === "For Interview"
                    ? "Interview Details"
                    : "Rejection Reason"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setGetInfoModalShow(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    {selectedStatus === "For Interview"
                      ? "Interview Date and Time"
                      : "Rejection Reason"}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleGetInfoModalSubmit()}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setGetInfoModalShow(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckRequestPage;
