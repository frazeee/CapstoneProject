import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../components/client";
import loginPicture from "../../images/loginPicture.png";
import "./ShelterRegisterPage.css"
import { BeatLoader } from "react-spinners";

const ShelterRegister = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    shelterName: "",
    email: "",
    password: "",

  });

  const [loading, setLoading] = useState(null);

  function handleChange(event) {
    console.log(formData);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const checkEmailExists = async (email) => {
    const { data, error } = await supabase
      .from("Users")
      .select("email")
      .eq("email", email)

    if (error) {
      throw error;
    }

    return data.length > 0;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const emailExists = await checkEmailExists(formData.email);
      console.log(emailExists);
      if (emailExists) {
        alert("This email has already been registered");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        console.log(error)
        throw error;
      }


      const { adminData, error: insertAdminError } = await supabase.from("Admins").insert([
        {
          shelter_email: formData.email,
          shelter_name: formData.shelterName
        },
      ]);

      if (insertAdminError) {
        throw insertAdminError;
      }
      alert("Check your email for a verification link!");
      navigate("/Login");
    } catch (error) {
       alert(error.error_description || error.message);
    } finally {
        setLoading(false);
        setFormData("")
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
          <h1 className="text-center mt-5">Become a partner shelter today!</h1>
          <img src={loginPicture} className="img-fluid align-self-center"/>
        </div>
        <div className="col-xl-8 col-lg-8 col-md-8 px-5 pt-5">
          <h1 className="formHeader">Shelter Registration</h1>
          <hr className="mb-3 w-100"/>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="shelterName" className="form-label">
                Shelter Name
              </label>
              <input
                type="text"
                className="form-control"
                name="shelterName"
                onChange={handleChange}
                required
              />
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
            <div className="mb-3">
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

            <button
              type="submit"
              className="register-btn btn rounded-pill mb-2"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShelterRegister;
