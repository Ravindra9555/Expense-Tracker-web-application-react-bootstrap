import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
    <div>
      <div className="container">
        <form onSubmit={login}>
          <label htmlFor="uname">Email</label>
          <br />
          <input
            type="email"
            id="uname"
            name="email"
            onChange={onChange}  // Corrected attribute name
          />
          <br />
          <label htmlFor="psw">Password:</label>
          <br />
          <input
            type="password"
            id="psw"
            name="password"
            onChange={onChange}  // Corrected attribute name
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Login;
