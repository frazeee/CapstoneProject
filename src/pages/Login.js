import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../components/client";
import loginPicture from "../images/loginPicture.png";
import { useAuth } from "../utils/AuthProvider";
import "./Login.css";

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
  
      if (error) {
        throw error;
      }

      Cookies.set('userSession', JSON.stringify({ data }), { expires: 365 });
      setUser(data.user);
      setSession(data.session);
  
      // Fetch the user's role from the 'users' table based on their email
      const { data: userData, error: userError } = await supabase
        .from('Users')
        .select('role')
        .eq('email', formData.email)
        .single(); 
  
      if (userError) {
        throw userError;
      }
  
      if (userData) {
        const userRole = userData.role;
        if( userRole === "ADMIN")
        navigate('/Admin')
      } else {

      }
  
    
      console.log('Logged In!');
        navigate('/');
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
          <hr className="w-100 mb-3"/>
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
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
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
            <button type="submit" className="login-btn btn rounded-pill mb-2">
              Login
            </button>
            </div>
          </form>
          <Link to="/Register" style={{ textDecoration: "none" }}>
            <a className="span-link">Don't have an account? <span className="text-dark text-decoration-underline"> Register Here!</span> </a>
          </Link>
        </div>
      </div>
    </div>
  )
};

export default Login;
