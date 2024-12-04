import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/1.png";
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg  background p-0" >
        <div className="container-fluid">
          <Link className="navbar-brand " to="/">
          <img src={logo} alt=""  height={50}/>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse p-2" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 me-2">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About 
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#developer">
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
