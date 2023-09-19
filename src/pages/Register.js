import "./Login.css";
import React, { useEffect, useState } from "react";
import loginPicture from "../images/loginPicture.png";
import { supabase } from "../components/client";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName:'',lastName:'',email:'',password:''
  })



  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name] : event.target.value
        
      }
    })
  }

  async function handleSubmit(event){
    event.preventDefault();
   try{
    const { data, error } = await supabase.auth.signUp(
      {
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName
          }
        }
      }
    )
    if(error) throw error
    alert('Check your email for a verification link.')
    navigate('/Login')


   } catch(error) {
    alert(error)
   }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="left-panel pt-5 col-xl-4 d-flex flex-column mb-3 align-items-center">
          <h1>Adopt a pet today!</h1>
          <img src={loginPicture} className="img-fluid" />
        </div>
        <div className="col-xl-8 px-5 pt-5">
          <h1 className="formHeader">Register</h1>
          <hr></hr>
          <form onSubmit={handleSubmit}>
          <div class="mb-3">
              <label for="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                onChange={handleChange}
              />
            </div>
            <div class="mb-3">
              <label for="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                onChange={handleChange}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div class="mb-3 form-check">
            </div>
            <button type="submit" class="btn rounded-pill">
              Register
            </button>
          </form>
          <Link to="/Login" style={{textDecoration: 'none'}}><a className="span-link">Already have an account? Login Here!</a></Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
