import { Routes, Route } from "react-router-dom";
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';
import Activities from "./pages/Activities/Activities";
import Dashboard from "./pages/Dashboard/Dashboard";
import Students from "./pages/Students/Students";
import CreateStudent from "./pages/Students/CreateStudent";
import EditStudent from "./pages/Students/EditStudent";
import StudentDetail from "./pages/Students/StudentDetail";
import Register from "./pages/Register/Register";

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardLayout />}>
        <Route path="/activities" element={<Activities />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/create-student" element={<CreateStudent />} />
        <Route path="students/edit-student/:studentId" element={<EditStudent />} />
        <Route path="students/:studentId" element={<StudentDetail />} />
      </Route>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
