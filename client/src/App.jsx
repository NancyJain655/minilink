import React from "react";
import {BrowserRouter as Router ,Routes,Route} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  

  return (
    <Router>
      <ToastContainer />
      <Routes>
      
      <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Register />} /> 
                <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
    </Router>
  );
}

export default App;
