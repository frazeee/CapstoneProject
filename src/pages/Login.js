import "./Login.css";
import React, { useEffect, useState } from "react";
import loginPicture from "../images/loginPicture.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="left-panel pt-5 col-xl-4 d-flex flex-column mb-3 align-items-center">
          <h1>Adopt a pet today!</h1>
          <img src={loginPicture} className="img-fluid" />
        </div>
        <div className="col-xl-8 px-5 pt-5">
          <h1 className="formHeader">Login</h1>
          <hr></hr>
          <form>
            <div class="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
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
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3 form-check">
            </div>
            <button type="submit" class="btn rounded-pill">
              Login
            </button>
          </form>
          <Link to="/Register" style={{textDecoration: 'none'}}><a className="span-link">Don't have an account? Register Here!</a></Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
