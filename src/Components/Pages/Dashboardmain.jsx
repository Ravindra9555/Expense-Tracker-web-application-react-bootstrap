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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const Dashboardmain = () => {
  const cardData = [
    {
      title: "Total Expenses",
      icon: faMoneyBill,
      color: " text-danger  bg-danger-subtle",
      value: "1200",
    },
    {
      title: "Total Income",
      icon: faMoneyCheckDollar,
      color: " text-success  bg-success-subtle",
      value: "1500",
    },
    {
      title: "Average Expenses",
      icon: faGauge,
      color: " text-warning  bg-warning-subtle",
      value: "800",
    },
    {
      title: "Savings",
      icon: faPiggyBank,
      color: " text-info  bg-info-subtle",
      value: "500",
    },
  ];
  const handleYearChange = (date) => {
    if (date) {
      const year = dayjs(date).year();
      console.log("Selected Year:", year);
      // Call your function with the selected year here
      // yourFunction(year);
    }
  };

  return (
    <div className="container">
      <div className="mt-2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker label={'Year'} openTo="year"  onChange={handleYearChange}/>
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="cards row mt-2">
        {cardData.map((card, index) => (
          <div className="col-md-3 mb-2" key={index}>
            <div className=" bg-white p-2 rounded ">
              <p className="card-title text-center">{card.title}</p>
              <div className=" d-flex justify-content-center align-items-center mt-2">
                <FontAwesomeIcon
                  icon={card.icon}
                  className={`fs-3  p-3   ${card.color} rounded-circle`}
                />
                <p className="card-text ms-3">
                  ₹ <strong>{card.value}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2  row">
        <div className="col-md-6 container-fluid">
          <Barchart />
        </div>
        <div className="col-md-6 container-fluid">
          <Pichart />
        </div>
      </div>
    </div>
  );
};

export default Dashboardmain;
