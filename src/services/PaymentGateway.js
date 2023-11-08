import { useState } from "react";

function OpenPaymentGateway() {
  const [checkoutData, setCheckoutData] = useState(null);
  const [error, setError] = useState(null);

  const createCheckout = async () => {
    try {
      // TO DO: Move this to .env
      // Replace this with your secret key in paymongo account
      const paymongoSecretKey = "sk_test_xMz3971iAhy4Hp1SqE7eNRmx";
      // Replace this env + 'payment-success'
      const successPage = "http://localhost:3000/payment-success";

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
                name: "Product A",
                quantity: 1,
                amount: 2000, // Amount in cents (e.g., $50.00 is represented as 5000)
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
        setCheckoutData(data.data);
        // Open gateway to new tab
        window.open(data.data.attributes.checkout_url, "_blank");
        setError(null);
      } else {
        setError("Failed to create checkout.");
        console.error("Error:", response.statusText);
      }
    } catch (err) {
      setError("Failed to create checkout.");
      console.error(err);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn rounded-pill my-2 ml-3"
        onClick={createCheckout}
      >
        Proceed to payment
      </button>
    </div>
  );
}

export default OpenPaymentGateway;
