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
import CreateBook from "./pages/Books/BookUpsert/CreateBook";
import UpdateBook from "./pages/Books/BookUpsert/UpdateBook";
import BookDetail from "./pages/Books/BookDetail/BookDetail";
import RentBook from "./pages/Books/BookActions/RentBook";
import ReserveBook from "./pages/Books/BookActions/ReserveBook";
import RentEvidentionPage from "./pages/RentEvidention/RentEvidentionPage";
import WriteOffBook from "./pages/Books/BookActions/WriteOffBook";
import ReturnBook from "./pages/Books/BookActions/ReturnBook";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./pages/Profile/Profile";

const Router = () => {
  return (
    <Routes>
<Route 
  path="/" 
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  <Route path="activities" element={<Activities />} />
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="students" element={<Students />} />
  <Route path="create-student" element={<CreateStudent />} />
  <Route path="students/edit-student/:studentId" element={<EditStudent />} />
  <Route path="students/:studentId" element={<StudentDetail />} />

  <Route path="books" element={<Books />} />
  <Route path="create-book" element={<CreateBook />} />
  <Route path="books/edit-book/:bookId" element={<UpdateBook />} />
  <Route path="books/book-detail/:bookId" element={<BookDetail />} />
  <Route path="books/rent-book/:bookId" element={<RentBook />} />
  <Route path="books/reserve-book/:bookId" element={<ReserveBook />} />
  <Route path="books/writeoff-book/:bookId" element={<WriteOffBook />} />
  <Route path="books/return-book/:bookId" element={<ReturnBook />} />

  <Route path="rent-evidentions" element={<RentEvidentionPage />} />

  <Route path="profile" element={<Profile />} />
</Route>

      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
