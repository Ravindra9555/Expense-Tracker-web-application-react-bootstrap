import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/img/register.png";
import { validateEmail, validatePassword } from "../../utils/validation";
import Navbar from "../BasicComponents/Navbar";
import Loader from "../BasicComponents/Loader";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(data);
    if (data.password != data.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Please Enter Same Password",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }
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
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/v1/users/register`,
        data
      );

      console.log("Response:", res); // Log the response
      if (res.status === 200 && res.data.statusCode === 200) {
        toast.success(res.data.message);
      }
      setLoading(false);
      // setTimeout(() => {
      //   navigate("/login");
      // }, 1000);
      setSendOtp(true);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
      setLoading(false);
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

  const [otp, setOtp] = useState("");
  const submitOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/v1/verifyOtp/verify`,
        { email: data.email, otp: otp }
      );
  
      // Check the response data
      if (res.data.statusCode === 200 && res.data.success === true) {
        toast.success("Registration Successful");
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        // Handle unexpected response
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: "OTP verification failed.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        title: "Error while verifying",
        text: error.response?.data?.message || "An unexpected error occurred.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
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
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Navbar />
          <div
            className="container  d-flex  justify-content-center"
            style={{ height: "100vh" }}
          >
            {sendOtp ? (
              <>
                <div
                  className="  d-flex justify-content-center login-row rounded-4  mt-2"
                  style={{ height: "70vh" }}
                  data-aos="zoom-in"
                  data-aos-duration="1500"
                >
                  <div
                    className="col-md-6  p-4 w-5 mt-4 rounded"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <div className="rounded p-4 border">
                      <h6 className="text-center">Verification Code Sent</h6>
                      <p className="text-center">
                        Please enter the verification code sent to your email{" "}
                      </p>
                      <form className="mt-4 p-4" onSubmit={submitOtp}>
                        <label htmlFor="" className="form-label">
                          Verification Code
                        </label>
                        <input
                          type="text"
                          id=""
                          required
                          name="verificationCode"
                          className="form-control"
                          placeholder="Please enter the verification code"
                          onChange={(e) => 
                            setOtp(e.target.value)
                          }
                        />
                        <button
                          type="submit"
                          className="btn btn-primary mt-4 w-100"
                        >
                          Verify
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="row  login-row rounded-4  mt-2"
                  style={{ height: "70vh" }}
                  data-aos="zoom-in"
                  data-aos-duration="1500"
                >
                  <div
                    className="col-md-6  p-4 w-5 mt-4 rounded"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <div className="rounded p-4 border">
                      <h6 className="text-center">
                        {" "}
                        Welcome to Expense Tracker{" "}
                      </h6>
                      <form className="mt-4 p-4" onSubmit={submitForm}>
                        <label htmlFor="" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          id=""
                          required
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
                            required
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
                        <label htmlFor="" className="form-label mt-2">
                          Confirm Password
                        </label>
                        <div className="d-flex">
                          <input
                            type={text}
                            id=""
                            min={8}
                            required
                            name="confirmPassword"
                            placeholder="Please enter your password again"
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
                        <div className="mt-2">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                      <div className="mt-2 text-center">
                        Already! have an account?
                        <Link to="/login">login</Link>
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
              </>
            )}

            <ToastContainer autoClose={1500} />
          </div>
        </>
      )}
    </>
  );
};

export default Register;
