import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Forgot = () => {
  return (
    <>
    <div className="container d-flex justify-content-center resetpage">
        <div className="row container col-md-6 rounded" style={{backgroundColor:"#fff", marginTop:"15%"}}>
            <h6 className="text-center mt-3">Password Reset</h6>
            <p className="text-muted mt-2 text-center">Provide the email address associated with your account to recover your password.</p>
            <form className="p-2">
                <label htmlFor="" className="form-label">Email</label>
                <input type="email" className="form-control" required/>
                <button type="submit" className="btn btn-primary mt-4 mb-3 w-100">Reset Password</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default Forgot;