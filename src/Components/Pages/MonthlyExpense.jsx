// import React from "react";

// const MonthlyExpense = () => {
//   return (
//     <>
//       <div className="row mt-2">
//         <div className="col-md-4">
//
//         </div>
//         <div className="col-md-4">
//           <h6>Expense </h6>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MonthlyExpense;
// import React from "react";
// import { faker } from "@faker-js/faker";
// import DataTable from "react-data-table-component";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// const createUser = () => ({
//   id: faker.string.uuid(),
//   name: faker.internet.userName(),
//   email: faker.internet.email(),
//   address: faker.location.streetAddress(),
//   bio: faker.lorem.sentence(),
//   image: faker.image.avatar(),
// });

// const createUsers = (numUsers = 5) =>
//   new Array(numUsers).fill(undefined).map(createUser);

// const fakeUsers = createUsers(2000);

// const FilterComponent = ({ filterText, onFilter, onClear }) => (
//   <>
//     <TextField
//       className="mt-2"
//       id="search"
//       type="text"
//       label="Search Expense "
//       variant="outlined"
//       placeholder="Filter By Name"
//       value={filterText}
//       onChange={onFilter}
//     />
//     <Button variant="outlined" type="button" onClick={onClear}>
//       Clear
//     </Button>
//   </>
// );

// const columns = [
//   {
//     name: "Expense Type",
//     selector: (row) => row.name,
//     sortable: true,
//   },
//   {
//     name: "Expense Amount",
//     selector: (row) => row.email,
//     sortable: true,
//   },
//   {
//     name: " Date",
//     selector: (row) => row.address,
//     sortable: true,
//   },
//   {
//     name: "Bill Image",
//     selector: (row) => (
//       <a href={row.image} target="_blank">
//         {" "}
//         <img
//           src={row.image}
//           height={50}
//           className="rounded-circle m-1"
//           alt=""
//         />
//       </a>
//     ),
//     sortable: true,
//   },
// ];

// export const MonthlyExpense = () => {
//   const [filterText, setFilterText] = React.useState("");
//   const [resetPaginationToggle, setResetPaginationToggle] =
//     React.useState(false);
//   const filteredItems = fakeUsers.filter(
//     (item) =>
//       item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
//   );

//   // const subHeaderComponentMemo = React.useMemo(() => {
//   //   const handleClear = () => {
//   //     if (filterText) {
//   //       setResetPaginationToggle(!resetPaginationToggle);
//   //       setFilterText("");
//   //     }
//   //   };

//   //   return (
//   //     <>
//   //       <div className="row ">
//   //         <div className="col-sm-6">
//   //           <LocalizationProvider dateAdapter={AdapterDayjs}>
//   //             <DemoContainer
//   //               components={["DatePicker", "DatePicker", "DatePicker"]}
//   //             >
//   //               <DatePicker label={"Month / Year "} views={["month", "year"]} />
//   //             </DemoContainer>
//   //           </LocalizationProvider>
//   //         </div>
//   //         <div className="col-sm-6">
//   //           <FilterComponent
//   //             onFilter={(e) => setFilterText(e.target.value)}
//   //             onClear={handleClear}
//   //             filterText={filterText}
//   //           />
//   //         </div>
//   //       </div>
//   //     </>
//   //   );
//   // }, [filterText, resetPaginationToggle]);

//   return (
//     <>
//       <div className="row ">
//         <div className="col-sm-6">
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DemoContainer
//               components={["DatePicker", "DatePicker", "DatePicker"]}
//             >
//               <DatePicker label={"Month / Year "} views={["month", "year"]} />
//             </DemoContainer>
//           </LocalizationProvider>
//         </div>
//         <div className="col-sm-6">
//           <FilterComponent
//             onFilter={(e) => setFilterText(e.target.value)}
//             onClear={handleClear}
//             filterText={filterText}
//           />
//         </div>
//       </div>
//       <DataTable
//         className="mt-2"
//         // title="Expense List"
//         columns={columns}
//         data={filteredItems}
//         pagination
//         paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
//         // subHeader
//         // subHeaderComponent={subHeaderComponentMemo}
//         // selectableRows
//         persistTableHead
//       />
//     </>
//   );
// };

