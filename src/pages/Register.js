import "./Register.css";
import React, { useEffect, useState } from "react";
import loginPicture from "../images/loginPicture.png";
import { supabase } from "../components/client";
import { Link, useNavigate } from "react-router-dom";



const Register = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName:'',lastName:'',email:'',password:''
  })
  
  const [loading, setLoading] = useState(null)


  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name] : event.target.value
        
      }
    })
  }

  const checkEmailExists = async (email) => {
    const { data, error } = await supabase
      .from('Users')
      .select('email')
      .eq('email', email)
  
    if (error) {
      throw error
    }
  
    return data.length > 0
  }
  

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const emailExists = await checkEmailExists(formData.email);
      console.log(emailExists);
      if (emailExists) {
        alert('This email has already been registered');
        setLoading(false);
        return;
      }
  
      const { user, session, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options:{
          data:{
            firstName: formData.firstName,
            lastName: formData.lastName
          }
        }
        
      });

   
  
  
      if (error) {
        throw error;
      }
      alert('Check your email for a verification link!');
      navigate('/Login');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="left-panel pt-5 col-xl-4 col-lg-4 col-md-4  d-flex flex-column align-items-center">
          <h1>Adopt a pet today!</h1>
          <img src={loginPicture} className="img-fluid" />
        </div>
        <div className="col-xl-8 col-lg-8 col-md-8 px-5 pt-5">
          <h1 className="formHeader">Register</h1>
          <hr></hr>
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
            <div className="mb-3 form-check">
            </div>
            <button type="submit" className="btn rounded-pill">
              Register
            </button>
          </form>
          <Link to="/Login" className="span-link" style={{textDecoration: 'none'}}>Already have an account? Login Here!</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
