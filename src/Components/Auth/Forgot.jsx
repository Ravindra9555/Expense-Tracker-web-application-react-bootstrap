import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/v1/users/forgetPasswordToken`,
        { email: email }
      );
      if (res.status == 200 && res.data.success == true) {
        Swal.fire({
          title: "Success",
          text: "Check your email for password reset instructions",
          icon: "success",
          confirmButtonText: "Okay",
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to send password reset email",
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to send password reset email",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }

  };
  return (
    <>
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
          <form className="p-2" onSubmit={handleSubmit}>
            <label htmlFor="" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary mt-4 mb-3 w-100">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgot;
