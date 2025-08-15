import { Routes, Route } from "react-router-dom";
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';
import Activities from "./pages/Activities/Activities";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login"; 
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Register from "./pages/Register/Register";
import Authors from "./pages/Authors/Authors";
import CreateAuthor from "./pages/Authors/CreateAuthor";
/*import EditAuthor from "./pages/Authors/EditAuthor"; */

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route path="activities" element={<Activities />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="authors" element={<Authors />} /> 
        <Route path="/add-author" element={<CreateAuthor />} />
      </Route>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Router;


/*  <Route path="authors/create" element={<CreateAuthor />} />
        <Route path="authors/edit/:id" element={<EditAuthor />} />
        <Route path="authors/:id" element={<AuthorDetail />} /> */