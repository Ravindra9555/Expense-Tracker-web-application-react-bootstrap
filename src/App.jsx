import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './Components/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Dashbaord from "./Components/Layout/Dashboard"
// App.js
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Landing />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashbaord/>}>

            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
