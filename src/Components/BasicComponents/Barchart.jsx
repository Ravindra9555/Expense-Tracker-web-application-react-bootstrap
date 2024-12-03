import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import { bearerToken } from "../../utils/BearerToken";
import { useUser } from "../Context/UserContext";
import Swal from "sweetalert2";

const Barchart = () => {
  const { user } = useUser();
  const [pData, setPData] = useState([]);
  const [xLabels, setXLabels] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  const [years, setYears] = useState([]); // Stores list of years for the dropdown
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to the current year

  const options = {
    responsive: true,
  };

  // Generate the last 10 years for the dropdown
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const pastYears = Array.from({ length: 10 }, (_, i) => currentYear - i);
    setYears(pastYears);
  }, []);

  // Fetch data based on the selected year
  const fetchData = async (year) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/v1/expenses/expenses`,
        {
          params: {
            userId: user.id,
            year: year,
          },
          headers: {
            Authorization: bearerToken(),
          },
        }
      );

      const data = response.data.data;

      // Initialize an array with 0 values for each month
      const monthlyExpenses = new Array(12).fill(0);

      // Update the array with actual expenses
      data.forEach((expense) => {
        monthlyExpenses[expense.month - 1] = expense.totalExpenses;
      });

      setPData(monthlyExpenses);
    } catch (error) {
      console.error("Error fetching data", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to fetch data",
        icon: "error",
      });
    }
  };

  // Fetch data when the selected year changes
  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  // Handle year change from the dropdown
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

  return (
    <div className="chart-wrapper">
      <BarChart
        series={[
          { data: pData, label: "Monthly Expense", id: "pvId", stack: "total" },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
        options={options}
        className="responsive-chart"
      />
      <div className="text-start d-flex align-items-center">
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className=" form-select"
          style={{ width: "120px", padding: "5px", textAlign: "center" }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Barchart;
