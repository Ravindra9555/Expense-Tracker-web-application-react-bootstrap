import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/img/login.svg";
import { validateEmail, validatePassword } from "../../utils/validation";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(data);
    // Validate email and password
    if (!validateEmail(data.email)) {
      Swal.fire({
        title: "Error!",
        text: "Invalid email format!",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }

    if (!validatePassword(data.password)) {
      Swal.fire({
        title: "Error!",
        text: "Password must be at least 6 characters long!",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/v1/users/login`,
        data
      );

      console.log("Response:", res); // Log the response
      if (res.status === 200 && res.data.statusCode === 200) {
        toast.success(res.data.message);
        if (res.data.data.accessToken && res.data.data.refreshToken) {
          localStorage.setItem("access_token", res.data.data.accessToken);
          localStorage.setItem("refresh_token", res.data.data.refreshToken);
        } else {
          console.error("Tokens are missing in the response");
        }
      }
      navigate("/register");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Invalid Email or Password!",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSocial = () => {
    // toast.warn("Social login Comming Soon ! ")
    Swal.fire({
      title: "Error!",
      text: "Social Login Comming Soon! sorry! for inconvenice",
      icon: "warning",
      confirmButtonText: "Okay",
    });
  };
  const [showPass, setShowPass] = useState(false);
  const [text, setText] = useState("password");
  const showPassword = () => {
    setShowPass(!showPass);
    if (showPass == true) {
      setText("text");
    } else {
      setText("password");
    }
  };
  return (
    <>
      <div
        className="container  d-flex  justify-content-center"
        style={{ height: "100vh" }}
      >
        <div
          className="row  login-row rounded-4  mt-4"
          data-aos="zoom-in"
          data-aos-duration="1500"
          style={{ height: "70vh" }}
        >
          <div
            className="col-md-6  p-4 w-5 mt-4 rounded"
            style={{ backgroundColor: "#fff" }}
          >
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
                    {showPass ? (
                      <i
                        onClick={showPassword}
                        className="bi  bi-eye-slash  m-0 p-0 "
                      ></i>
                    ) : (
                      <i
                        onClick={showPassword}
                        className="bi bi-eye m-0 p-0 "
                      ></i>
                    )}
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
              <div className="mt-2 text-center">
                Don't have an account?
                <Link to="/register">Register</Link>
              </div>
              <div className="d-flex justify-content-center">
                <div className="social-login d-flex mt-4 p-0 justify-content-between w-50">
                  <button
                    className="btn btn-outline-primary  rounded-circle py-2"
                    onClick={handleSocial}
                  >
                    <i className="bi bi-google fs-5"></i>{" "}
                  </button>
                  <button
                    className="btn btn-outline-primary  rounded-circle py-2"
                    onClick={handleSocial}
                  >
                    <i className="bi bi-meta fs-5"></i>
                  </button>
                  <button
                    className="btn btn-outline-primary  rounded-circle py-2"
                    onClick={handleSocial}
                  >
                    <i className="bi bi-linkedin fs-5"></i>
                  </button>
                </div>
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
