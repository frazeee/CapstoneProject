import { supabase } from "../components/client";
import AdoptionForm from "./AdoptionForm/AdoptionForm";

const ApplicationForm = () => {
  //child component
  const handleCallback = (childData) => {
    // Update the name in the component's state
    console.log(childData);
    saveData(childData);
  };

  const openGateway = async (requestId) => {
    console.log(requestId);
    try {
      // TO DO: Move this to .env
      // Replace this with your secret key in paymongo account
      const paymongoSecretKey = "sk_test_N5d44ZGz6gy6nGCcB6z3PrAF";
      // Replace this env + 'payment-success'
      // const successPage = `http://localhost:3000/payment-success/${requestId}`;
      const successPage = `https://bpuadopt.vercel.app/payment-success/${requestId}`;

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
          pet_id: 1, // TO DO: Replace with the pet adapting id
          birthdate: payload.birthdate,
          status: payload.status,
          occupation: payload.occupation,
          soc_med: payload.socialMedia,
          // source: payload.source,
          had_adapted: payload.hadAdapted === "Yes" ? true : false,
          payment_status: "UNPAID"
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
