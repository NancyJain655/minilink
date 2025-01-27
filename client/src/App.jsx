
/*import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Setting from "./pages/settings/Setting";
import Analytics from "./pages/Analytics/Analytics";
import Links from "./pages/Link/Links";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();

  const hideLayoutRoutes = ["/register", "/login"];

  return (
    <>
      <ToastContainer />
      {hideLayoutRoutes.includes(location.pathname) ? (
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/links" element={<Links />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Setting/>} />
        </Routes>
      )}
    </>
  );
};

export default App;*/

import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Setting from "./pages/settings/Setting";
import Analytics from "./pages/Analytics/Analytics";
import Links from "./pages/Link/Links";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();

  const hideLayoutRoutes = ["/register", "/login"];

  return (
    <>
      <ToastContainer />
      {hideLayoutRoutes.includes(location.pathname) ? (
        <Routes>
          <Route path="/" element={<Register />} /> {/* Default to /register */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Register />} /> {/* Default to /register */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/links" element={<Links />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      )}
    </>
  );
};

export default App;



