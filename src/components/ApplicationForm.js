import { supabase } from "../components/client";
import AdoptionForm from "./AdoptionForm/AdoptionForm";

const ApplicationForm = () => {
  const currentUrl = window.location.href;

  // Split the URL by slashes and get the last part
  const petId = currentUrl.split("/").pop();

  //child component
  const handleCallback = (childData) => {
    handleFileChange(childData);
  };

  const openGateway = async (requestId) => {
    try {
      // TO DO: Move this to .env
      // Replace this with your secret key in paymongo account
      const paymongoSecretKey = "sk_test_N5d44ZGz6gy6nGCcB6z3PrAF";
      // Replace this env + 'payment-success'

      const successPage =
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/payment-success/${requestId}`
          : `https://bpuadopt.vercel.app/payment-success/${requestId}`;

      const payload = {
        data: {
          attributes: {
            send_email_receipt: false,
            show_description: false,
            show_line_items: true,
            payment_method_types: [
              "atome",
              "card",
              "dob",
              "paymaya",
              "billease",
              "gcash",
              "grab_pay",
            ],
            line_items: [
              {
                name: "Adoption Fee",
                quantity: 1,
                amount: 50000, // Amount in cents (e.g., $50.00 is represented as 5000)
                currency: "PHP",
              },
              // Add more items as needed
            ],
            success_url: successPage,
          },
        },
      };

      const response = await fetch(
        "https://api.paymongo.com/v1/checkout_sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(paymongoSecretKey + ":")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Open gateway to new tab
        window.location.replace(data.data.attributes.checkout_url, "_blank");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const interviewDatetime = (payload) => {
    const zoomDate = payload.zoomDate;
    const zoomMeridiem = payload.zoomMeridiem;
    const zoomMinutes = payload.zoomMinutes;
    const zoomTime = payload.zoomTime;

    console.log(zoomMeridiem === "PM");

    // Parse the date and time values
    const date = new Date(zoomDate);
    const hours = parseInt(zoomTime, 10) + (zoomMeridiem === "PM" ? 12 : 0);
    const minutes = parseInt(zoomMinutes, 10);

    // Set the time in the Date object
    date.setHours(hours, minutes);

    // Format the date-time string
    const formattedDateTime = date.toISOString();

    return formattedDateTime;
  };

  const handleFileChange = async (childData) => {
    const file = childData.housePicture[0];

    if (file) {
      const base64String = await convertFileToBase64(file);
      // console.log(base64String);

      childData.housePicture = base64String;
      console.log("childData", childData);
      saveData(childData);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve({
          src: reader.result.split(",")[1], // Extract the base64 string (excluding the data URI prefix)
          fileName: file.name,
          fileType: file.type,
        });
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  async function saveData(payload) {
    try {
      const { data, error } = await supabase
        .from("Requests")
        .insert({
          first_name: payload.firstName,
          last_name: payload.lastName,
          address: payload.address,
          phone_number: payload.phone,
          email: payload.email,
          pet_id: petId,
          birthdate: payload.birthdate,
          status: payload.status,
          occupation: payload.occupation,
          soc_med: payload.socialMedia,
          payment_status: "UNPAID",
          interview_date: interviewDatetime(payload),
          ac_first_name: payload.alternateFirstName,
          ac_last_name: payload.alternateLastName,
          ac_phone_number: payload.alternatePhone,
          ac_email: payload.alternateEmail,

          q_source: payload.source.join(", "),
          q_had_adapted: payload.hadAdapted === "Yes" ? true : false,
          q_animal_type: payload.animalType,
          q_is_specific_animal:
            payload.isSpecificAnimal === "Yes" ? true : false,
          q_ideal_pet: payload.idealPetDescription,
          q_building_type: payload.buildingType,
          q_is_renting: payload.isRenting,
          q_living_with: payload.livingWith.join(", "),
          q_is_allergic: payload.isAllergic === "Yes" ? true : false,
          q_responsible_feeder: payload.responsibleFeeding,
          q_responsible_financial: payload.responsibleFinancial,
          q_look_after: payload.petSitter,
          q_hours_alone: payload.awayHours,
          q_introduce_steps: payload.introduceSteps,
          q_is_supported: payload.isFamilySupported,
          q_have_other_pets: payload.haveOtherPets,
          q_house_pic: payload.housePicture,
        })
        .select();

      if (error) {
        throw error;
      } else {
        // Data was inserted successfully
        console.log(data[0].id);
        openGateway(data[0].id);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
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
