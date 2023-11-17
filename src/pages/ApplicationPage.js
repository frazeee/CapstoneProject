import React, { useEffect } from "react";
import ApplicationForm from "../components/ApplicationForm";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ApplicationPage = () => {
  const currentUrl = window.location.href;
  const petId = currentUrl.split("/").pop();
  const navigate = useNavigate();

  useEffect(() => {
    if (!petId) {
      navigate('/Pets');
    }
  }, [petId, navigate]);

  return (
    <>
      <div className="container-bg">
        <Navbar />
        <ApplicationForm />
        <Footer />
      </div>
    </>
  );
};

export default ApplicationPage;
