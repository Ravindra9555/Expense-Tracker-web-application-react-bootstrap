// import React from "react";
// import { Chart } from "react-google-charts";

// const Barchart = () => {
//   const data = [
//     ["Months", "Expenses"],
//     ["Jan", 1000],
//     ["Feb", 1170],
//     ["March", 660],
//     ["April", 1030],
//     ["May", 850],
//     ["June", 1500],
//     ["July", 960],
//     ["Aug", 1200],
//     ["Sep", 1400],
//     ["Oct", 1300],
//     ["Nov", 900],
//     ["Dec", 1100],
//   ];

//   const options = {
//     chart: {
//       title: "Monthly  Expense Chart",
//       //   subtitle: "Sales, Expenses, and Profit: 2014-2017",
//     },
//   };
//   return (
//     <div>
//       <Chart
//         chartType="Bar"
//         width="70%"
//         height="400px"
//         data={data}
//         options={options}
//       />
//     </div>
//   );
// };

// export default Barchart;

 import React from 'react'
 import { BarChart } from '@mui/x-charts/BarChart';
 const Barchart = () => {

const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];
   return (
     <div>
        <BarChart
      width={500}
      height={300}
      series={[
        { data: pData, label: 'pv', id: 'pvId', stack: 'total' },
     
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
     </div>
   )
 }
 
 export default Barchart
 
