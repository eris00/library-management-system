import { Routes, Route } from "react-router-dom";
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'
import Activities from "./pages/Activities/Activities";
import Dashboard from "./pages/Dashboard/Dashboard";

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardLayout />}>
        <Route path="/activities" element={<Activities />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default Router