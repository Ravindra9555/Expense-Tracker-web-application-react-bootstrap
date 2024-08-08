import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/img/2.svg";
import { validateEmail, validatePassword } from "../../utils/validation";
import Navbar from "../BasicComponents/Navbar";
import Loader from "../BasicComponents/Loader";
import { useUser } from "../Context/UserContext";
import { faHouseMedicalFlag } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // function to submit form
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
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/v1/users/login`,
        data
      );

      console.log("Response:", res); // Log the response
      if (res.status === 200 && res.data.statusCode === 200) {
        toast.success(res.data.message);

        setUser({
          id: res.data.data.user._id,
          email: res.data.data.user.email,
        });

        localStorage.setItem("access_token", res.data.data.accessToken);
        localStorage.setItem("refresh_token", res.data.data.refreshToken);
      }
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response && error.response.status === 403) {
        setShowOtpForm(true);
        toast.warning(error.response.data.message);
      } else {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    }
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
        toast.success("OTP Verified Successfully! login Again ");
        setLoading(false);

        setTimeout(() => {
          setShowOtpForm(false);
          // navigate("/login");
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

  const [showPass, setShowPass] = useState(true);
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
          {/* <Navbar /> */}
          {!showOtpForm ? (
            <div
              className="container d-flex justify-content-center mt-4"
              style={{ height: "100vh",width: "100wh" }}
            >
              <div
                className="row  rounded   mt-4"
                style={{ width: "80%"}}
                data-aos="zoom-in"
                data-aos-duration="1500"
              >
                <div className="col-md-6 bg-light "  style={{height:"80%"}}>
                  <h6 className="text-center mt-4">Welcome to Expense Tracker</h6>
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
                      <Link to="/forgot">Forgot Password?</Link>
                    </div>
                    <div className="mt-2">
                      <button type="submit" className=" btn-primary1 w-100">
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div className="mt-2 text-center">
                    Don't have an account?
                    <Link to="/register">Register</Link>
                  </div>
                </div>
              <div className="col-md-6 background-secondary d-flex justify-content-center align-items-center"  style={{height:"80%"}}>
                <img
                  src={img}
                  alt="login"
                  className="img-fluid "
                  style={{ height: "100%" }}
                />
              </div>
              </div>
            </div>
          ) : (
            <>
              <div
                className="  d-flex justify-content-center  container align-items-center "
                data-aos="zoom-in"
                style={{ height: "100vh" }}
                data-aos-duration="1500"
              >
                <div className="p-4   rounded bg-light">
                  <div className="rounded p-4 border">
                    <h6 className="text-center">Verification Code Sent</h6>
                    <p className="text-center">
                      Please enter the verification code sent to your email
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
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <button
                        type="submit"
                        className=" btn-primary1 mt-4 w-100"
                      >
                        Verify
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
      <ToastContainer autoClose={1500} />
    </>
  );
};

export default Login;
