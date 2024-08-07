import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
 import Loader from "../BasicComponents/Loader";
const ResetPassword = () => {
    const navigate= useNavigate();
  const { token } = useParams();
  // Code for password reset goes here using the token from the URL
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
    token: token,
  });
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const hadleSubmit = async (e) => {
    e.preventDefault();
    if (data.password != data.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match!",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }
    // Code for sending password reset request goes here with the provided data
   try {
     const res = await axios.post(
       `${import.meta.env.VITE_BASEURL}/api/v1/users/resetPassword`,
       data
     );
     if (res.status == 200 && res.data.success == true) {
       Swal.fire({
         title: "Success!",
         text: "Password reset successful!",
         icon: "success",
         confirmButtonText: "Okay",
       });
        navigate("/login");
     }
   } catch (error) {
     console.log(error);
     Swal.fire({
       title: "Error!",
       text: error.response.data.message,
       icon: "error",
       confirmButtonText: "Okay",
     });
    
   }
  };

  return (
    <>{

    }
      <div className="container d-flex justify-content-center resetpage">
        <div
          className="row container col-md-6 rounded"
          style={{ backgroundColor: "#fff", marginTop: "15%" }}
        >
          <h6 className="text-center mt-3">Password Reset</h6>
          <p className="text-muted mt-2 text-center">
            Provide the email address associated with your account to recover
            your password.
          </p>
          <form className="p-2" onSubmit={hadleSubmit}>
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={onChangeHandler}
              required
            />
            <label htmlFor="" className="form-label">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              onChange={onChangeHandler}
              required
            />
            <button type="submit" className=" btn btn-primary w-100 mt-2">
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
