import * as Unicons from "@iconscout/react-unicons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../components/client";
import "./PaymentSuccessPage.css";

function PaymentSuccessPage() {
  const [hasAccess, setHasAccess] = useState(false);
  const currentUrl = window.location.href;

  // Split the URL by slashes and get the last part
  const id = currentUrl.split("/").pop();

  useEffect(() => {
    updatePaymentStatus();
  });

  const updatePaymentStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("Requests")
        .update({ payment_status: "PAID" })
        .eq("id", id)
        .select();

      if (!data[0]?.id) {
        setHasAccess(false);
      } else {
        setHasAccess(true);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center text-center pt-5">
      {hasAccess ? (
        <div className="p-5 d-flex align-items-center flex-column">
          <Unicons.UilCheckCircle size="100" color="#5CB85C" />
          <h1 className="my-3">Request Created</h1>
          <h3>Thank you! </h3>
          <p>
            Your request with id <span className="text-primary">{id}</span> has
            been processed successfully.
          </p>
          <Link to="/" className="nav-link link-color text-primary">
            Go back to homepage
          </Link>
        </div>
      ) : (
        <h1 className="my-3">You have no access to this record</h1>
      )}
    </div>
  );
}

export default PaymentSuccessPage;
