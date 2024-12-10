// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import { useUser } from "../Context/UserContext";
// import dayjs from "dayjs";
// import axios from "axios";
// import { bearerToken } from "../../utils/BearerToken";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import Swal from "sweetalert2";
// import { IconButton, Tooltip } from "@mui/material";

// const FilterComponent = ({ filterText, onFilter, onClear }) => (
//   <Box sx={{ display: "flex", alignItems: "center", gap: 2, }}>
//     <TextField
//       id="search"
//       size="small"
//       type="text"
//       label="Search Expense"
//       variant="outlined"
//       placeholder="Filter By Name"
//       value={filterText}
//       onChange={onFilter}
//     />
//     <Button variant="outlined" onClick={onClear}>
//       Clear
//     </Button>
//   </Box>
// );

// const MonthlyExpense = () => {
//   const { user } = useUser(); // Get user data from context
//   const [filterText, setFilterText] = useState("");
//   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
//   const [data, setData] = useState({
//     expenses: [],
//     month: dayjs().month() + 1,
//     year: dayjs().year(),
//   });

//   useEffect(() => {
//     getMonthExpenses();
//   }, [data.month, data.year]);

//   const handleDate = (date) => {
//     if (date) {
//       setData({
//         ...data,
//         month: dayjs(date).month() + 1,
//         year: dayjs(date).year(),
//       });
//     }
//   };

//   const getMonthExpenses = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BASEURL}/api/v1/expenses/expenses/monthly`,
//         {
//           headers: { Authorization: bearerToken() },
//           params: {
//             userId: user.id,
//             month: data.month,
//             year: data.year,
//           },
//         }
//       );

//       if (res.status === 200 && res.data.success) {
//         setData((prev) => ({ ...prev, expenses: res.data.data.expenses }));
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text:
//           error.response?.data?.message ||
//           "Failed to fetch expenses for the selected month and year",
//         icon: "error",
//       });
//     }
//   };

//   const handleClear = () => {
//     setFilterText("");
//     setResetPaginationToggle(!resetPaginationToggle);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await axios.delete(
//         `${import.meta.env.VITE_BASEURL}/api/v1/expenses/deleteExpense`,
//         {
//           headers: { Authorization: bearerToken() },
//           data: {
//             userId: user.id,
//             expenseId: id,
//             month: data.month,
//             year: data.year,
//           },
//         }
//       );

//       if (res.status === 200 && res.data.statusCode === 200) {
//         Swal.fire({
//           title: "Deleted Successfully",
//           icon: "success",
//           confirmButtonText: "Okay",
//         });
//         getMonthExpenses(); // Refresh data after deletion
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: error.response?.data?.message || "Failed to delete expense",
//         icon: "error",
//         confirmButtonText: "Try Again",
//       });
//     }
//   };

//   const filteredExpenses = data.expenses.filter((item) =>
//     item.category?.toLowerCase().includes(filterText.toLowerCase())
//   );

//   const columns = [
//     {
//       name: "Date",
//       selector: (row) => dayjs(row.date).format("DD-MM-YYYY"),
//       sortable: true,
//       width:"30"
//     },
//     {
//       name: "Expense Type",
//       selector: (row) => row.category,
//       sortable: true,
//     },
//     {
//       name: "Expense Amount",
//       selector: (row) => row.amount,
//       sortable: true,
//     },
//     {
//       name: "Used For",
//       selector: (row) => row.name,
//       sortable: true,
//     },
  
