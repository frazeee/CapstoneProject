import { supabase } from "../components/client";
import { useState, useEffect } from "react";
import AdoptionForm from "./AdoptionForm/AdoptionForm";
import Cookies from "js-cookie";
import { useAuth } from "../utils/AuthProvider"
import { useNavigate } from "react-router-dom";


const ApplicationForm = () => {
  const currentUrl = window.location.href;
  const navigate = useNavigate();

  // Split the URL by slashes and get the last part
  const petId = currentUrl.split("/").pop();

  const UserData = JSON.parse(Cookies.get("userSession"))
  const userEmail = UserData.data.user.email
  const {user} = useAuth()
  const [imageURL, setImageUrl] = useState('')



  //child component
  const handleCallback = (childData) => {
    handleFileChange(childData);
  };

  const openGateway = async (requestId) => {
    try {
   
      const paymongoSecretKey = process.env.REACT_APP_PAYMONGO_SECRET_KEY;

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
    const file = childData.housePicture;

    if (file) {
      saveData(childData)
    }
  };



  async function saveData(payload) {
    try {
     
      const fileExt = payload.housePicture[0].name.split('.').pop();
      const fileName = `${payload.lastName}-${petId}-Pictures`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('Requests_Images').upload(filePath, payload.housePicture[0])
      
      if (uploadError) {
        console.log(uploadError)
        throw uploadError
      }

      const { data: publicUrl, error: getUrlError } = await supabase.storage
      .from('Requests_Images')
      .getPublicUrl(filePath)
      console.log(publicUrl)

      if (getUrlError) {
        throw getUrlError
      }

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
          q_house_pic: publicUrl.publicUrl,
        })
        .select();


      if (error) {
        throw error;
      } else {
        // Data was inserted successfully
        console.log(data[0].id);
        // openGateway(data[0].id);
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
                <AdoptionForm parentCallback={handleCallback} petId={petId}></AdoptionForm>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ApplicationForm;
