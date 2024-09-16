import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { bearerToken } from '../../utils/BearerToken';
 import { useUser } from '../Context/UserContext';
const Barchart = () => {
  const { user } = useUser();
  const [pData, setPData] = useState([]);
  const [xLabels, setXLabels] = useState([
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ]);
  const options = {
    responsive: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASEURL}/api/v1/expenses/expenses?userId=${user.id}&year=2024`,{
          headers: {
            'Authorization': bearerToken()
          }
        });

        const data = response.data.data;

        // Initialize an array with 0 values for each month
        const monthlyExpenses = new Array(12).fill(0);

        // Update the array with actual expenses
        data.forEach(expense => {
          monthlyExpenses[expense.month - 1] = expense.totalExpenses;
        });

        setPData(monthlyExpenses);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-wrapper">
      <BarChart
        series={[{ data: pData, label: "Monthly Expense", id: "pvId", stack: "total" }]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
        options={options}
        className="responsive-chart"
      />
    </div>
  );
};

export default Barchart;