//     {
//       name: "Bill Image",
//       selector: (row) => (
//         <a href={row.bill_img} target="_blank" rel="noopener noreferrer">
//           <Tooltip title="Click to see bill image">
//             <img
//               src={row.bill_img || "https://placehold.co/100?text=bill-image"}
//               height={50}
//               width={50}
//               alt="Bill"
//               className="rounded"
//             />
//           </Tooltip>
//         </a>
//       ),
//     },
//     {
//       name: "Action",
//       cell: (row) => (
//         <IconButton
//           variant="outlined"
//           color="error"
//           size="small"
//           onClick={() => handleDelete(row._id)}
//         >
//           <FontAwesomeIcon icon={faTrash} />
//         </IconButton>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker
//             label="Month / Year"
//             views={["month", "year"]}
//             value={dayjs(`${data.year}-${data.month}-01`)}
//             onChange={handleDate}
//             slotProps={{ textField: { size: 'small' } }}
//           />
//         </LocalizationProvider>
//         <FilterComponent
//           filterText={filterText}
//           onFilter={(e) => setFilterText(e.target.value)}
//           onClear={handleClear}
//         />
//       </Box>
//       <DataTable
//         className="mt-2"
//         columns={columns}
//         data={filteredExpenses}
//         expandableRows={expandableRows}
//         expandableRowsComponent={ExpandedComponent}
//         expandOnRowClicked={expandOnRowClicked}
//         expandOnRowDoubleClicked={expandOnRowDoubleClicked}
//         expandableRowsHideExpander={expandableRowsHideExpander}
//         pagination
//       />
//     </>
//   );
// };

// export default MonthlyExpense;
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useUser } from "../Context/UserContext";
import dayjs from "dayjs";
import axios from "axios";
import { bearerToken } from "../../utils/BearerToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { IconButton, Tooltip } from "@mui/material";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <TextField
      id="search"
      size="small"
      type="text"
      label="Search Expense"
      variant="outlined"
      placeholder="Filter By Name"
      value={filterText}
      onChange={onFilter}
    />
    <Button variant="outlined" onClick={onClear}>
      Clear
    </Button>
  </Box>
);

const MonthlyExpense = () => {
  const { user } = useUser(); // Get user data from context
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [data, setData] = useState({
    expenses: [],
    month: dayjs().month() + 1,
    year: dayjs().year(),
  });

  useEffect(() => {
    getMonthExpenses();
  }, [data.month, data.year]);

  const handleDate = (date) => {
    if (date) {
      setData({
        ...data,
        month: dayjs(date).month() + 1,
        year: dayjs(date).year(),
      });
    }
  };

  const getMonthExpenses = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/v1/expenses/expenses/monthly`,
        {
          headers: { Authorization: bearerToken() },
          params: {
            userId: user.id,
            month: data.month,
            year: data.year,
          },
        }
      );

      if (res.status === 200 && res.data.success) {
        setData((prev) => ({ ...prev, expenses: res.data.data.expenses }));
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to fetch expenses for the selected month and year",
        icon: "error",
      });
    }
  };

  const handleClear = () => {
    setFilterText("");
    setResetPaginationToggle(!resetPaginationToggle);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASEURL}/api/v1/expenses/deleteExpense`,
        {
          headers: { Authorization: bearerToken() },
          data: {
            userId: user.id,
            expenseId: id,
            month: data.month,
            year: data.year,
          },
        }
      );

      if (res.status === 200 && res.data.statusCode === 200) {
        Swal.fire({
          title: "Deleted Successfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
        getMonthExpenses(); // Refresh data after deletion
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to delete expense",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const filteredExpenses = data.expenses.filter((item) =>
    item.category?.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: "Date",
      selector: (row) => dayjs(row.date).format("DD-MM-YYYY"),
      sortable: true,
    },
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
      name: "Bill Image",
      selector: (row) => (
        <a href={row.bill_img} target="_blank" rel="noopener noreferrer">
          <Tooltip title="Click to see bill image">
            <img
              src={row.bill_img || "https://placehold.co/100?text=bill-image"}
              height={50}
              width={50}
              alt="Bill"
              className="rounded"
            />
          </Tooltip>
        </a>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <IconButton
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(row._id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      ),
    },
  ];

  // Expandable Row Component
  const ExpandedComponent = ({ data }) => (
    <Box sx={{ padding: 2, background: "#f9f9f9", borderRadius: "4px" }}>
      <p>
        <strong>Used For:</strong> {data.name}
      </p>
      {/* <p>
        <strong>Details:</strong> {data.details || "No additional details provided"}
      </p> */}
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Month / Year"
            views={["month", "year"]}
            value={dayjs(`${data.year}-${data.month}-01`)}
            onChange={handleDate}
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
        <FilterComponent
          filterText={filterText}
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
        />
      </Box>
      <DataTable
        className="mt-2"
        columns={columns}
        data={filteredExpenses}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        persistTableHead
      />
    </>
  );
};

export default MonthlyExpense;
