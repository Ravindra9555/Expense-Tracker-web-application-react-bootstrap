// import React, { useState, useEffect } from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import { Button, TextField, Box } from "@mui/material";
// import axios from "axios";
// import { validateImage } from "../../utils/validation";
// import { toast, ToastContainer } from "react-toastify";
// import { useUser } from "../Context/UserContext";
// import { bearerToken } from "../../utils/BearerToken";
// import Loader from "../BasicComponents/Loader";

// const categories = [
//   { id: 1, name: "Grocery" },
//   { id: 2, name: "Travel" },
//   { id: 3, name: "Education" },
//   { id: 4, name: "Fashion" },
//   { id: 5, name: "Medical" },
//   { id: 6, name: "Others" },
// ];

// const AddExpenses = () => {
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const [initialAmount, setInitialAmount] = useState("0000");
//   const [update, setUpdate] = useState(true);
//   const [formData, setFormData] = useState({
//     userId: user.id,
//     date: dayjs().format("YYYY-MM-DD"),
//     category: "",
//     month: dayjs().month() + 1, // Month is 0-based in dayjs
//     year: dayjs().year(),
//     amount: "",
//     name: "",
//     bill_img: "",
//     initialAmount: initialAmount,
//   });
//   const [imgPreview, setImgPreview] = useState("");

//   useEffect(() => {
//     getInitialAmount();
//   }, []);
//   const getInitialAmount = () => {
//     try {
//       axios.get(
//         `${import.meta.env.VITE_BASEURL}/api/v1/expenses/initalAmount?userId=${
//           user.id
//         }&month=${formData.month}&year=${formData.year}`,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: bearerToken(),
//           },
//         }
//       );
//       if (response.status ===200 && response.data.statusCode==200) {
//         setInitialAmount(res.data);
//         setFormData({ ...formData, initialAmount: res.data });
//       }else{
//         toast.error("Error fetching initial amount1");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error fetching initial amount");
//     }
//   };

//   const handleYearChange = (date) => {
//     if (date) {
//       const year = dayjs(date).year();
//       const month = dayjs(date).month() + 1; // Month is 0-based in dayjs
//       setFormData({ ...formData, year, month });
//       console.log("Selected Year:", year, "Month:", month);
//     }
//   };

//   const addInitial = () => {
//     setUpdate(!update);
//     console.log(initialAmount);
//   };

//   const chanageInitial = (e) => {
//     setInitialAmount(e.target.value);
//     setFormData(...formData, initialAmount, e.target.value);
//   };

