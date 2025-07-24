import { Routes, Route } from "react-router-dom";
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';
import Activities from "./pages/Activities/Activities";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login"; 
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Register from "./pages/Register/Register";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route path="activities" element={<Activities />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
