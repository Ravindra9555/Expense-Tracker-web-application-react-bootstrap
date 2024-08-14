import React, { useState } from "react";
import Navbar from "./BasicComponents/Navbar";
import Loader from "./BasicComponents/Loader";
import img1 from "../assets/img/6.svg";
import logo from "../assets/img/1.png";
import img2 from "../assets/img/7.svg";
import contactus from "../assets/img/Contactus.svg";
import ravi from "../assets/img/ravi.jpg";
import gaurav from "../assets/img/gaurav.jpg";
import Carousel from "./BasicComponents/Carousel";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, faChartLine, faClock } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons/faWallet";
import PieChart from "../Components/BasicComponents/Pichart";
import Barchart from "../Components/BasicComponents/Barchart";
import Footer from "./BasicComponents/Footer";
import TypeWriter from "./Pages/TypeWriter";
import axios from "axios";
import Swal from "sweetalert2";
const Landing = () => {
   const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const contactHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.subject === "" ||
      formData.description === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASEURL}/contact`, formData);
      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: "We have received your message. We will get back to you shortly",
          icon: "success",
          confirmButtonText: "Okay",
        });
      }
    } catch (error) {
      console.error("Error during form submission:", error); // Log the error
      Swal.fire({
        title: "Error",
        text: "Failed to send message",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <>
      <div className="container">
        <div
          className="Navbar fixed-top"
          data-aos="fade-down"
          data-aos-delay="500"
        >
          <Navbar />
        </div>
        <div
          className="row"
          id="home"
          style={{ minHeight: "100vh", paddingTop: "56px" }}
        >
          <div
            className="col-md-6 d-flex justify-content-start align-items-center mb-4"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div>
              <h3>
                Welcome to Expense Tracker WebApp,{" "}
                <span className="text-primary">
                  <TypeWriter />
                </span>{" "}
              </h3>
              <p>
                Managing your finances has never been simpler. With
                ExpenseTrackerPro, you can track your spending, create budgets,
                and save more effectively—all in one place.
              </p>
              <Link to="/register" className="btn-primary1">
                {" "}
                Register Now
              </Link>
            </div>
          </div>
          <div
            className="col-md-6 img1"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            {/* <img src={img1} alt="" className="img-fluid" /> */}
            <Carousel />
          </div>
        </div>

        <div className="row" id="about">
          <h2
            className="text-center"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            Powerful Features to Manage Your Expenses
          </h2>
          <div
            className="col-md-6 mt-4"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faWallet}
                className="text-dark fs-4 p-3 rounded-circle background-secondary me-3"
              />
              <h5>Monthly Expense Tracking</h5>
            </div>
            <div className="mt-2">
              <ul className="list-unstyled">
                <li>
                  Add up your monthly expenses easily using our intuitive
                  expense tracking tool.
                </li>
                <li>
                  Easily add and view your monthly expenses to stay organized.
                </li>
              </ul>
            </div>

            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faChartLine}
                className="text-dark fs-4 p-3 rounded-circle background-secondary me-3"
              />
              <h5>Expense Visualization</h5>
            </div>
            <div className="mt-2"></div>
            <ul className="list-unstyled">
              <li>
                See your yearly and monthly expenses in clear,
                easy-to-understand graphs
              </li>
              <li>
                Understand your spending habits with detailed breakdowns by
                category such as education, fashion, food, grocery, and others
              </li>
              <li>
                Attach images of your bills for easy reference and better
                record-keeping.
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faClock}
                className="text-dark fs-4 p-3 rounded-circle background-secondary me-3"
              />
              <h5>Ease of Use & Time-Saving</h5>
            </div>
            <div className="mt-2">
              <ul className="list-unstyled">
                <li>
                  Gain better control over your finances and budgeting with our
                  detailed reports.
                </li>
                <li>
                  Get detailed insights into your spending patterns with our
                  advanced analytics.
                </li>
                <li>
                  Our simple, intuitive interface makes expense tracking a
                  breeze.
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col-md-6 d-flex justify-content-center align-items-center"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            {/* <img src={img2} alt="" className="img-fluid" /> */}
            <Barchart />
          </div>
        </div>
        <div className=" mt-5">
          {/* Security Section */}
          <div className="row mb-5">
            <div
              className="col text-center"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              <h2>Your Security is Our Priority</h2>
              <p>
                We use industry-leading security measures to protect your data.
                With secure OTP login and encryption, you can trust that your
                financial information is safe with us.
              </p>
            </div>
          </div>
          <div
            className="row text-center"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <div className="col-md-4 mb-3">
              <div className="card background-secondary">
                <div className="card-body">
                  <i className="bi bi-lock-fill fa-3x mb-3 px-2 rounded-circle background "></i>
                  <h5 className="card-title">Data Encryption</h5>
                  <p className="card-text">
                    All your data is encrypted to ensure complete security and
                    privacy.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card background-secondary">
                <div className="card-body">
                  <i className="bi bi-shield-lock-fill fa-3x mb-3 px-2 rounded-circle background "></i>
                  <h5 className="card-title">Secure Login</h5>
                  <p className="card-text">
                    Our OTP login process ensures that only you have access to
                    your account.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card background-secondary">
                <div className="card-body">
                  <i className="bi bi-file-code-fill fa-3x mb-3 px-2 rounded-circle background "></i>
                  <h5 className="card-title">Regular Audits</h5>
                  <p className="card-text">
                    We perform regular security audits to maintain the highest
                    standards of data protection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Developer Section */}
          <div className="row mt-5 mb-5" id="developer">
            <div
              className="col text-center"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <h2>Meet the Developers</h2>
              <p>
                We are committed to providing you with the best expense tracking
                experience. With expertise in web development, security, and
                user experience, we continuously improve our app to meet your
                needs.
              </p>
            </div>
          </div>
          <div
            className="row text-center"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <div className="col-md-4 mt-3">
              <div className="card background-secondary">
                <div className="card-body">
                  {/* <i className="bi bi-person-fill fa-3x mb-3"></i> */}
                  <img
                    src={ravi}
                    className=" rounded-circle mb-2"
                    alt=""
                    height={100}
                  />
                  <h5 className="card-title">Ravindra Kumar </h5>
                  <h6 className="text-muted">Fullstack Developer </h6>
                  <p className="card-text">
                    Ravindra have relevent experience in web development and
                    specializes in creating secure and user-friendly
                    applications.
                  </p>
                  <div>
                    <Link
                      to="https://www.linkedin.com/in/ravindra-kumar-99a1301b2/"
                      className="btn-outline-primary me-3"
                    >
                      <i className="bi bi-linkedin fa-2x"></i>
                    </Link>

                    <Link
                      to="https://github.com/Ravindra9555"
                      className="btn-outline-primary me-3"
                    >
                      <i className="bi bi-github fa-2x"></i>
                    </Link>
                    <Link to="/" className="btn-outline-primary me-3">
                      <i className="bi bi-twitter fa-2x"></i>
                    </Link>
                    <Link
                      to="https://www.instagram.com/ravindra2.dev"
                      className="btn-outline-primary me-3"
                    >
                      <i className="bi bi-instagram fa-2x"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div className="card background-secondary">
                <div className="card-body">
                  <img
                    src={gaurav}
                    className=" rounded-circle mb-2"
                    alt=""
                    height={100}
                  />
                  <h5 className="card-title">Gaurav Mishra </h5>
                  <h6 className="text-muted">UI/ UX Designer</h6>
                  <p className="card-text">
                    Gaurav ensures that our app is easy to use and visually
                    appealing. She focuses on creating a seamless user
                    experience.
                  </p>
                  <div>
                    <Link to="" className=" btn-outline-primary  me-3">
                      <i className="bi bi-github fa-2x"></i>
                    </Link>
                    <Link to="" className="btn-outline-primary me-3">
                      <i className="bi bi-twitter fa-2x"></i>
                    </Link>
                    <Link to="" className="btn-outline-primary me-3">
                      <i className="bi bi-instagram fa-2x"></i>
                    </Link>
                    <Link to="" className="btn-outline-primary">
                      <i className="bi bi-linkedin fa-2x"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div
            className="row mt-5"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="col text-center">
              <h2>Ready to Take Control of Your Finances?</h2>
              <p>Join and manage expenses better with Expense Tracker.</p>
              <Link to="/register" className=" btn-primary1 btn-lg mt-4">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </div>
     <div className="row mt-2">
          <div className="col-md-6 d-flex justify-content-center align-items-center" data-aos="fade-down" data-aos-duration="1000">
            <img src={contactus} alt="" />
          </div>
          <div className="col-md-6" data-aos="fade-down" data-aos-duration="1000">
            <h2 className="text-center">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" name="name" onChange={contactHandle} placeholder="Name" className="form-control" required />
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" name="email" onChange={contactHandle} placeholder="Email" className="form-control" required />
              <label htmlFor="subject" className="form-label">Subject</label>
              <input type="text" name="subject" onChange={contactHandle} placeholder="Subject" className="form-control" required />
              <label htmlFor="description" className="form-label">Message</label>
              <textarea name="description" onChange={contactHandle} placeholder="Write description ..." className="form-control" rows="5" />
              <button type="submit" className="btn-primary1 mt-3">Submit</button>
            </form>
          </div>
        </div>
      <Footer />
    </>
  );
};

export default Landing;
