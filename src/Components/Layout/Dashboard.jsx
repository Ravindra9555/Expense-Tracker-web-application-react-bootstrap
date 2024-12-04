import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/1.png";
import { useUser } from "../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider } from "@mui/material";
import { faGear, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Box, Modal, Typography, TextField, IconButton } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
// Modal styles
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const sidebar = [
  {
    label: "Dashboard",
    icon: "bi-house",
    url: "/dashboard",
    children: [],
  },
  {
    label: "Add Expense ",
    icon: "bi-pencil",
    url: "/add/expense",
    children: [],
  },
  {
    label: "Monthly Account",
    icon: " bi-journal-text",
    url: "/monthly/expense",
    children: [],
  },
  // {
  //   label: "Expense Details",
  //   icon: "bi-grid",
  //   url: "#",
  //   children: [
  //     { label: "January", url: "/jan" },
  //     { label: "February ", url: "/feb" },
  //     { label: "March ", url: "/mar" },
  //     { label: "April ", url: "/apr" },
  //     { label: "May ", url: "/may" },
  //     { label: "June ", url: "/jun" },
  //     { label: "July ", url: "/jul" },
  //     { label: "August ", url: "/aug" },
  //     { label: "September ", url: "/sep" },
  //     { label: "October ", url: "/oct" },
  //     { label: "November ", url: "/nov" },
  //     { label: "December ", url: "/dec" },
  //   ],
  // },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  if (!user) {
    return <Redirect to="/login" />;
  }

  const logout = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASEURL}/api/v1/users/logout`,{},{
        headers:{
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
      });
      if (res.status == 200) {
        Swal.fire({
          title: "Success",
          text: "Logged Out Successfully!",
          icon: "success",
        });
        localStorage.removeItem("access_token");
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
       if(error.response?.status==403 || error.response?.data?.errors?.stausCode==403){
         Swal.fire({
           title: "Error",
           text: "Session Expired! Please Login again!",
           icon: "error",
         });
         localStorage.removeItem("access_token");
         navigate("/");
         window.location.reload();
       }
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to logout!",
        icon: "error",
      });

    }

    // localStorage.removeItem("user");
    // localStorage.clear();
    // navigate("/login");
  };
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal((prev) => !prev);
  };
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      Swal.fire({
        title: "Error",
        text: "Both fields are required!",
        icon: "error",
      });
      return;
    }

    try {
      setLoading(true);
      // Replace this API call with your actual endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/v1/users/changePassword`,
        {
          oldPassword,
          newPassword,
          userId: user.id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200 && response.data.success) {
        Swal.fire({
          title: "Success",
          text: "Password changed successfully!",
          icon: "success",
        });
        handleModal(); // Close the modal on success
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to change password",
        icon: "error",
      });
      handleModal(); // Close the modal on success
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      {modal && (
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="change-password-modal"
        >
          <Box sx={modalStyle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                id="change-password-modal"
                variant="h6"
                component="h2"
              >
                Change Password
              </Typography>
              <IconButton onClick={() => setModal(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </Box>
            <TextField
              fullWidth
              label="Old Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleChangePassword}
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Password"}
            </Button>
          </Box>
        </Modal>
      )}
      <div className="row flex-nowrap">
        <div
          className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light shadow"
          // style={{ position: "fixed", height: "100vh", overflowY: "auto" }}
        >
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-black min-vh-100">
            <div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto  text-decoration-none ">
              <span className="fs-5 d-none d-sm-inline text-black">Ex.</span>
              {/* <img src={logo} height={40} alt="" /> */}
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
          className="col py-1 px-0 "
          // style={{ marginLeft: "18%", width: "82%" }}
        >
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <span className="navbar-brand">
                <img
                  src={Logo}
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
                  {/* <li className="nav-item">Home</li> */}
                </ul>
                <div className="dropdown">
                  <span
                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon
                      icon={faGear}
                      className="text-primary fs-4"
                      width="50"
                      height="50"
                      data-bs-toggle="tooltip"
                      data-bs-placement="left"
                      title={user.email}
                    >
                      Hii
                    </FontAwesomeIcon>
                  </span>
                  <ul
                    className="dropdown-menu dropdown-menu-end dropdown-menu-light text-small shadow p-2"
                    aria-labelledby="dropdownUser1"
                  >
                    <li>
                      <Button className="dropdown-item">{user.email} </Button>
                    </li>
                    <Divider sx={{ bgcolor: "blue", my: 1 }} />
                    <li>
                      <Button
                        className="dropdown-item"
                        variant="outlined"
                        color="primary"
                        onClick={() => handleModal()}
                      >
                        Change Password{" "}
                      </Button>
                    </li>
                    <li className="mt-1">
                      <Button
                        className="dropdown-item"
                        variant="outlined"
                        color="error"
                        mt={1}
                        onClick={logout}
                      >
                        Logout{" "}
                      </Button>
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
