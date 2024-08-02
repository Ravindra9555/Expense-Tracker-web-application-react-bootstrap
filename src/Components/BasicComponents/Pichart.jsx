import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const Pichart = () => {
  return (
    <div>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Medical" },
              { id: 1, value: 15, label: "Grocery" },
              { id: 3, value: 20, label: "Travel" },
              { id: 4, value: 25, label: "Fashion" },
              { id: 5, value: 28, label: "Food" },
              { id: 6, value: 4, label: "Education" },
              { id: 7, value: 2, label: "Others" },
            ],
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default Pichart;
