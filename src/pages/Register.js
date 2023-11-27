import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../components/client";
import loginPicture from "../images/loginPicture.png";
import "./Register.css";
import { BeatLoader } from "react-spinners";

const Register = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
  
    console.log(formData);
  
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
      };
  
      // If the changed field is the password, also update the confirmPassword validation
      if (name === "password") {
        handlePasswordChange(value, updatedFormData.confirmPassword);
      } else if (name === "confirmPassword") {
        handlePasswordChange(updatedFormData.password, value);
      }
  
      return updatedFormData;
    });
  }
  
  function handlePasswordChange(password, confirmPassword) {
    if (password !== confirmPassword) {
      setAlertMessage("Password and confirm password do not match");
    } else {
      setAlertMessage("");
    }
  }

  async function checkEmailExists(email) {
    const { data, error } = await supabase.from("Users").select("email").eq("email", email);
    if (error) {
      console.error(error);
      throw error;
    }
    return data && data.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
  
      const emailExists = await checkEmailExists(formData.email);
      console.log(emailExists);
      if (emailExists) {
        setAlertMessage("This email has already been registered");
        return;
      }
  
      if (formData.password !== formData.confirmPassword) {
        setAlertMessage("Password and confirm password do not match");
        return;
      }
  
      const { user, session, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
        },
      });
  
      if (signUpError) {
        console.error(signUpError);
        throw signUpError;
      }
  
      const { data, error: insertError } = await supabase.from("Users").insert([
        {
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          address: formData.address,
          phone: formData.phoneNumber,
        },
      ]);
  
      if (insertError) {
        console.error(insertError);
        throw insertError;
      }
  
      alert("Check your email for a verification link!");
      navigate("/Login");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
      });
    }
  }
  

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
      <BeatLoader type="ThreeDots" color="#fee481" height={200} width={200} className="spinner" />
    </div>
    );
  }


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="left-panel col-xl-4 col-lg-4 col-md-4 d-flex flex-column">
          <h1 className="text-center mt-5">Adopt a pet today!</h1>
          <img src={loginPicture} className="img-fluid align-self-center"/>
        </div>
        <div className="col-xl-8 col-lg-8 col-md-8 px-5 pt-5">
          <h1 className="formHeader">Register</h1>
          <hr className="mb-3 w-100" />

          <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    onChange={handleChange}
                    required
                  />
                </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="row"> 
              <div className="mb-3 col-md-6">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone
              </label>
              <input
                type="number"
                className="form-control"
                name="phoneNumber"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                onChange={handleChange}
                required
              />
            </div>

            {alertMessage && (
              <div className="alert alert-danger" role="alert">
                {alertMessage}
              </div>
            )}

            <button
              type="submit"
              className="register-btn btn rounded-pill mb-2"
            >
              Register
            </button>
          </form>
          <div>
            Already have an account?
            <Link to="/Login" style={{ textDecoration: "none" }}>
              <span className="text-primary"> Login Here!</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
