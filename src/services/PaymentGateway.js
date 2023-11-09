import { useState } from "react";

function OpenPaymentGateway() {
  const [checkoutData, setCheckoutData] = useState(null);
  const [error, setError] = useState(null);

  const createCheckout = async () => {
    try {
      // TO DO: Move this to .env
      // Replace this with your secret key in paymongo account
      const paymongoSecretKey = "sk_test_N5d44ZGz6gy6nGCcB6z3PrAF";
      // Replace this env + 'payment-success'
      const successPage =
        process.env.NODE_ENV === "production"
          ? "http://localhost:3000/payment-success"
          : "https://bpuadopt.vercel.app/payment-success";

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
