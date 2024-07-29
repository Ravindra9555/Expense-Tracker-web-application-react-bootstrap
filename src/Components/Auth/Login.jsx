import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import loginImage from '../../../src/images/login.jpg';


const Login = () => {
  const baseurl = "http://localhost:3005";

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseurl}/api/v1/users/login`, data);
      if (res.status === 200 && res.data) {  // Changed statusCode to status
        console.log("login success");
        toast.success(res.data.message);
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Email or Password");
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mb-2 p-5 mb-md-0" style={{backgroundColor: '#D1EFEE'}}>
            <div className="mb-4">
              <h5>Welcome to Expense Tracker</h5>
            </div>
            <form onSubmit={login}>
              <div className="mb-4">
                <label htmlFor="uname" className="form-label float-start mb-3">Sign in</label>
                <input
                  type="email"
                  id="uname"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={onChange}  // Corrected attribute name
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="psw"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={onChange}  // Corrected attribute name
                />
              </div>
              <div className="form-check form-switch mb-4">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                <label className="form-check-label float-start" htmlFor="flexSwitchCheckDefault">Remember me</label>
              </div>
              <div className="mb-4 d-grid">
              <button type="submit" className="btn float-start"  style={{ backgroundColor: '#125957', color: 'white'}}>Sign in</button>
              </div>
              <div className="mb-4">
                <h6><p>Dont’t have an account?<a href="Signup"> Sign up</a></p></h6>
              </div>
            </form>
          </div>
          <div className="col-12 col-md-6 p-0">
            {/* <h1>this is my first page</h1> */}
          <img src={loginImage} alt="login" className="img-fluid w-100"/>
          </div>
          <ToastContainer autoClose={1500} />
        </div>
      </div>
    </>

  );
};

export default Login;
