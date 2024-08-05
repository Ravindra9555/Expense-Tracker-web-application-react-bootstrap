import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const MonthlyExpense = () => {
  return (
    <>
     <div className="row mt-2">
       
        <div className="col-md-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker", "DatePicker"]}>
          <DatePicker label={'"month" and "year"'} views={["month", "year"]} />
        </DemoContainer>
      </LocalizationProvider>
        </div>
        <div className="col-md-4">
            <h6>Expense </h6>
        </div>
     </div>
    
   
     
    </>
  );
};

export default MonthlyExpense;
