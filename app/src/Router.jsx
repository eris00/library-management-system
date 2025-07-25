import { Routes, Route } from "react-router-dom";
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'
import Activities from "./pages/Activities/Activities";
import Dashboard from "./pages/Dashboard/Dashboard";
import Students from "./pages/Students/Students";
import CreateStudent from "./pages/CreateStudent/CreateStudent";

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardLayout />}>
        <Route path="/activities" element={<Activities />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/create-student" element={<CreateStudent />} />
      </Route>
    </Routes>
  )
}

export default Router