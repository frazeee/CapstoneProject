import "./Login.css";
import React, { useEffect, useState } from "react";
import loginPicture from "../images/loginPicture.png";
import { supabase } from "../components/client";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../utils/AuthProvider";

const Login = ({}) => {
  let navigate = useNavigate();
  const { setUser, setSession } = useAuth(); 


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
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) throw error;
      Cookies.set('userSession', JSON.stringify({ data }), { expires: 365 });
      setUser(data.user);
      setSession(data.session);
      console.log("Logged In!")
      navigate('/')
    } catch (error) {
      alert(error);
    }
  }


   return(
    <div className="container-fluid">
      <div className="row">
        <div className="left-panel pt-5 col-xl-4 col-lg-4 col-md-4 d-flex flex-column align-items-center">
          <h1 className="text-center">Adopt a pet today!</h1>
          <img src={loginPicture} className="img-fluid" />
        </div>
        <div className="col-xl-8 col-lg-8 col-md-8 px-5 pt-5">
          <h1 className="formHeader">Login</h1>
          <hr></hr>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label htmlFor="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div class="">
            <button type="submit" class="btn rounded-pill">
              Login
            </button>
            </div>
          </form>
          <Link to="/Register" style={{ textDecoration: "none" }}>
            <a className="span-link">Don't have an account? Register Here!</a>
          </Link>
        </div>
      </div>
    </div>
  )
};

export default Login;
