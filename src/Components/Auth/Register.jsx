import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/img/5.svg";
import { validateEmail, validatePassword } from "../../utils/validation";
import Navbar from "../BasicComponents/Navbar";
import Loader from "../BasicComponents/Loader";

const Register = () => {
  const [loading, setLoading] = useState(false);

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
         Swal.fire({
          title: "Success!",
          text: "Registration Successful! Redirecting to Login...",
          icon: "success",
          confirmButtonText: "Okay",
         })
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      // console.log(error);
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
          <div
            className="container d-flex justify-content-center  mt-4"
            style={{ height: "100vh", width: "60vw" }}
          >
            <>
              <div
                className="row   rounded   mt-4"
                data-aos="zoom-in"
                data-aos-duration="1500"
              >
                <div className="col-md-6 bg-light" style={{ height: "80%" }}>
                  <h6 className="text-center mt-4">
                    Welcome to Expense Tracker
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
                      <button type="submit" className=" btn-primary1 w-100">
                        Register
                      </button>
                    </div>
                  </form>
                  <div className="mt-2 text-center">
                    Already! have an account?
                    <Link to="/login">login</Link>
                  </div>
                </div>
                <div
                  className="col-md-6  d-flex background-secondary  align-item-center"
                  style={{ height: "80%" }}
                >
                  <img src={img} alt="login" className="img-fluid " />
                </div>
              </div>
            </>

            <ToastContainer autoClose={1500} />
          </div>
        </>
      )}
    </>
  );
};

export default Register;
