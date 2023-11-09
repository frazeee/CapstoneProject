import { supabase } from "../components/client";
import AdoptionForm from "./AdoptionForm/AdoptionForm";

const ApplicationForm = () => {
  //child component
  const handleCallback = (childData) => {
    // Update the name in the component's state
    console.log(childData);
    saveData(childData);
  };

  async function saveData(payload) {
    const { data, error } = await supabase.from("Requests").insert([
      {
        first_name: payload.firstName,
        last_name: payload.lastName,
        address: payload.address,
        phone_number: payload.phone,
        email: payload.email,
        pet_id: 1, // TO DO: Replace with the pet adapting id
        birthdate: payload.birthdate,
        status: payload.status,
        occupation: payload.occupation,
        soc_med: payload.socialMedia,
        // source: payload.source,
        had_adapted: payload.hadAdapted === "Yes" ? true : false,
      },
    ]);

    if (error) {
      throw error;
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card my-5 rounded-5 ">
            <div className="card-body">
              <h1 className="text-center">Adoption Form</h1>
              <hr className="w-100" />
              <AdoptionForm parentCallback={handleCallback}></AdoptionForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
