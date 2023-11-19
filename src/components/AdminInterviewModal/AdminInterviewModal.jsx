import { useEffect, useState } from "react";
import { supabase } from "../../components/client";
import "./AdminInterviewModal.css";

function AdminInterviewModal({shelterName}) {
  const [interviewLsit, setInterviewList] = useState([]);

  useEffect(() => {
    getInterviewList();
  }, []);

  const transformDateTime = (dateString) => {
    const dateTime = new Date(dateString);
    return `${dateTime.toLocaleDateString()}, ${dateTime.toLocaleTimeString()}`;
  };

  const getInterviewList = async () => {
    try {
      const currentDate = new Date();
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
        .gt("interview_date", currentDate.toISOString())
        .order("interview_date")
        .eq("shelter_from", shelterName)

      setInterviewList(data);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };


  return (
    <>
      <button
        type="button"
        class="btn btn-lg interview-check-btn"
        data-bs-toggle="modal"
        data-bs-target="#adminInterviewModal"
      >
        Check
      </button>

      <div
        class="modal fade"
        id="adminInterviewModal"
        tabindex="-1"
        aria-labelledby="adminInterviewModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="adminInterviewModalLabel">
                Upcoming Interviews
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="modal-body interview-modal-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Pet Name</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Email</th>
                      <th scope="col">Interview Schedule (mm//dd/yyy)</th>
                      <th scope="col">Social Media</th>
                      <th scope="col">Had Adopted</th>
                      <th scope="col">Payment Status</th>
                      <th scope="col">Alternate Contact First Name</th>
                      <th scope="col">Alternate Contact Last Name</th>
                      <th scope="col">Alternate Contact Phone Number</th>
                      <th scope="col">Alternate Contact Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviewLsit.map((req) => (
                      <tr>
                        <th scope="row">{req.id}</th>
                        <td>{req.Pets.pet_name}</td>
                        <td>{req.first_name}</td>
                        <td>{req.last_name}</td>
                        <td>{req.phone_number}</td>
                        <td>{req.email}</td>
                        <td>
                          {req.interview_date
                            ? transformDateTime(req.interview_date)
                            : ""}
                        </td>
                        <td>{req.soc_med}</td>
                        <td>{req.had_adapted ? "Yes" : "No"}</td>
                        <td>{req.payment_status}</td>
                        <td>{req.ac_first_name}</td>
                        <td>{req.ac_last_name}</td>
                        <td>{req.ac_phone_number}</td>
                        <td>{req.ac_email}</td>
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

export default AdminInterviewModal;
