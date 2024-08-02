import {
  faGauge,
  faMoneyBill,
  faMoneyCheckDollar,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Barchart from "../BasicComponents/Barchart";
import Pichart from "../BasicComponents/Pichart";
const Dashboardmain = () => {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            Dashbaord
          </li>
        </ol>
      </nav>
      <div className="container">
        <div className="cards row">
          <div className="col-md-3">
            <div className=" bg-white p-2 rounded ">
              <h5 className="card-title text-center">Total Expenses</h5>
              <div className=" d-flex justify-content-center align-items-center mt-2">
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  className="fs-3 text-danger p-3 bg-danger-subtle rounded-circle"
                />
                <h5 className="card-text ms-3">
                  ₹ <strong>1,200</strong>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className=" bg-white p-2 rounded ">
              <h5 className="card-title text-center">Total Saving</h5>
              <div className=" d-flex justify-content-center align-items-center mt-2">
                <FontAwesomeIcon
                  icon={faPiggyBank}
                  className="fs-3 text-warning p-3 bg-warning-subtle rounded-circle"
                />
                <h5 className="card-text ms-3">
                  ₹ <strong>1,200</strong>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className=" bg-white p-2 rounded ">
              <h5 className="card-title text-center">Total Income </h5>
              <div className=" d-flex justify-content-center align-items-center mt-2">
                <FontAwesomeIcon
                  icon={faMoneyCheckDollar}
                  className="fs-3 text-info p-3 bg-info-subtle rounded-circle"
                />
                <h5 className="card-text ms-3">
                  ₹ <strong>1,200</strong>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className=" bg-white p-2 rounded ">
              <h5 className="card-title text-center">Average Expenses </h5>
              <div className=" d-flex justify-content-center align-items-center mt-2">
                <FontAwesomeIcon
                  icon={faGauge}
                  className="fs-3 text-success p-3 bg-success-subtle rounded-circle"
                />
                <h5 className="card-text ms-3">
                  ₹ <strong>1,200</strong>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-2 container d-flex align-items-center">
        <Barchart />
        <Pichart/>
      </div>
    </div>
  );
};

export default Dashboardmain;
