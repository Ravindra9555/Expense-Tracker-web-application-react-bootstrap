import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import "./App.css";
import Loader from "./Components/BasicComponents/Loader";
const Landing = lazy(() => import("./Components/Landing"));
const Login = lazy(() => import("./Components/Auth/Login"));
const Register = lazy(() => import("./Components/Auth/Register"));
const Forgot = lazy(() => import("./Components/Auth/Forgot"));
const ResetPassword = lazy(() => import("./Components/Auth/ResetPassword"));
const Dashbaord = lazy(() => import("./Components/Layout/Dashboard"));
const Dashboardmain = lazy(() => import("./Components/Pages/Dashboardmain"));
const AddExpenses = lazy(() => import("./Components/Pages/AddExpenses"));
const MonthlyExpense = lazy(() => import("./Components/Pages/MonthlyExpense"));
const PageNotFound = lazy(() => import("./Components/BasicComponents/PageNotFound"));
const TypeWriter = lazy(() => import("./Components/Pages/TypeWriter"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div><Loader/></div>}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/swip" element={<TypeWriter />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" element={<Dashbaord />}>
            <Route path="dashboard" element={<Dashboardmain />} />
            <Route path="add/expense" element={<AddExpenses />} />
            <Route path="monthly/expense" element={<MonthlyExpense />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
