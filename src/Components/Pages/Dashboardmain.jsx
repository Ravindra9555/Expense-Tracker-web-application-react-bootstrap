import {
  faGauge,
  faMoneyBill,
  faMoneyCheckDollar,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Barchart from "../BasicComponents/Barchart";
import dayjs from "dayjs";
import axios from "axios";
import { useUser } from "../Context/UserContext";
import Swal from "sweetalert2";
import TimeLine from "../BasicComponents/TimeLine";
const Dashboardmain = () => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("year"));
  const [data, setData] = useState({
    totalExp: "",
    income: "",
  });
  const [month, setMonth] = useState(new Date().getMonth()); // Month index (0-11)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthName = monthNames[month]; // Get month name from index

  const cardData = [
    {
      title: "Total Expenses",
      icon: faMoneyBill,
      color: " text-danger  bg-danger-subtle",
      value: data.totalExp,
    },
    {
      title: "Total Income",
      icon: faMoneyCheckDollar,
      color: " text-success  bg-success-subtle",
      value: data.income,
    },
    {
      title: "Avg Monthly Expenses",
      icon: faGauge,
      color: " text-warning  bg-warning-subtle",
      value: (data.totalExp / 30).toFixed(2),
    },
    {
      title: "Savings",
      icon: faPiggyBank,
      color: " text-info  bg-info-subtle",
      value: (data.income - data.totalExp).toFixed(2),
    },
  ];

  useEffect(() => {
    infoByMonth(new Date().getFullYear());
  }, []);

  const infoByMonth = async (year) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/v1/expenses/expenses`,
        {
          params: {
            userId: user.id,
            year: year,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (res.status == 200) {
        // Handle the response as needed
        setData({
          totalExp: res.data.data[0].totalExpenses,
          income: res.data.data[0].initialAmount,
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
      Swal.fire({
        title: "Error",
        text: error.resposnse.data.message || "Failed to fetch data",
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      <div className="cards  mt-2 p-2 ">
         <div className="bg-white row rounded  shadow ">
        <h5 className="text-start mb-1 mt-1">{currentMonthName}</h5>
        {cardData.map((card, index) => (
          <div className="col-md-3 mb-2" key={index}>
            <div className="bg-primary-subtle p-2 rounded">
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
      </div>

      <div className="mt-2 row">
        <div className="col-md-6 container-fluid ">
          <div className="bg-white rounded  shadow">
            <Barchart />
          </div>
        </div>
        <div className="col-md-6 container-fluid ">
          <div className="bg-white rounded  shadow">
            <TimeLine />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardmain;
