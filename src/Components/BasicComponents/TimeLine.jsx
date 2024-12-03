import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { bearerToken } from "../../utils/BearerToken";
import dayjs from "dayjs";

const TimeLine = () => {
  const [expenses, setExpenses] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/v1/expenses/expenses/monthly`,
        {
          headers: {
            Authorization: bearerToken(),
          },
          params: {
            userId: user.id,
            month: new Date().getMonth() + 1, // Adjust month to match API's 1-based index
            year: new Date().getFullYear(),
          },
        }
      );

      if (res.status === 200 && res.data.success) {
        const allExpenses = res.data.data.expenses;
        const latestExpenses = allExpenses.slice(0, 5); // Get only the first five expenses
        setExpenses(latestExpenses);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row">
          <div className="col">
            <p>Recent Activities</p>
            <div className="timeline p-2 mb-4">
              {expenses.length > 0 ? (
                expenses.map((expense, index) => (
                  <div key={expense._id} className={`tl-item ${index === 0 ? "active" : ""}`}>
                    <div className={`tl-dot ${index % 2 === 0 ? "b-warning" : "b-primary"}`}></div>
                    <div className="tl-content">
                      <div>{expense.name}</div>
                      <div className="  text-muted mt-1">
                      <p style={{fontSize:"12px"}}>{dayjs(expense.date).format("MMMM D, YYYY")}</p> 
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No recent activities to display.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
