import { Routes, Route } from "react-router-dom";
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';
import Activities from "./pages/Activities/Activities";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login"; 
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Register from "./pages/Register/Register";
import Authors from "./pages/Authors/Authors";
import CreateAuthor from "./pages/Authors/CreateAuthor";
import EditAuthor from "./pages/Authors/EditAuthor";
import AuthorDetail from "./pages/Authors/AuthorDetail";
import Librarians from "./pages/Librarians/Librarians";
import CreateLibrarian from "./pages/Librarians/CreateLibrarian";
import EditLibrarian from "./pages/Librarians/EditLibrarian";
import LibrarianDetail from "./pages/Librarians/LibrarianDetail";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route path="activities" element={<Activities />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="authors" element={<Authors />} /> 
        <Route path="add-author" element={<CreateAuthor />} />
        <Route path="authors/edit/:id" element={<EditAuthor />} />
        <Route path="authors/:id" element={<AuthorDetail />} /> 
        <Route path="librarians" element={<Librarians />} />
        <Route path="add-librarian" element={<CreateLibrarian />} />
        <Route path="librarians/edit/:id" element={<EditLibrarian />} />
        <Route path="librarians/:id" element={<LibrarianDetail />} />
      </Route>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
