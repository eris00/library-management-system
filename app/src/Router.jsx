import { Routes, Route } from "react-router-dom";
import DashboardLayout from './layouts/dashboardLayout'
import Activities from "./pages/Activities";

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardLayout />}>
        <Route path="/activities" element={<Activities />} />
      </Route>
    </Routes>
  )
}

export default Router