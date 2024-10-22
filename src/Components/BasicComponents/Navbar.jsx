import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/1.png";
const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg  background p-0" >
        <div class="container-fluid">
          <Link class="navbar-brand " to="/">
          <img src={logo} alt=""  height={50}/>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse p-2" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 me-2">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#home">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#about">
                  About 
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#developer">
                  Developer Profile
                </a>
              </li>
            </ul>
            {/* <div className="ms-auto"> */}
              <Link className=" btn-primary1 m-2 ms-0" to="/login">Login</Link>
              {/* <Link className=" btn-primary1 m-2" to="/register">Register</Link> */}
            {/* </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
