import React ,{ useState} from "react";
import { BarChart } from "@mui/x-charts/BarChart";


const BarchartForWeb = () => {

    const [pData, setPData] = useState([10000, 70007, 50007, 40005, 9764,7992,32346,6453,34525,23522,23455,0]);
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
    const options = {
      responsive: true,
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
       
      </div>
    );
}

export default BarchartForWeb
