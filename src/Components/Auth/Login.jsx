import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../../../src/images/login.jpg";
 
import { Link } from "react-router-dom";
 import img  from "../../assets/img/login.svg"

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/api/v1/users/login`,
        data
      );
      if (res.status === 200 && res.data) {
        // Changed statusCode to status
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
     if(e.target.name=password){
       const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
       if(!passwordRegex.test(data.password)){
         toast.error("Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters")
       }
       else{
         onChange(e)
       }

     }
  };

   const handleSocial =()=>{
    toast.warn("Social login Comming Soon ! ")

   }
    const[showPass, setShowPass] =  useState(false);
    const[text, setText]= useState("password");
 const showPassword=()=>{
    setShowPass(!showPass)
     if(showPass==true){
       setText("text")
     }else{
       setText("password")
     }
 }
  return (
    <>
      {/* <div className="container" style={{ height: "100vh" }}>
        <div className="row" style={{ height: "70vh" }}>
          <div
            className="col-12 col-md-6 mb-2 p-5 mb-md-0"
            style={{ backgroundColor: "#D1EFEE" }}
          >
            <div className="mb-4">
              <h5>Welcome to Expense Tracker</h5>
            </div>
            <form onSubmit={login}>
              <div className="mb-4">
                <label htmlFor="uname" className="form-label float-start mb-3">
                  Sign in
                </label>
                <input
                  type="email"
                  id="uname"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={onChange} // Corrected attribute name
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="psw"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={onChange} // Corrected attribute name
                />
              </div>
              <div className="form-check form-switch mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label
                  className="form-check-label float-start"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Remember me
                </label>
              </div>
              <div className="mb-4 d-grid">
                <button
                  type="submit"
                  className="btn float-start"
                  style={{ backgroundColor: "#125957", color: "white" }}
                >
                  Sign in
                </button>
              </div>
              <div className="mb-4">
                <h6>
                  <p>
                    Dont’t have an account?<Link to="/register"> Sign up</Link>
                  </p>
                </h6>
              </div>
            </form>
          </div>
          <div className="col-12 col-md-6 p-0">
            <img src={loginImage} alt="login" className="img-fluid w-100" />
          </div>
        </div>
        <ToastContainer autoClose={1500} />
      </div> */}
      <div
        className="container  d-flex  justify-content-center"
        style={{ height: "100vh"}}
      >
        <div className="row  login-row rounded-4  mt-4" style={{ height: "70vh" }}>
          <div className="col-md-6  p-4 w-5 mt-4 rounded" style={{ backgroundColor: "#fff" }}>
            <div className="rounded p-4 border">
            <h6 className="text-center"> Welcome to Expense Tracker </h6>
            <form className="mt-4 p-4" onSubmit={submitForm}>
              
              <label htmlFor="" className="form-label">
                Email
              </label>
              <input
                type="email"
                id=""
                name="email"
                className="form-control"
                placeholder="Please enter your email "
                onChange={onChange}
              />
              <label htmlFor="" className="form-label mt-2">
                Password
              </label>
              <div className="d-flex">
              <input
                type={text}
                id=""
                min={8}
                name="password"
                placeholder="Please enter your password"
                className="form-control border-end-0 rounded-end-0 "
                onChange={onChange}
              />
              <div className=" rounded-end border-top border-bottom border-end p-2">
                {
                  showPass? (
                    <i onClick={showPassword} className="bi  bi-eye-slash  m-0 p-0 "></i>
                  ) : (
                    <i  onClick={showPassword} className="bi bi-eye m-0 p-0 "></i>
                  )
                }
              
              {/* <i  onClick={showPassword} className=" btn m-0 p-0 bi bi-eye-fill"></i> */}
              </div>

              </div>

              <div className="form-check form-switch mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label
                  className="form-check-label float-start"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Remember me
                </label>
              </div>
              <div className="mt-2 d-flex justify-content-end">
                <Link to="/forgot-password text-end">Forgot Password?</Link>
              </div>
              <div className="mt-2">
                <button type="submit" className="btn btn-primary w-100">
                  Sign In
                </button>
              </div>
            </form>
            <div className="social-login d-flex mt-4 p-0 justify-content-between">
              <button className="btn btn-outline-primary  rounded-circle py-2" onClick={handleSocial}>
              <i className="bi bi-google fs-5"></i> </button>
              <button className="btn btn-outline-primary  rounded-circle py-2" onClick={handleSocial}>
              <i className="bi bi-meta fs-5"></i>
              </button>
              <button className="btn btn-outline-primary  rounded-circle py-2" onClick={handleSocial}>
              <i className="bi bi-linkedin fs-5"></i>
              </button>
            </div>
            </div>
          </div>
          <div
            className="col-md-6 p-0 d-flex mt-4 rounded  align-item-center"
            style={{ backgroundColor: "#fff" }}
          >
            <img src={img} alt="login" className="img-fluid w-100" />
          </div>
        </div>
        <ToastContainer autoClose={1500} />
      </div>
    </>
  );
};

export default Login;
