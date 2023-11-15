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
    phoneNumber: "",
    address: "",
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

      const { user, session, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            redirectTo: '/login'
          },
        },
      });

      if (error) {
        console.log(error)
        throw error;
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
        throw insertError;
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
        <Link to="/" className="pt-3 pb-4 text-light"><i class="bi bi-arrow-left-short"></i>Back to Home</Link>
          <h1 className="text-center">Adopt a pet today!</h1>
          <img src={loginPicture} className="img-fluid align-self-center"/>
        </div>
        <div className="col-xl-8 col-lg-8 col-md-8 px-5 pt-5">
          <h1 className="formHeader">Register</h1>
          <hr className="mb-3 w-100" />

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
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
            <div className="mb-3">
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
