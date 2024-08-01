import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/react.svg";

const sidebar = [
  {
    label: "Dashboard",
    icon: "bi-house",
    url: "/",
    children: [],
  },
  {
    label: "Write Prescription",
    icon: "bi-pencil",
    url: "/writeprescription",
    children: [],
  },
  {
    label: "Previous Prescription",
    icon: "bi-grid",
    url: "#",
    children: [
      { label: "Prescription 20/07/2024", url: "/products/1" },
      { label: "Prescription 25/07/2024", url: "/products/2" },
    ],
  },
];

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div
          className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light"
          // style={{ position: "fixed", height: "100vh", overflowY: "auto" }}
        >
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-black min-vh-100">
            <div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto  text-decoration-none ">
              {/* <span className="fs-5 d-none d-sm-inline text-black">Menu</span> */}
              <img src="https://images.pexels.com/photos/6289030/pexels-photo-6289030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" height={60} alt="" />
              <div className="patients-card  container-fluid  text-center"></div>
            </div>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              {sidebar.map((item, index) => (
                <li key={index} className="nav-item">
                  {item.children.length > 0 ? (
                    <>
                      <button
                        className="nav-link align-middle px-0 btn btn-link text-black"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${index}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${index}`}
                      >
                        <i className={`fs-5 ${item.icon} text-primary`}></i>
                        <span className="ms-2 d-none d-sm-inline">
                          {item.label}
                        </span>
                      </button>
                      <ul
                        className="collapse nav flex-column ms-1"
                        id={`collapse-${index}`}
                      >
                        {item.children.map((child, idx) => (
                          <li key={idx} className="w-100">
                            <Link to={child.url} className="nav-link px-0">
                              <span className="d-none d-sm-inline text-black">
                                {child.label}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link to={item.url} className="nav-link align-middle px-0">
                      <i className={`fs-5 ${item.icon}`}></i>
                      <span className="ms-2 d-none d-sm-inline text-black">
                        {item.label}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <hr />
          </div>
        </div>

        <div
          className="col py-1 px-0"
          // style={{ marginLeft: "18%", width: "82%" }}
        >
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <span className="navbar-brand">
                <img
                  src={logo}
                  alt="logo of website"
                  loading="lazy"
                  style={{
                    height: "40px",
                  }}
                />
              </span>
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
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">Home</li>
                </ul>
                <div className="dropdown">
                  <span
                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://img.freepik.com/premium-photo/medical-concept-indian-doctor-uniform-standing-hospital_1164587-4682.jpg?w=740"
                      alt="hugenerd"
                      width="50"
                      height="50"
                      data-bs-toggle="tooltip"
                      data-bs-placement="left"
                      title="Mr. Ravindra Kumar"
                      className="rounded-circle"
                    />
                    <button className=" btn btn-outline-danger d-none d-sm-inline  py-1 m-1">
                      Logout{" "}
                      <i class="bi bi-box-arrow-right   me-1  ms-1 fs-5"></i>
                    </button>
                  </span>
                  <ul
                    className="dropdown-menu dropdown-menu-end dropdown-menu-light text-small shadow"
                    aria-labelledby="dropdownUser1"
                  >
                    <li>
                      <span className="dropdown-item">Dr. Shandya Rathee </span>
                    </li>
                    <li>
                      <span className="dropdown-item">Settings</span>
                    </li>
                    <li>
                      <span className="dropdown-item">Profile</span>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          <div
            className="container-fluid "
            // style={{
            //   marginTop: "20px",
            //   height: "calc(100vh - 40px)",
            //   overflowY: "auto ",
            // }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
