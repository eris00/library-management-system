import { Routes, Route } from "react-router-dom";
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';
import Activities from "./pages/Activities/Activities";
import Dashboard from "./pages/Dashboard/Dashboard";
import Students from "./pages/Students/Students";
import CreateStudent from "./pages/Students/CreateStudent";
import EditStudent from "./pages/Students/EditStudent";
import StudentDetail from "./pages/Students/StudentDetail";
import Login from "./pages/Login/Login"; 
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Register from "./pages/Register/Register";
import Books from "./pages/Books/Books";
import CreateBook from "./pages/Books/CreateBook";

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

        <Route path="/books" element={<Books />} />
        <Route path="/create-book" element={<CreateBook />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
