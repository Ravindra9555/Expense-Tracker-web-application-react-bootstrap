import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div>
        <footer className="background-secondary text-dark mt-5">
        <div className="container py-4">
          <div className="row">
            {/* Contact Information */}
            <div className="col-md-4">
              <h5>Contact Us</h5>
              <ul className="list-unstyled">
                {/* <li>
                  <i className="bi bi-geo-alt-fill me-2"></i>123 Expense St,
                  Budget City, 10001
                </li> */}
                <li>
                  <i className="bi bi-telephone-fill me-2"></i>
                  <a
                    className="text-decoration-none text-dark"
                    href="tel:+919648316865"
                  >
                    +91 9648316865{" "}
                  </a>
                </li>
                <li>
                  <i className="bi bi-envelope-fill me-2"></i>
                  <a
                    className="text-decoration-none text-dark"
                    href="mailto:ravindraietbu@gmail.com"
                  >
                    ravindraietbu@gmail.com{" "}
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div className="col-md-4 text-center">
              <h5>Follow Us</h5>
              <Link to="https://www.linkedin.com/in/ravindra-kumar-99a1301b2/" className="btn-outline-primary me-3">
                      <i className="bi bi-linkedin fa-2x"></i>
                    </Link>

                    <Link to="https://github.com/Ravindra9555" className="btn-outline-primary me-3">
                      <i className="bi bi-github fa-2x"></i>
                    </Link>
                    <Link to="/" className="btn-outline-primary me-3">
                      <i className="bi bi-twitter fa-2x"></i>
                    </Link>
                    <Link to="https://www.instagram.com/ravindra2.dev" className="btn-outline-primary me-3">
                      <i className="bi bi-instagram fa-2x"></i>
                    </Link>
                   
            </div>

            {/* Additional Links */}
            <div className="col-md-4 text-md-end">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/about" className="text-dark">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-dark">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-dark">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="bg-light" />
          <div className="row">
            <div className="col text-center">
              <p className="mb-0">
                &copy; 2024 Expense Tracker. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
