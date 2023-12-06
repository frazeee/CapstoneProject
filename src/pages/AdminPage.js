import { useEffect, useState } from "react";
import AdminInterviewModal from "../components/AdminInterviewModal/AdminInterviewModal";
import AdminRequestModal from "../components/AdminRequestModal/AdminRequestModal";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import { supabase } from "../components/client";
import './AdminPage.css';
import AddPetModal from "../components/AddPetModal/AddPetModal";
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";
import PetList from "../components/PetList/PetList";
import AdoptionHistory from "../components/AdoptionHistory/AdoptionHistory";
 
const AdminPage = () => {
  const [data, setData] = useState([]);
  const [requestListData, setRequestListData] = useState(0);
  const [requestListCount, setRequestListCount] = useState(0);
  const [interviewListCount, setInterviewListCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [shelterName, setShelterName] = useState("");

  const userData = Cookies.get('userSession')
  if(userData && userEmail == null){
      const parsedUserData = JSON.parse(userData);
      const email = parsedUserData.data.user.email;
      setUserEmail(email)
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
  
  
        // Get Request List
        const { data: requestListData, error: requestListError } = await supabase
          .from("Requests")
          .select("*")
          .eq("shelter_from", shelterName);
  
        if (requestListError) {
          throw requestListError;
        }
  
        // Get Interview List
        const currentDate = new Date();
        const { data: interviewListData, error: interviewListError } = await supabase
          .from("Requests")
          .select()
          .eq("shelter_from", shelterName)
          .gt("interview_date", currentDate.toISOString());
  
        if (interviewListError) {
          throw interviewListError;
        }
        setData(petsData);
        setShelterName(shelterName);
        setRequestListData(requestListData)
        setRequestListCount(calculateCount(requestListData))
        setInterviewListCount(interviewListData.length);
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, [userEmail]); // Add userEmail to the dependency array if it's used inside the effect

  const calculateCount = (requests) => {
    const filteredRequests = requests.filter(
      (req) => req.adoption_status !== "Approved" && req.adoption_status !== "Rejected"
    );
    return filteredRequests.length;
  };
  
  let dataCount = data.length

      if (loading) {
        return (
          <div className="d-flex justify-content-center align-items-center">
          <BeatLoader type="ThreeDots" color="#fee481" height={200} width={200} className="spinner" />
        </div>
        );
      }

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h1 className="text-center">{shelterName || 'Default Shelter Name'}</h1>
        <hr />
      </div>
      <div className="admin-page container my-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="card rounded-5  shadow" id="infoCard">
              <div className="card-body">
                <div className="row">
                  <div className="box col-lg-4 text-center py-5">
                    <h1 style={{ color: "#ffffff" }}>{dataCount}</h1>
                    <h2 style={{ color: "#ffffff" }}>
                      PETS FOR <br /> ADOPTION
                    </h2>
                    <AddPetModal shelterName={shelterName}/>
                  </div>
                  <div className="box col-lg-4 text-center py-5">
                    <h1 style={{ color: "#ffffff" }}>{requestListCount}</h1>
                    <h2 style={{ color: "#ffffff" }}>
                      POTENTIAL <br /> ADOPTERS
                    </h2>
                    <AdminRequestModal shelterName={shelterName}/>
                  </div>
                  <div className="box col-lg-4 text-center py-5">
                    <h1 style={{ color: "#ffffff" }}>{interviewListCount}</h1>
                    <h2 style={{ color: "#ffffff" }}>SCHEDULED INTERVIEWS</h2>
                    <AdminInterviewModal shelterName={shelterName}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PetList/>
      <AdoptionHistory shelterName={shelterName}/>
      <Footer />
    </>
  );
};

export default AdminPage;
