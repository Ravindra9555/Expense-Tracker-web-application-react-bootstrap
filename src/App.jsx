import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './Components/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Dashbaord from "./Components/Layout/Dashboard"
import Dashboardmain from './Components/Pages/Dashboardmain';
import AddExpenses from './Components/Pages/AddExpenses';

// App.js
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Dashbaord/>}>
            <Route path="dashboard" element={<Dashboardmain />} />
            <Route path="add/expense" element={<AddExpenses/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