//   const onchangeHandler = (event) => {
//     const { name, value, type, files } = event.target;
//     if (type === "file") {
//       const file = files[0];
//       const err = validateImage(file);
//       if (err) {
//         toast.error(err);
//         return; // stop the function execution if the file is not valid.  You could also display an error message here.
//       }
//       setFormData({ ...formData, [name]: file });

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImgPreview(reader.result);
//       };
//       if (file) {
//         reader.readAsDataURL(file);
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const submitForm = async (e) => {
//     e.preventDefault();

//     const payload = new FormData();
//     for (const key in formData) {
//       payload.append(key, formData[key]);
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASEURL}/api/v1/expenses/createExpense`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: bearerToken(),
//           },
//         }
//       );

//       if (response.status === 201 && response.data.statusCode === 200) {
//         setLoading(false);
//         console.log("Form submitted successfully");
//         toast.success(response.data.message);
//         setFormData({
//           userId: user.id,
//           date: dayjs().format("YYYY-MM-DD"),
//           category: "",
//           month: dayjs().month() + 1, // Month is 0-based in dayjs
//           year: dayjs().year(),
//           amount: "",
//           name: "",
//           bill_img: "",
//         });
//         setImgPreview("");

//         // Handle success (e.g., show a success message, reset the form, etc.)
//       } else {
//         setLoading(false);
//         toast.error("Form submission failed");
//         // Handle error (e.g., show an error message)
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Form submission error:", error);
//       toast.error(error.message);
//       // Handle error (e.g., show an error message)
//     }
//   };

//   return (
//     <>
//       {!loading ? (
//         <>
//           <div className="">
//             <div className="p-2 bg-light rounded mt-2">
//               <ToastContainer />
//               <p className="text-start">
//                 Please Select the Months for Which you want to add the Expense
//               </p>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DemoContainer components={["DatePicker"]}>
//                     <DatePicker
//                       label="Month/Year"
//                       openTo="year"
//                       views={["year", "month"]}
//                       value={dayjs(`${formData.year}-${formData.month}-01`)}
//                       onChange={handleYearChange}
//                     />
//                   </DemoContainer>
//                 </LocalizationProvider>

//                 <TextField
//                   sx={{ mt: 1, ml: 2 }}
//                   id="initialAmount"
//                   disabled={update}
//                   value={initialAmount}
//                   onChange={chanageInitial}
//                   type="number"
//                   label="Initial Amount of Month"
//                   variant="outlined"
//                 />
//                 <Button
//                   variant="outlined"
//                   sx={{ ml: 2, mt: 1, p: 2 }}
//                   onClick={addInitial}
//                 >
//                   {update ? "Update" : "Add"}
//                 </Button>
//               </Box>
//             </div>
//             <div className="mt-2 bg-light rounded p-2">
//               <h5 className="text-center">Add Expenses</h5>
//               <hr className="text-primary" />
//               <form onSubmit={submitForm}>
//                 <div className="row">
//                   <div className="mb-3 col-sm-4">
//                     <label className="form-label">Category</label>
//                     <select
//                       className="form-select"
//                       aria-label="category"
//                       name="category"
//                       onChange={onchangeHandler}
//                       value={formData.category}
//                     >
//                       <option value="">Please Select</option>
//                       {categories.map((category) => (
//                         <option key={category.id} value={category.name}>
//                           {category.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="mb-3 col-sm-3">
//                     <label className="form-label">Amount</label>
//                     <input
//                       type="number"
//                       name="amount"
//                       value={formData.amount}
//                       onChange={onchangeHandler}
//                       className="form-control"
//                       placeholder="Enter Amount"
//                     />
//                   </div>
//                   <div className="mb-3 col-sm-4">
//                     <label className="form-label">Date</label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       name="date"
//                       value={formData.date}
//                       onChange={onchangeHandler}
//                     />
//                   </div>
//                   <div className="col-sm-4 mb-3">
//                     <label htmlFor="" className="form-label">
//                       Name of Expense
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       className="form-control"
//                       value={formData.name}
//                       onChange={onchangeHandler}
//                     />
//                   </div>
//                   <div className="col-sm-4 mb-3">
//                     <label htmlFor="" className="form-label">
//                       Bill Image
//                     </label>
//                     <input
//                       type="file"
//                       className="form-control"
//                       name="bill_img"
//                       onChange={onchangeHandler}
//                     />
//                   </div>
//                   {imgPreview && (
//                     <div className="mt-2 col-sm-4">
//                       <img
//                         src={imgPreview}
//                         alt="Preview"
//                         style={{
//                           width: "100%",
//                           maxHeight: "200px",
//                           objectFit: "contain",
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//                 <div className="d-flex justify-content-end">
//                   <button type="submit" className="btn btn-primary">
//                     Add Expense
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </>
//       ) : (
//         <Loader />
//       )}
//     </>
//   );
// };

// export default AddExpenses;

import React, { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Button, TextField, Box } from "@mui/material";
import axios from "axios";
import { validateImage } from "../../utils/validation";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "../Context/UserContext";
import { bearerToken } from "../../utils/BearerToken";
import Loader from "../BasicComponents/Loader";

const categories = [
  { id: 1, name: "Grocery" },
  { id: 2, name: "Travel" },
  { id: 3, name: "Education" },
  { id: 4, name: "Fashion" },
  { id: 5, name: "Medical" },
  { id: 6, name: "Others" },
];

const AddExpenses = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [initialAmount, setInitialAmount] = useState("0000");
  const [update, setUpdate] = useState(true);
  const [formData, setFormData] = useState({
    userId: user.id,
    date: dayjs().format("YYYY-MM-DD"),
    category: "",
    month: dayjs().month() + 1, // Month is 0-based in dayjs
    year: dayjs().year(),
    amount: "",
    name: "",
    bill_img: "",
  });
  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    getInitialAmount();
  }, [formData.month, formData.year, user.id]);

  const getInitialAmount = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/v1/expenses/initialAmount`,
        {
          params: {
            userId: user.id,
            month: formData.month,
            year: formData.year,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: bearerToken(),
          },
        }
      );
     // http://127.0.0.1:8080/api/v1/expenses/initalAmount?userId=66abfaa29c5e06e20c021460&month=8&year=2024
     // http://localhost:8080/api/v1/expenses/initialAmount?userId=66abfaa29c5e06e20c021460&month=8&year=2024

      if (response.status === 200 && response.data.statusCode === 200) {
        setInitialAmount(response.data.data || "0000");
        setFormData((prevFormData) => ({
          ...prevFormData,
          initialAmount: response.data.data|| "0000",
        }));
      } else {
        toast.error("Error fetching initial amount");
      }
    } catch (error) {
      console.error("Error fetching initial amount:", error.response || error.message);
      toast.error("Error fetching initial amount");
    }
  };

  const handleYearChange = (date) => {
    if (date) {
      const year = dayjs(date).year();
      const month = dayjs(date).month() + 1; // Month is 0-based in dayjs
      setFormData((prevFormData) => ({
        ...prevFormData,
        year,
        month,
      }));
    }
  };

  const addInitial = () => {
    setUpdate(!update);
  };

  const handleInitialAmountChange = (e) => {
    setInitialAmount(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      initialAmount: e.target.value,
    }));
  };

  const onchangeHandler = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      const file = files[0];
      const err = validateImage(file);
      if (err) {
        toast.error(err);
        return; // Stop the function execution if the file is not valid
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/v1/expenses/createExpense`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: bearerToken(),
          },
        }
      );

      if (response.status === 201 && response.data.statusCode === 200) {
        toast.success(response.data.message);
        setFormData({
          userId: user.id,
          date: dayjs().format("YYYY-MM-DD"),
          category: "",
          month: dayjs().month() + 1,
          year: dayjs().year(),
          amount: "",
          name: "",
          bill_img: "",
        });
        setImgPreview("");
      } else {
        toast.error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Error submitting the form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <ToastContainer />
          <div className="p-2 bg-light rounded mt-2">
            <p className="text-start">
              Please Select the Months for Which you want to add the Expense
            </p>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Month/Year"
                    openTo="year"
                    views={["year", "month"]}
                    value={dayjs(`${formData.year}-${formData.month}-01`)}
                    onChange={handleYearChange}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <TextField
                sx={{ mt: 1, ml: 2 }}
                id="initialAmount"
                disabled={update}
                value={initialAmount}
                onChange={handleInitialAmountChange}
                type="number"
                label="Initial Amount of Month"
                variant="outlined"
              />
              <Button
                variant="outlined"
                sx={{ ml: 2, mt: 1, p: 2 }}
                onClick={addInitial}
              >
                {update ? "Update" : "Add"}
              </Button>
            </Box>
          </div>
          <div className="mt-2 bg-light rounded p-2">
            <h5 className="text-center">Add Expenses</h5>
            <hr className="text-primary" />
            <form onSubmit={submitForm}>
              <div className="row">
                <div className="mb-3 col-sm-4">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    aria-label="category"
                    name="category"
                    onChange={onchangeHandler}
                    value={formData.category}
                  >
                    <option value="">Please Select</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 col-sm-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={onchangeHandler}
                    className="form-control"
                    placeholder="Enter Amount"
                  />
                </div>
                <div className="mb-3 col-sm-4">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={onchangeHandler}
                  />
                </div>
                <div className="col-sm-4 mb-3">
                  <label className="form-label">Name of Expense</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={onchangeHandler}
                  />
                </div>
                <div className="col-sm-4 mb-3">
                  <label className="form-label">Bill Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="bill_img"
                    onChange={onchangeHandler}
                  />
                </div>
                {imgPreview && (
                  <div className="mt-2 col-sm-4">
                    <img
                      src={imgPreview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddExpenses;

