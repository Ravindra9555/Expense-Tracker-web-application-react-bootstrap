
import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const Pichart = () => {
  const options = {
    responsive: true,
  };

  return (
    <div className="chart-wrapper">
      <PieChart
        series={[
          {
            data: [
              { value: 10, label: "Medical" },
              { value: 15, label: "Grocery" },
              { value: 20, label: "Travel" },
              { value: 25, label: "Fashion" },
              { value: 4, label: "Education" },
              { value: 2, label: "Others" },
            ],
          },
        ]}
        options={options}
        className="responsive-chart"
      />
    </div>
  );
};

export default Pichart;
