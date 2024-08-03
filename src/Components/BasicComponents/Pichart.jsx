// import React from "react";
// import { PieChart } from "@mui/x-charts/PieChart";

// const Pichart = () => {
//   const options={

//     responsive: true,

//   }
//   return (
//     <div>
//       <PieChart
//         series={[
//           {
//             data: [
//               { id: 0, value: 10, label: "Medical" },
//               { id: 1, value: 15, label: "Grocery" },
//               { id: 3, value: 20, label: "Travel" },
//               { id: 4, value: 25, label: "Fashion" },
//               { id: 5, value: 28, label: "Food" },
//               { id: 6, value: 4, label: "Education" },
//               { id: 7, value: 2, label: "Others" },
//             ],
//           },
//         ]}
//         options={options}
//         width={350}
//         height={400}
//       />
//     </div>
//   );
// };

// export default Pichart;
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
