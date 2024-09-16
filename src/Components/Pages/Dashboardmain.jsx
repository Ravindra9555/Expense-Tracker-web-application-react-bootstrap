import {
  faGauge,
  faMoneyBill,
  faMoneyCheckDollar,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Barchart from "../BasicComponents/Barchart";
import Pichart from "../BasicComponents/Pichart";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import axios from "axios";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const Dashboardmain = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Default to current date

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

      // Call your function with the selected year
      infoByMonth(year);
    }
  };

  const infoByMonth = async (year) => {
    try {
      const response = await axios.get(`https://expense-tracker-backend-23ar.onrender.com/api/v1/expenses/expenses`, {
        params: {
          userId: '66abfaa29c5e06e20c021460',
          year: year,
        }
      });
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div className="container">
      <div className="mt-2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={['year']} // To select only year
            label="Year"
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue);
              handleYearChange(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className="cards row mt-2">
        {cardData.map((card, index) => (
          <div className="col-md-3 mb-2" key={index}>
            <div className="bg-white p-2 rounded">
              <p className="card-title text-center">{card.title}</p>
              <div className="d-flex justify-content-center align-items-center mt-2">
                <FontAwesomeIcon
                  icon={card.icon}
                  className={`fs-3 p-3 ${card.color} rounded-circle`}
                />
                <p className="card-text ms-3">
                  ₹ <strong>{card.value}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 row">
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