// export default MonthlyExpense;

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box"; // Import Box for flex layout
import { useUser } from "../Context/UserContext";
import dayjs from "dayjs";
import axios from "axios";
import { bearerToken } from "../../utils/BearerToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
      <TextField
        id="search"
        type="text"
        label="Search Expense"
        variant="outlined"
        placeholder="Filter By Name"
        value={filterText}
        onChange={onFilter}
        size="medium" // Ensure the TextField is of medium size
        sx={{ height: "56px" }} // Standard height for outlined TextField
      />
      <Button
        variant="outlined"
        type="button"
        onClick={onClear}
        sx={{
          height: "56px", // Match the height of the TextField
          padding: "0 16px", // Standard padding for buttons
        }}
      >
        Clear
      </Button>
    </Box>
  </>
);

const columns = [
  {
    name: "Expense Type",
    selector: (row) => row.category,
    sortable: true,
  },
  {
    name: "Expense Amount",
    selector: (row) => row.amount,
    sortable: true,
  },
  {
    name: " Date",
    selector: (row) => dayjs(row.date).format(),
    sortable: true,
  },
  {
    name: "Bill Image",
    selector: (row) => (
      <a href={row.bill_img} target="_blank" rel="noopener noreferrer">
        <img
          src={row.bill_img}
          height={80}
          className="rounded-circle m-1"
          alt=""
        />
      </a>
    ),
  },
  {
    name: "Action",
    selector: (row) => <>
    <div className="row">
      <div className="col">
        <button className="btn btn-outline-primary border-0" onClick={()=>handleEdit(row._id)}><FontAwesomeIcon icon={faEdit}/></button>
      </div>

      <div className="col">
        <button className="btn btn-outline-danger border-0 "  onClick={()=>handleEdit(row._id)}><FontAwesomeIcon icon={faTrash}/></button>
      </div>
    </div>
    </>,
    sortable: true,
  },
];

 const handleEdit =(id)=>{
  console.log("Edit"+ id);
  
 }
export const MonthlyExpense = () => {
  const { user } = useUser(); // Get user data from context

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const [data, setData] = useState({
    date: new Date(),
    expenses: [],
    month: dayjs().month() + 1, // Month is 0-based in dayjs
    year: dayjs().year(),
  });
  useEffect(() => {
    getMonthExpenses();
  }, [data.month, data.year]);
  const handleDate = (date) => {
    if (date) {
      const year = dayjs(date).year();
      const month = dayjs(date).month() + 1; // Month is 0-based in dayjs
      setData((prevFormData) => ({
        ...prevFormData,
        year,
        month,
      }));
    }
  };
  const getMonthExpenses = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/v1/expenses/expenses/monthly`,

        {
          headers: {
            Authorization: bearerToken(),
          },
          params: {
            userId: user.id,
            month: data.month,
            year: data.year,
          },
        }
      );

      if (res.status == 200 && res.data.success == true) {
        // setData({...data, expenses: res.data.expenses });
        console.log(res.data);
        setData({ ...data, expenses: res.data.data.expenses });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };
  const EXP = data.expenses.filter(
    (item) =>
      (item.category &&item.category.toLowerCase().includes(filterText.toLowerCase()))
  );
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
        {" "}
        {/* Flex container */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label={"Month / Year "}
              views={["month", "year"]}
              onChange={handleDate}
              value={dayjs(`${data.year}-${data.month}-01`)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      </Box>
      <DataTable
        className="mt-2"
        columns={columns}
        data={EXP}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        persistTableHead
      />
    </>
  );
};

export default MonthlyExpense;
