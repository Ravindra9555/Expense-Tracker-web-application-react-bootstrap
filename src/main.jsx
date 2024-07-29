
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'aos/dist/aos.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.bundle.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
