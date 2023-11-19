import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../components/client"
import loginPicture from "../../images/loginPicture.png";
import { BeatLoader } from "react-spinners";



const ForgotPassword = ({}) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const { user, error } = await supabase.auth.updateUser({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      navigate('/')
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
      <BeatLoader type="ThreeDots" color="#fee481" height={200} width={200} className="spinner" />
    </div>
    );
  }



   return(
      <div className="container-fluid">
      <div className="row">
        <div className="left-panel col-xl-4 col-lg-4 col-md-12 d-flex flex-column">
          <h1 className="text-center mt-5">Adopt a pet today!</h1>
          <img src={loginPicture} className="img-fluid align-self-center" />
        </div>
        <div className="col-xl-8 col-lg-8 col-md-12 px-5 pt-5">
          <h1 className="formHeader">Forgot Password</h1>
          <hr className="w-100 mb-3" />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <button type="submit" className="btn rounded-pill mb-2">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
