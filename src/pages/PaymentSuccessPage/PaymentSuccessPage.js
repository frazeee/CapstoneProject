import * as Unicons from "@iconscout/react-unicons";
import { Link } from 'react-router-dom';
import "./PaymentSuccessPage.css";

function PaymentSuccessPage() {
  return (
    <div className="d-flex justify-content-center text-center pt-5">
      <div className="p-5 d-flex align-items-center flex-column">
        <Unicons.UilCheckCircle size="100" color="#5CB85C" />
        <h1 className="my-3">Payment Successful</h1>
        <h3>Thank you! </h3>
        <p>Your payment has been processed successfully.</p>
        <Link to="/" className="nav-link link-color text-primary">Go back to homepage</Link>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
