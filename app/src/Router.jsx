import { Routes, Route } from "react-router-dom";
import DashboardLayout from './layouts/dashboardLayout'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardLayout />} />

    </Routes>
  )
}

export default Router